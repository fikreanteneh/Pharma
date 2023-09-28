using Application.Contracts.Identity;
using Application.Contracts.Persistance;
using Application.Exceptions;
using Application.Features.AuthFeature.Requests;
using Application.Model;
using Application.Responses;
using AutoMapper;
using Domain.Entites;
using MediatR;

namespace Application.Features.AuthFeature.Handlers;

public class CreateAdminHandler : IRequestHandler<CreateAdminRequest, BaseCommandResponse<AuthResponse>>{
    private readonly IAuthService _authService;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;
    
    public CreateAdminHandler(IAuthService authService, IMapper mapper, IUnitOfWork unitOfWork){
        _authService = authService;
        _mapper = mapper;
        _unitOfWork = unitOfWork;
    }
    
    public async Task<BaseCommandResponse<AuthResponse>> Handle(CreateAdminRequest request, CancellationToken cancellationToken){
        try{
            var currUser = await _authService.TokenValidator(request.Token, "ADMIN");
            var reponse = await _authService.Register(request.Body, "ADMIN");
            var admin = _mapper.Map<Admin>(request.Body);
            await _unitOfWork.AdminRepository.Add(admin);
            await _unitOfWork.Save();
            reponse.Id = admin.Id;
            await _authService.GenerateToken(reponse);
            return BaseCommandResponse<AuthResponse>.SuccessHandler(reponse);
        }
        catch(Exception e){
            return BaseCommandResponse<AuthResponse>.FailureHandler(e);
        }
    }
    
}