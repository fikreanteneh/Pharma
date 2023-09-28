
using Domain.Common;

namespace Domain.Entites;
public class Medicine : BaseEntity {
    public required string Name { set; get; }
    public required string AmharicName { set; get; }

    public virtual ICollection<PharmacyMedicine> PharmacyMedicines { get; set; } = new List<PharmacyMedicine>();
}