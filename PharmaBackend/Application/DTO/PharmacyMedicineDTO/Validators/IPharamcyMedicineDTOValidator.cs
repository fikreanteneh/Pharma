using Application.Contracts.Persistance;
using FluentValidation;

namespace Application.DTO.PharmacyMedicineDTO.Validators;

public class IPharamcyMedicineDTOValidator : AbstractValidator<IPharamcyMedicineDTO>{
    public IPharamcyMedicineDTOValidator(IMedicineRepository medicineRepository, IPharmacyRepository pharmacyRepository){
        RuleFor(x => x.PharmacyId)
            .NotNull().NotEmpty()
            .MustAsync(async (id, cancellation) => await pharmacyRepository.Exists(id))
            .WithMessage("Pharmacy does not exist");
        RuleFor(x => x.MedicineId)
            .NotNull().NotEmpty()
            .MustAsync(async (id, cancellation) => await pharmacyRepository.Exists(id))
            .WithMessage("Medicine does not exist");;
        RuleFor(x => x.Quantity)
            .NotNull().NotEmpty()
            .GreaterThan(-1)
            .WithMessage("Quantity must be greater than or equal 0");
        RuleFor(x => x.Price)
            .NotNull().NotEmpty()
            .GreaterThan(0)
            .WithMessage("Price must be greater than 0");
    }
    
}