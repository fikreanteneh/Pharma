using Application.DTO.MedicineDTO;
using Application.Responses;
using Domain.Entites;
using MediatR;

namespace Application.Features.MedicineFeature.Requests;

public class GetMedicineRequest : IRequest<BaseCommandResponse<List<MedicineDTO>>>{
    public int PageNumber{ get; set; } = 0;
    public int PageSize{ get; set; } = 15;
    public string Name{ get; set; } = "";

    public string orderedBy{ get; set; } = "Id";
}