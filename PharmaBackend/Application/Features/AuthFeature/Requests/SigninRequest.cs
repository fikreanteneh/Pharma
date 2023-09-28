using Application.Model;
using Application.Responses;
using MediatR;

namespace Application.Features.AuthFeature.Requests;

public class LoginUserRequest :  IRequest<BaseCommandResponse<AuthResponse>>{
    
    public required LoginRequest Body { get; set; }
    
}