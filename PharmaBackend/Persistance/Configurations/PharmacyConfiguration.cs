using Domain.Entites;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NetTopologySuite.Geometries;


namespace Persistance.Configurations;

public class PharmacyConfiguration : IEntityTypeConfiguration<Pharmacy>
{
    public void Configure(EntityTypeBuilder<Pharmacy> builder)
    {
        builder.HasData(

            new Pharmacy
            {
                Id = 2,
                AuthId = "9e224968-33e4-4652-b7b7-8574d048cdb9",
                Name = "Pharamacy Pharmacy",
                Address = "POINT(-10.946823 40.807416)" ,
                PhoneNumbers = new List<string> {"0940229161"},
                Emails = new List<string> {"pharmacy@localhost.com"},
                
                
            }
        );
    }
}