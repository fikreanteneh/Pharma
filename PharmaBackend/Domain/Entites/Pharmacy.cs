using Domain.Common;
using NetTopologySuite.Geometries;

namespace Domain.Entites;

public class Pharmacy: BaseEntity{

    public required string AuthId { set; get; } 
    public required string Name { set; get; }
    public required string Address { set; get ; }
    public required List<string> PhoneNumbers { set; get; }
    public required List<string> Emails { set; get; }
    public virtual ICollection<PharmacyMedicine> PharmacyMedicines { get; set; } = new List<PharmacyMedicine>();

}