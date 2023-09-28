using Application.Contracts.Persistance;
using Domain.Entites;
using Microsoft.EntityFrameworkCore;


namespace Persistence.Persistance.Repository;

public class PharmacyRepository : GenericRepository<Pharmacy>, IPharmacyRepository{
    private readonly PharmacyDbContext _dbContext;


    public PharmacyRepository(PharmacyDbContext context) : base(context){
        _dbContext = context;
    }

    public async Task<Pharmacy> GetByAuthId(string id){
        Console.WriteLine(id);
        return await _dbContext.Pharmacies.FirstOrDefaultAsync(a => a.AuthId == id);
    }
}