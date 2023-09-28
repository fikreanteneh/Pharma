using FluentValidation;

namespace Application.DTO.PharmacyDTO.Validators;

public class CreatePharmacyDTOValidator : AbstractValidator<CreatePharmacyDTO>{

    public CreatePharmacyDTOValidator(){
        Include(new IPharmacyDTOValidator());
    }
    
}