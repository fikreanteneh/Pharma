using Application.Contracts.Persistance;
using Application.DTO.MedicineDTO;
using Application.Features.MedicineFeature.Requests;
using Application.Responses;
using AutoMapper;
using Domain.Entites;
using MediatR;

namespace Application.Features.MedicineFeature.Handlers;

public class GetMedicineHandler : IRequestHandler<GetMedicineRequest, BaseCommandResponse<List<MedicineDTO>>>{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public GetMedicineHandler(IUnitOfWork unitOfWork, IMapper mapper){
        _mapper = mapper;
        _unitOfWork = unitOfWork;
    }

    public async Task<BaseCommandResponse<List<MedicineDTO>>> Handle(GetMedicineRequest request, CancellationToken cancellationToken){
        try{
            var medicines = await _unitOfWork.MedicineRepository.GetAll(request.PageNumber, request.PageSize, request.Name);
            return BaseCommandResponse<List<MedicineDTO>>.SuccessHandler(_mapper.Map<List<MedicineDTO>>(medicines));
        }catch(Exception e){
            return BaseCommandResponse<List<MedicineDTO>>.FailureHandler(e);
        }
    }
}