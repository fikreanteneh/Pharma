using Application.Contracts.Persistance;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Persistence.Persistance.Repository;

namespace Persistence;

public static class PersistanceConfigurationService{
    public static IServiceCollection AddPersistanceService(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext< PharmacyDbContext > (options => {
            options.UseNpgsql(configuration.GetConnectionString("Pharmacy"));
        });

        services.AddScoped<IUnitOfWork, UnitOfWork>();
        return services;
    }
    
}