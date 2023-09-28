using Application.Contracts.Identity;
using Application.Contracts.Persistance;
using Application.DTO.MedicineDTO;
using Application.DTO.PharmacyDTO.Validators;
using Application.Exceptions;
using Application.Features.MedicineFeature.Requests;
using Application.Responses;
using AutoMapper;
using Domain.Entites;
using MediatR;

namespace Application.Features.MedicineFeature.Handlers;

public class CreateMedicineHandler : IRequestHandler<CreateMedicineRequest, BaseCommandResponse<Medicine>>{
    private readonly IAuthService _authService;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public CreateMedicineHandler(IAuthService authService, IUnitOfWork unitOfWork, IMapper mapper){
        _authService = authService;
        _mapper = mapper;
        _unitOfWork = unitOfWork;
    }

    public async Task<BaseCommandResponse<Medicine>> Handle(CreateMedicineRequest request,
        CancellationToken cancellationToken){
        try{
            var currUser = await _authService.TokenValidator(request.Token);
            var validator = new IMedicineDTOValidator();
            var validationResult = await validator.ValidateAsync(_mapper.Map<IMedicineDTO>(request.Body));
            if (!validationResult.IsValid) throw new ValidationException(validationResult);
            var medicine = _mapper.Map<Medicine>(request.Body);
            await _unitOfWork.MedicineRepository.Add(medicine);
            await _unitOfWork.Save();
            return BaseCommandResponse<Medicine>.SuccessHandler(medicine);
        }
        catch(Exception e){
            return BaseCommandResponse<Medicine>.FailureHandler(e);
        }
    }

}