using Infrastructure.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Identity.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<ApplicaionUser>
    {
        public void Configure(EntityTypeBuilder<ApplicaionUser> builder)
        {
            var hasher = new PasswordHasher<ApplicaionUser>();

            builder.HasData(
                new ApplicaionUser()
                {
                    Id = "8e445865-a24d-4543-a6c6-9443d048cdb9",
                    Email = "admin@localhost.com",
                    UserName = "admin@localhost.com",
                    NormalizedUserName = "ADMIN@LOCALHOST.COM",
                    NormalizedEmail = "ADMIN@LOCALHOST.COM",
                    PasswordHash = hasher.HashPassword(null, "ABcd@1234"),
                    EmailConfirmed = true
                },
                new ApplicaionUser()
                {
                    Id = "9e224968-33e4-4652-b7b7-8574d048cdb9",
                    Email = "pharmacy@localhost.com",
                    UserName = "pharmacy@localhost.com",
                    NormalizedUserName = "PHARMACY@LOCALHOST.COM",
                    NormalizedEmail = "pharmacy@LOCALHOST.COM",
                    PasswordHash = hasher.HashPassword(null, "ABcd@1234"),
                    EmailConfirmed = true
                }
            );
        }
    }
}