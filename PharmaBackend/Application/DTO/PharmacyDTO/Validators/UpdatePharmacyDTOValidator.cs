using Application.Contracts.Persistance;
using FluentValidation;

namespace Application.DTO.PharmacyDTO.Validators;

public class UpdatePharmacyDTOValidator : AbstractValidator<UpdatePharmacyDTO>{
    UpdatePharmacyDTOValidator(IPharmacyRepository pharmacyRepository){
        Include(new IPharmacyDTOValidator());
        RuleFor(pharamacy => pharamacy.Id)
            .NotEmpty()
            .NotNull()
            .MustAsync(async (id, cancellation) => await pharmacyRepository.Exists(id))
            .WithMessage("Pharmacy with this id does not exist");
        RuleFor(pharmacy => pharmacy)
            .NotEmpty()
            .NotNull()
            .MustAsync(async (pharma, cancellation) => {
                var x = await pharmacyRepository.Get(pharma.Id);
                return x.AuthId == pharma.AuthId;
            })
            .WithMessage("You are not authorized to do this");
    
}
}