using Application.DTO.Common;

namespace Application.DTO.MedicineDTO;

public class UpdateMedicineDTO: BaseEntityDTO, IMedicineDTO{
    public string Name{ get; set; }
    public string AmharicName{ get; set; }
}