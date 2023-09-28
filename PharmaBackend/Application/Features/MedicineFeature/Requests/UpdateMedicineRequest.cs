using Application.DTO.MedicineDTO;
using Application.Responses;
using MediatR;

namespace Application.Features.MedicineFeature.Requests;

public class UpdateMedicineRequest : IRequest<BaseCommandResponse<Unit>>{
    public required UpdateMedicineDTO Body { get; set; }
    public required string Token { get; set; }
    public required int Id { get; set; }
}