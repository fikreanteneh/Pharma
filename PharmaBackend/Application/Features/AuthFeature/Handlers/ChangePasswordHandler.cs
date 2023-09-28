using Application.Contracts.Identity;
using Application.Exceptions;
using Application.Features.AuthFeature.Requests;
using Application.Responses;
using MediatR;

namespace Application.Features.AuthFeature.Handlers;

public class ChangePasswordHandler : IRequestHandler<ChangePasswordRequest, BaseCommandResponse<Unit>>{
    private readonly IAuthService _authService;
    public ChangePasswordHandler(IAuthService authService){
        _authService = authService;
    }

    public async Task<BaseCommandResponse<Unit>> Handle(ChangePasswordRequest request, CancellationToken cancellationToken){
        try{
            var authResponse = await _authService.TokenValidator(request.Token);
            if (authResponse.Role != "ADMIN" && request.Token != request.Body.Token)
                throw new BadRequestException("You are not authorized to change password");

            await _authService.ChangePassword(request.Body.OldPassword, request.Body.NewPassword, request.Body.Token);
            return BaseCommandResponse<Unit>.SuccessHandler(Unit.Value);
        }
        catch(Exception e){
            return BaseCommandResponse<Unit>.FailureHandler(e);
        }
    }
}