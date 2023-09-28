using FluentValidation;

namespace Application.DTO.PharmacyDTO.Validators;

public class IPharmacyDTOValidator: AbstractValidator<IPharmacyDTO>{
    public IPharmacyDTOValidator(){
        RuleFor(pharmacy => pharmacy.Name)
            .NotEmpty()
            .WithMessage("Name Is Required");
        RuleFor(pharmacy => pharmacy.Address.Latitude)
            .GreaterThan(3)
            .LessThan(15)
            .WithMessage("This Is NOT A Valid Lattitude Location");
        RuleFor(pharmacy => pharmacy.Address.Longitude)
            .GreaterThan(33)
            .LessThan(50)
            .WithMessage("This Is NOT A Valid Longtiude Location");
        RuleFor(pharmacy => pharmacy.PhoneNumbers)
            .Must(phoneNumbers => phoneNumbers != null && phoneNumbers.Count >= 1)
            .WithMessage("PhoneNumbers must contain at least one number.");
        RuleFor(pharmacy => pharmacy.Emails)
            .Must(emails => emails != null && emails.Count >= 1)
            .WithMessage("PhoneNumbers must contain at least one number.");
            
    }
}