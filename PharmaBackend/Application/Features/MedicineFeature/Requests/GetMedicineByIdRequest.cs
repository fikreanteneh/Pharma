using MediatR;

namespace Application.Features.MedicineFeature.Requests;

public class GetMedicineByIdRequest : IRequest<Unit>{
    public required int Id { get; set; }
}