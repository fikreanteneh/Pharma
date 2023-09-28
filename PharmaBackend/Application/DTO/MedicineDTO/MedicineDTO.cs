using Application.DTO.Common;
using Domain.Common;

namespace Application.DTO.MedicineDTO;

public class MedicineDTO : BaseEntityDTO, IMedicineDTO{
    public string Name{ get; set; }
    public string AmharicName{ get; set; }
}