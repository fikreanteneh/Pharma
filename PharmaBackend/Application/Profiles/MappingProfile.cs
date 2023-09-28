

using Application.DTO.MedicineDTO;
using Application.DTO.PharmacyDTO;
using Application.Model;
using Domain.Entites;

namespace Application.Profiles;

public class MappingProfile : AutoMapper.Profile
{

    public MappingProfile(){
        
        CreateMap<CreatePharmacyDTO, PharmacyAuthRequest>().ReverseMap();
        CreateMap<PharmacyAuthRequest,CreatePharmacyDTO>().ReverseMap();
        CreateMap<CreatePharmacyDTO, Pharmacy>().ReverseMap();
        CreateMap<PharmacyAuthRequest, Pharmacy>().ReverseMap();
        
        CreateMap<CreateMedicineDTO, Medicine>().ReverseMap();
        CreateMap<MedicineDTO, Medicine>().ReverseMap();

        

        CreateMap<Admin, AdminAuthRequest>().ReverseMap();

    }
    
}