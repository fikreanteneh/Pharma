using Application.Contracts.Identity;
using Application.Contracts.Persistance;
using Application.DTO.PharmacyDTO;
using Application.DTO.PharmacyDTO.Validators;
using Application.Features.AuthFeature.Requests;
using Application.Model;
using Application.Responses;
using AutoMapper;
using MediatR;
using Application.Exceptions;
using Domain.Entites;
using NetTopologySuite.Geometries;

namespace Application.Features.AuthFeature.Handlers;

public class CreatePharmacyHandler : IRequestHandler<CreatePharmacyRequest, BaseCommandResponse<AuthResponse>>{
    private readonly IAuthService _authService;
    private readonly IUnitOfWork _unitOfWork;

    private readonly IMapper _mapper;
    
    public CreatePharmacyHandler(IAuthService authService, IMapper mapper,  IUnitOfWork unitOfWork){
        _authService = authService;
        _mapper = mapper;
        _unitOfWork = unitOfWork;
    }
    
    public async Task<BaseCommandResponse<AuthResponse>> Handle(CreatePharmacyRequest request, CancellationToken cancellationToken){
        try{
            var currUser = await _authService.TokenValidator(request.Token, "ADMIN");
            var validator = new CreatePharmacyDTOValidator();
            var validationResult = await validator.ValidateAsync(_mapper.Map<CreatePharmacyDTO>(request.Body));
            if (!validationResult.IsValid)
                return BaseCommandResponse<AuthResponse>.FailureHandler(new ValidationException(validationResult));
            var response = await _authService.Register(request.Body,  "PHARMACY");
            var pharmacy =  new Pharmacy{
                AuthId = response.AuthId,
                Name = request.Body.Name,
                Address = $"Point({request.Body.Address.Longitude} {request.Body.Address.Latitude})",
                PhoneNumbers = request.Body.PhoneNumbers,
                Emails = request.Body.Emails
            };
            await _unitOfWork.PharmacyRepository.Add(pharmacy);
            await _unitOfWork.Save();
            response.Id = pharmacy.Id;
            var reponse = await _authService.GenerateToken(response);
            return BaseCommandResponse<AuthResponse>.SuccessHandler(reponse);
        }
        catch(Exception e){
            return BaseCommandResponse<AuthResponse>.FailureHandler(e);
        }
    }
    
}