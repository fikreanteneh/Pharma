using Location = Domain.Entites.Location;

namespace Application.DTO.PharmacyDTO;

public class CreatePharmacyDTO: IPharmacyDTO{
    public string Name { set; get; }

    public Location Address { set; get; }

    public List<string> PhoneNumbers { set; get; }

    public List<string> Emails { set; get; }
}