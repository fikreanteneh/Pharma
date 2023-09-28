using Application.Contracts.Persistance;
using Application.Exceptions;

namespace Persistence.Persistance.Repository;

public class UnitOfWork : IUnitOfWork{
    private readonly PharmacyDbContext _context;
    private IAdminRepository _adminRepository;
    private IPharmacyRepository _pharmacyRepository;
    private IMedicineRepository _medicineRepository;
    private IPharamacyMedicineRepository _pharmacyMedicineRepository;
    public UnitOfWork(PharmacyDbContext context){
        _context = context;
    }

    public IAdminRepository AdminRepository => _adminRepository ??= new AdminRepository(_context);
    public IPharmacyRepository PharmacyRepository => _pharmacyRepository ??= new PharmacyRepository(_context);
    public IMedicineRepository MedicineRepository => _medicineRepository ??= new MedicineRepository(_context);
    public IPharamacyMedicineRepository PharamacyMedicineRepository => _pharmacyMedicineRepository ??= new PharmacyMedicineRepository(_context);

    public void Dispose(){
        _context.Dispose();
        GC.SuppressFinalize(this);
    }

    public async Task<int> Save(){
        int changes = await _context.SaveChangesAsync();
        if (changes == 0) throw new ServerErrorException("Something Went Wrong!");
        return changes;
    }
}