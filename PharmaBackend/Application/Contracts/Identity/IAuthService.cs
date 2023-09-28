using Application.Model;


namespace Application.Contracts.Identity;

public interface IAuthService{
    Task<AuthResponse> Login(AuthRequest request);
    
    Task<AuthResponse> Register(AuthRequest reqeuest, string role );
    
    Task ChangePassword(string oldpassword, string newpassword, string authid);
    Task<AuthResponse> TokenValidator(string token, string role = null);
    
    Task<AuthResponse> GenerateToken(AuthResponse request);
    
    Task<AuthResponse> ResetToken(string token);

    Task<string> GetUserRole(string token);

    // Task<bool> Update(UpdateUserDTO request, string prevEmail); 

}