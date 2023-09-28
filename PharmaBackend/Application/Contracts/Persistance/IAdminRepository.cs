using Domain.Entites;

namespace Application.Contracts.Persistance;

public interface IAdminRepository : IGenericRepository<Admin>{
    Task<Admin> GetByAuthId(string id);
}