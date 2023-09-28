using Application.DTO.MedicineDTO;
using Application.Responses;
using MediatR;

namespace Application.Features.MedicineFeature.Requests;

public class DeleteMedicineRequest : IRequest<BaseCommandResponse<Unit>>{
    public required int Id { get; set; }
    public required string Token { get; set; }
    
}