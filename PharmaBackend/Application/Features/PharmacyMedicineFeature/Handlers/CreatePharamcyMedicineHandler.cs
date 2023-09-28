using Application.Contracts.Identity;
using Application.Contracts.Persistance;
using Application.DTO.PharmacyMedicineDTO;
using Application.DTO.PharmacyMedicineDTO.Validators;
using Application.Exceptions;
using Application.Features.PharmacyMedicineFeature.Requests;
using Application.Responses;
using AutoMapper;
using Domain.Entites;
using MediatR;

namespace Application.Features.PharmacyMedicineFeature.Handlers;

public class CreatePharamcyMedicineHandler : IRequestHandler<CreatePharamcyMedicineRequest, BaseCommandResponse<PharmacyMedicine>>{
    private readonly IAuthService _authService;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public CreatePharamcyMedicineHandler(IAuthService authService, IUnitOfWork unitOfWork, IMapper mapper){
        _authService = authService;
        _mapper = mapper;
        _unitOfWork = unitOfWork;
    }

    public async Task<BaseCommandResponse<PharmacyMedicine>> Handle(CreatePharamcyMedicineRequest request, CancellationToken cancellationToken){
        try{
            var currUser = await _authService.TokenValidator(request.Token);
            var validator = new IPharamcyMedicineDTOValidator(_unitOfWork.MedicineRepository, _unitOfWork.PharmacyRepository );
            var validationResult = await validator.ValidateAsync(_mapper.Map<IPharamcyMedicineDTO>(request.Body));
            if (!validationResult.IsValid) throw new ValidationException(validationResult);
            var pharmacyMedicine = _mapper.Map<PharmacyMedicine>(request.Body);
            await _unitOfWork.PharamacyMedicineRepository.Add(pharmacyMedicine);
            await _unitOfWork.Save();
            return BaseCommandResponse<PharmacyMedicine>.SuccessHandler(pharmacyMedicine);
        }
        catch(Exception e){
            return BaseCommandResponse<PharmacyMedicine>.FailureHandler(e);
        }
    }
}