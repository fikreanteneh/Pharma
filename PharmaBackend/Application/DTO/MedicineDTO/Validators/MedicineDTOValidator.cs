using Application.Contracts.Persistance;
using Application.DTO.MedicineDTO;
using FluentValidation;

namespace Application.DTO.PharmacyDTO.Validators;

public class MedicineDTOValidator: AbstractValidator<MedicineDTO.MedicineDTO>{
    public MedicineDTOValidator(IMedicineRepository medicineRepository){
        Include(new IMedicineDTOValidator());
        RuleFor(pharmacy => pharmacy.Id)
            .NotEmpty()
            .WithMessage("Id Is Required")
            .MustAsync(async (id, cancellation) => {
                var x = await medicineRepository.Get(id);
                return x != null;
            })
            .WithMessage("The Medicine with this id does not exist");
    }
}