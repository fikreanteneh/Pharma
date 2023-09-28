using Application.Model;
using Application.Responses;
using MediatR;

namespace Application.Features.AuthFeature.Requests;

public class CreateAdminRequest : IRequest<BaseCommandResponse<AuthResponse>>{
    
    public required AdminAuthRequest Body { get; set; }
    public required string Token { get; set; }
}