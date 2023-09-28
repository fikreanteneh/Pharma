using Application.DTO.MedicineDTO;
using Application.DTO.PharmacyMedicineDTO;
using Application.Responses;
using Domain.Entites;
using MediatR;

namespace Application.Features.PharmacyMedicineFeature.Requests;

public class CreatePharamcyMedicineRequest : IRequest<BaseCommandResponse<PharmacyMedicine>>{
    
    public required CreatePharmacyMedicineDTO Body{ get; set; }
    public required string Token{ get; set; }
    
}