namespace Application.DTO.PharmacyMedicineDTO;

public interface IPharamcyMedicineDTO{
    public int PharmacyId { get; set; }
    public int MedicineId { get; set; }
    public int Quantity { get; set; }
    public float Price { get; set; }
}