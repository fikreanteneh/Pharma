using Domain.Entites;

namespace Application.Contracts.Persistance;

public interface IPharmacyRepository : IGenericRepository<Pharmacy>{
    Task<Pharmacy> GetByAuthId(string id);
}