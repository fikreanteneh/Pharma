using Application.DTO.Common;
using Location = Domain.Entites.Location;

namespace Application.DTO.PharmacyDTO;

public class UpdatePharmacyDTO :  BaseEntityDTO, IPharmacyDTO{
    
    public  string AuthId { set; get; }
    public  string Name { set; get; }
    public  Location Address { set; get; }
    public  List<string> PhoneNumbers { set; get; }
    public  List<string> Emails { set; get; }
}