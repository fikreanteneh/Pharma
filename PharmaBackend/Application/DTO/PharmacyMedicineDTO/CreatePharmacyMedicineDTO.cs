namespace Application.DTO.PharmacyMedicineDTO;

public class CreatePharmacyMedicineDTO : IPharamcyMedicineDTO{
    public int PharmacyId{ get; set; }
    public int MedicineId{ get; set; }
    public int Quantity{ get; set; }
    public float Price{ get; set; }
}
