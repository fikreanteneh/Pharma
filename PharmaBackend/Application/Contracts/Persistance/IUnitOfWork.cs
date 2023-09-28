namespace Application.Contracts.Persistance;

public interface IUnitOfWork : IDisposable{
    
    IAdminRepository AdminRepository { get; }
    IPharmacyRepository PharmacyRepository { get; }
    IMedicineRepository MedicineRepository{ get; }
    IPharamacyMedicineRepository PharamacyMedicineRepository { get; }
    
    Task<int> Save();
    
}