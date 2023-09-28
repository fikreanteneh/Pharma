using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using Persistence;

public class PharamacyFactory : IDesignTimeDbContextFactory<PharmacyDbContext>
{
    public PharmacyDbContext CreateDbContext(string[] args)
    {
        IConfigurationRoot configuration = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory() + "../../WebApi")
            .AddJsonFile("appsettings.json")
            .Build();

        var builder = new DbContextOptionsBuilder<PharmacyDbContext>();
        var connectionString = configuration.GetConnectionString("Pharmacy");
        
        builder.UseNpgsql<PharmacyDbContext>(connectionString, options =>
        {
            options.UseNetTopologySuite();
        });
        // builder.UseNpgsql(connectionString, options =>
        // {
        //     options.UseNetTopologySuite();
        // });
        // builder.UseNpgsql(connectionString);

        return new PharmacyDbContext(builder.Options);
    }
}