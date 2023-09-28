using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Identity.Configurations
{
    public class RoleConfiguration : IEntityTypeConfiguration<IdentityRole>
    {
        public void Configure(EntityTypeBuilder<IdentityRole> builder)
        {
            builder.HasData(
                new IdentityRole
                {
                    Id = "USER",
                    Name = "USER",
                    NormalizedName = "USER"
                },
                new IdentityRole
                {
                    Id = "ADMIN",
                    Name = "ADMIN",
                    NormalizedName = "ADMIN"
                },
                new IdentityRole
                {
                    Id = "PHARMACY",
                    Name = "PHARMACY",
                    NormalizedName = "PHARMACY"
                }
            );
        }
    }
}