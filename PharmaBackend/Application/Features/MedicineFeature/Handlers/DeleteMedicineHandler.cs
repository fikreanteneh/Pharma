using Application.Contracts.Identity;
using Application.Contracts.Persistance;
using Application.Features.MedicineFeature.Requests;
using Application.Responses;
using AutoMapper;
using MediatR;

namespace Application.Features.MedicineFeature.Handlers;

public class DeleteMedicineHandler : IRequestHandler<DeleteMedicineRequest, BaseCommandResponse<Unit>>{
    private readonly IAuthService _authService;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public DeleteMedicineHandler(IAuthService authService, IUnitOfWork unitOfWork, IMapper mapper){
        _authService = authService;
        _mapper = mapper;
        _unitOfWork = unitOfWork;
    }

    public async Task<BaseCommandResponse<Unit>> Handle(DeleteMedicineRequest request, CancellationToken cancellationToken){
        try{
            var currUser = await _authService.TokenValidator(request.Token, "ADMIN");
            var medicine = await _unitOfWork.MedicineRepository.Get(request.Id);
            if (medicine == null) throw new KeyNotFoundException("Medicine not found");
            await _unitOfWork.MedicineRepository.Delete(medicine);
            await _unitOfWork.Save();
            return BaseCommandResponse<Unit>.SuccessHandler(Unit.Value);
        }
        catch(Exception e){
            return BaseCommandResponse<Unit>.FailureHandler(e);
        }
    }
}