using Application.Contracts.Identity;
using Application.Contracts.Persistance;
using Application.Exceptions;
using Application.Features.AuthFeature.Requests;
using Application.Model;
using Application.Responses;
using AutoMapper;
using MediatR;

namespace Application.Features.AuthFeature.Handlers;

public class LoginUserHandler : IRequestHandler<LoginUserRequest, BaseCommandResponse<AuthResponse>>{
    private readonly IAuthService _authService;
    private readonly IUnitOfWork _unitOfWork;

    public LoginUserHandler(IAuthService authService, IUnitOfWork unitOfWork){
        _authService = authService;
        _unitOfWork = unitOfWork;
    }
    
    public async Task<BaseCommandResponse<AuthResponse>> Handle(LoginUserRequest request, CancellationToken cancellationToken){
        try{
            var reponse = await _authService.Login(request.Body);
            int id = 
                // (await _unitOfWork.PharmacyRepository.GetByAuthId(reponse.AuthId))?.Id ?? 
                (await _unitOfWork.AdminRepository.GetByAuthId(reponse.AuthId))?.Id ?? 
                -1;
            if (id == -1) throw new NotFoundException(nameof(LoginRequest),"User not found");
            reponse.Id = id;
            await _authService.GenerateToken(reponse);
            return BaseCommandResponse<AuthResponse>.SuccessHandler(reponse);
        }
        catch(Exception e){
            return BaseCommandResponse<AuthResponse>.FailureHandler(e);

        }
    }
    
}