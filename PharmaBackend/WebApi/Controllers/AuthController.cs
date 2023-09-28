using Application.Features.AuthFeature.Requests;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Application.Model;
using Microsoft.AspNetCore.Authorization;
using WebApi.Middleware;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    
    public class AuthController : ControllerBase
    {
        private readonly IMediator _mediator;

        public AuthController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("PharmacyRegister")]
        public async Task<IActionResult> CreatePharmacy( PharmacyAuthRequest body){
            string token = Request.Headers["Authorization"].FirstOrDefault()?.Replace("Bearer ", "");
            var command = new CreatePharmacyRequest() { Body = body, Token = token };
            var authResponse = await _mediator.Send(command);
            return ResponseHandler<AuthResponse>.HandleResponse(authResponse, 201);
        }
        
        [HttpPost("AdminRegister")]
        public async Task<IActionResult> CreateAdmin(AdminAuthRequest body){
            string token = Request.Headers["Authorization"].FirstOrDefault()?.Replace("Bearer ", "");
            var command = new CreateAdminRequest() { Body = body, Token = token };
            var authResponse = await _mediator.Send(command);
            return ResponseHandler<AuthResponse>.HandleResponse(authResponse, 201);
        }
        
        
        [HttpPost("Login")]
        public async Task<IActionResult> LoginUser(LoginRequest body)
        {
            var command = new LoginUserRequest() { Body = body };
            var authResponse = await _mediator.Send(command);
            return ResponseHandler<AuthResponse>.HandleResponse(authResponse, 200);
        }
        
        [HttpPost("ChangePassword")]
        public async Task<IActionResult> ChangePassword( ChangePasswordDTO body, string token){
            // string token = Request.Headers["Authorization"].FirstOrDefault()?.Replace("Bearer ", "");
            var command = new ChangePasswordRequest() { Body = body, Token = token };
            var authResponse = await _mediator.Send(command);
            return ResponseHandler<Unit>.HandleResponse(authResponse, 201);
        }
        
        [Authorize]
        [HttpGet("Refresh")]
        public async Task<IActionResult> VerifyToken(){
            string token = Request.Headers["Authorization"].FirstOrDefault()?.Replace("Bearer ", "");
            var command = new VerifyTokenRequest() { Token = token };
            var authResponse = await _mediator.Send(command);
            return ResponseHandler<AuthResponse>.HandleResponse(authResponse, 201);
        }
        
       
    }
}