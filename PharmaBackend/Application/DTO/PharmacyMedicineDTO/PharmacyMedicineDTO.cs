using Domain.Common;

namespace Application.DTO.PharmacyMedicineDTO;

public class PharmacyMedicineDTO: BaseEntity, IPharamcyMedicineDTO{
    public int PharmacyId{ get; set; }
    public int MedicineId{ get; set; }
    public int Quantity{ get; set; }
    public float Price{ get; set; }
}