using Application.Contracts.Identity;
using Application.Contracts.Persistance;
using Application.Exceptions;
using Application.Features.AuthFeature.Requests;
using Application.Model;
using Application.Responses;
using MediatR;

namespace Application.Features.AuthFeature.Handlers;

public class VerifyTokenHandler : IRequestHandler<VerifyTokenRequest, BaseCommandResponse<AuthResponse>>{
    private readonly IAuthService _authService;
    private readonly IUnitOfWork _unitOfWork;

    public VerifyTokenHandler(IAuthService authService, IUnitOfWork unitOfWork){
        _authService = authService;
        _unitOfWork = unitOfWork;
    }
    
    public async Task<BaseCommandResponse<AuthResponse>> Handle(VerifyTokenRequest request, CancellationToken cancellationToken){
        try{
            var reponse = await _authService.ResetToken(request.Token);
            return BaseCommandResponse<AuthResponse>.SuccessHandler(reponse);
        }
        catch(Exception e){
            return BaseCommandResponse<AuthResponse>.FailureHandler(e);

        }
    }
}