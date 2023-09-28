using Application.Model;
using Application.Responses;
using MediatR;

namespace Application.Features.AuthFeature.Requests;

public class ChangePasswordRequest : IRequest<BaseCommandResponse<Unit>>{
    
    public required ChangePasswordDTO Body{ set; get; }
    public required string Token{ set; get; }
    
}