using Domain.Entites;

namespace Application.Contracts.Persistance;

public interface IMedicineRepository : IGenericRepository<Medicine>{
    
    public Task<List<Medicine>> GetAll(int pageNumber = 0, int pageSize = 15, string name = "");
}