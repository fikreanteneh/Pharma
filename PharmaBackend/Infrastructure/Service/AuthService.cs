using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Application.Contracts.Identity;

using Application.Exceptions;
using Application.Model;

using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Infrastructure.Model;

namespace Infrastructure.Service;

public class AuthService : IAuthService {
    
     private readonly UserManager<ApplicaionUser> _userManager;
     private readonly SignInManager<ApplicaionUser> _signInManager;
     // private readonly RoleManager<ApplicationRole> _roleManager;
     private readonly JwtSetting _jwtSettings; 
    
     public AuthService(UserManager<ApplicaionUser> userManager,SignInManager<ApplicaionUser> signInManager, IOptions<JwtSetting> jwtSettings) 
     { 
         _userManager = userManager; 
         _signInManager = signInManager; 
         _jwtSettings = jwtSettings.Value; 
         // _roleManager = roleManager;
          
     } 
     
     public async Task<AuthResponse> Login(AuthRequest request) 
     {
         var user = await _userManager.FindByEmailAsync(request.Email);
         
         if (user is null)
         {
             throw new NotFoundException(nameof(user), request.Email);
         }

         var isCorrect = await _signInManager.PasswordSignInAsync(user.Email, request.Password, isPersistent: true, lockoutOnFailure: false);
         if (!isCorrect.Succeeded)
         {
             throw new BadRequestException($"Invalid credentials for user: {request.Email}");
         }

         var roles = await _userManager.GetRolesAsync(user);
         var role = roles.FirstOrDefault();
         var authResponse = new AuthResponse{ AuthId = user.Id, Role = role, Email = user.Email};
         

         return authResponse;

     } 
     
     public async Task<AuthResponse> Register(AuthRequest request, string role) 
     {
         var alreadyExistEmail = await _userManager.FindByEmailAsync(request.Email);

         if (alreadyExistEmail is not null) throw new BadRequestException("Email already used");
         
         var user = new ApplicaionUser
         {
             Email = request.Email,
             UserName = request.Email,
             EmailConfirmed = true
         };

         var creatingUser = await _userManager.CreateAsync(user, request.Password);
         if (!creatingUser.Succeeded)
         {
             foreach(var error in creatingUser.Errors){
                 Console.WriteLine(error.Description);
             }
             throw new BadRequestException($"Failed to create user. Check your password.");
         }
         var addToRoleResult = await _userManager.AddToRoleAsync(user, role);
         if (!addToRoleResult.Succeeded)
         {
             throw new BadRequestException($"Failed to assign role to the user.");
         }
         var authResponse = new AuthResponse{ AuthId = user.Id, Role = role, Email = user.Email};
            return authResponse;
     }
     public async Task<AuthResponse> GenerateToken(AuthResponse response){
         var claims = new[]{
             new Claim("authid", response.AuthId),
             new Claim("role", response.Role),
             new Claim("email", response.Email),
             new Claim("id", response.Id.ToString()),
         };
         var ssk = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.Key)); 
         var credentialsHashs = new SigningCredentials(ssk,SecurityAlgorithms.HmacSha256); 
     
         var jwtToken = new JwtSecurityToken( 
             issuer: _jwtSettings.Issuer, 
             audience: _jwtSettings.Audience, 
             claims: claims, 
             expires: DateTime.Now.AddMinutes(_jwtSettings.DurationInMinutes), 
             signingCredentials: credentialsHashs 
         );
         var tokenString = new JwtSecurityTokenHandler().WriteToken(jwtToken);
         response.Token = tokenString;
         return response;
     }
     
     public async Task<AuthResponse> TokenValidator(string token, string authorize = null){
         var tokenHandler = new JwtSecurityTokenHandler();
         var jwtToken = tokenHandler.ReadJwtToken(token);
    
         var id = int.Parse(jwtToken.Claims.FirstOrDefault(c => c.Type == "id").Value ?? "-1");
         var authid = jwtToken.Claims.FirstOrDefault(c => c.Type == "authid")?.Value;
         var email = jwtToken.Claims.FirstOrDefault(c => c.Type == "email")?.Value;
         var role = jwtToken.Claims.FirstOrDefault(c => c.Type == "role")?.Value;
         
         if (id == -1 || authid is null || email is null || role is null) throw new BadRequestException("Invalid token");
         if (authorize is not null && role != authorize) throw new BadRequestException("Invalid token");
         
        var user = await _userManager.FindByIdAsync(authid);
        if (user is null)
        {
            throw new BadRequestException("Invalid token");
        }
    
         var authResponse = new AuthResponse
         {
             Id = id,
             AuthId = authid,
             Email = email,
             Role = role
         };
         return authResponse;
        
     }

     public async Task ChangePassword(string oldpassword, string newpassword, string authid){
         var user = await _userManager.FindByIdAsync(authid);
         var changePasswordResult = await _userManager.ChangePasswordAsync(user, oldpassword, newpassword);
         if (!changePasswordResult.Succeeded){
             throw new BadRequestException("Faileddddd");
         }
     }


     public async Task<AuthResponse> ResetToken(string token){
         var values = await TokenValidator(token);
         return await GenerateToken(values);
     }

     public async Task<string> GetUserRole(string id){
         var user = await _userManager.FindByIdAsync(id);
         var roles = await _userManager.GetRolesAsync(user);
         if (roles == null || roles.Count == 0)
         {
             throw new NotFoundException(nameof(ApplicaionUser),$"No roles found for user with ID {id}.");
         }
         return roles[0];
     }
     
}