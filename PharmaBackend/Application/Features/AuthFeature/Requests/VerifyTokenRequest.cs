using Application.Model;
using Application.Responses;
using MediatR;

namespace Application.Features.AuthFeature.Requests;

public class VerifyTokenRequest : IRequest<BaseCommandResponse<AuthResponse>>{
    public required string Token {set;get; }
    
}