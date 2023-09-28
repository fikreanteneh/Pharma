using Application.DTO.MedicineDTO;
using FluentValidation;

namespace Application.DTO.PharmacyDTO.Validators;

public class IMedicineDTOValidator: AbstractValidator<IMedicineDTO>{
    public IMedicineDTOValidator(){
        RuleFor(pharmacy => pharmacy.Name)
            .NotEmpty()
            .WithMessage("Name Is Required");
        RuleFor(pharmacy => pharmacy.AmharicName)
            .NotEmpty()
            .WithMessage("Amharic Name Is Required")
            .Matches(@"^[\u1200-\u137F\s]+$")
            .WithMessage("AmharicName should only contain Amharic characters");
    }
}