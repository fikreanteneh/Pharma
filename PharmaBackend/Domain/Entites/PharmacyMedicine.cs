using Domain.Common;

namespace Domain.Entites;

public class PharmacyMedicine : BaseEntity{

    public required int PharmacyId { get; set; }
    public required int MedicineId { get; set; }
    public required int Quantity { get; set; }
    public required float Price { get; set; }

    public virtual Pharmacy Pharmacy { get; set; }
    public virtual Medicine Medicine { get; set; }

}