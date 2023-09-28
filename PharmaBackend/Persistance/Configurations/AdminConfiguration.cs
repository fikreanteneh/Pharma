using Domain.Entites;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;


namespace Persistance.Configurations;

    public class AdminConfiguration : IEntityTypeConfiguration<Admin>
    {
        public void Configure(EntityTypeBuilder<Admin> builder)
        {

            builder.HasData(
                new Admin()
                {
                    Id = 1,
                    AuthId = "8e445865-a24d-4543-a6c6-9443d048cdb9",
                    Name = "Admin Admin",
                }
            );
        }
    }
