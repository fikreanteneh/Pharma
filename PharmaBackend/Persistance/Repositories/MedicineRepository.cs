using System.Text.RegularExpressions;
using Application.Contracts.Persistance;
using Domain.Entites;
using Microsoft.EntityFrameworkCore;


namespace Persistence.Persistance.Repository;

public class MedicineRepository : GenericRepository<Medicine>, IMedicineRepository{
    private readonly PharmacyDbContext _dbContext;


    public MedicineRepository(PharmacyDbContext context) : base(context){
        _dbContext = context;
    }
    
    public async Task<List<Medicine>> GetAll(int pageNumber = 0, int pageSize = 15, string name = ""){
        var query = _dbContext.Medicines.AsQueryable();
        if (!string.IsNullOrEmpty(name)){
            query = Regex.IsMatch(name, @"^[\u1200-\u137F\s]+$")
                ? query.Where(x => x.AmharicName.Contains(name))
                : query.Where(x => x.Name.ToLower().Contains(name.ToLower()));
        }
        return await query.Skip(pageNumber * pageSize).Take(pageSize).ToListAsync();
    }

}