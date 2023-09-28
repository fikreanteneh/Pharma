using Application.DTO.MedicineDTO;
using Application.Responses;
using Domain.Entites;
using MediatR;

namespace Application.Features.MedicineFeature.Requests;

public class CreateMedicineRequest : IRequest<BaseCommandResponse<Medicine>>{
    public required CreateMedicineDTO Body { get; set; }
    public required string Token { get; set; }
    
}