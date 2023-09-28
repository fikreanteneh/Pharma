using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Infrastructure.Model;

namespace Infrastructure;

public class AuthIdentityDbContext : IdentityDbContext<ApplicaionUser> 
{ 
    public AuthIdentityDbContext(DbContextOptions<AuthIdentityDbContext> options) : base(options) 
    { 
         
    } 
 
    protected override void OnModelCreating(ModelBuilder builder){
        base.OnModelCreating(builder);
        builder.ApplyConfigurationsFromAssembly(typeof(AuthIdentityDbContext).Assembly);
    } 
 
 
}