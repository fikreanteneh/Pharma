using Application.Contracts.Persistance;
using Domain.Entites;


namespace Persistence.Persistance.Repository;

public class PharmacyMedicineRepository : GenericRepository<PharmacyMedicine>, IPharamacyMedicineRepository{
    private readonly PharmacyDbContext _dbContext;


    public PharmacyMedicineRepository(PharmacyDbContext context) : base(context){
        _dbContext = context;
    }

    public Task<Admin> GetByAuthID(string id){
        throw new NotImplementedException();
    }
}