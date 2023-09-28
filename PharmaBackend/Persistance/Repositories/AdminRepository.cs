using Application.Contracts.Persistance;
using Domain.Entites;
using Microsoft.EntityFrameworkCore;


namespace Persistence.Persistance.Repository;

public class AdminRepository : GenericRepository<Admin>, IAdminRepository{
    private readonly PharmacyDbContext _dbContext;


    public AdminRepository(PharmacyDbContext context) : base(context){
        _dbContext = context;
    }

    public async Task<Admin> GetByAuthId(string id){
        return await _dbContext.Admins.FirstOrDefaultAsync(a => a.AuthId == id);
    }
}