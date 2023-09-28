using Application.Model;
using Application.Responses;
using MediatR;

namespace Application.Features.AuthFeature.Requests;

public class CreatePharmacyRequest : IRequest<BaseCommandResponse<AuthResponse>>{
    
    public required PharmacyAuthRequest Body { get; set; }
    public required string Token { get; set; }
}