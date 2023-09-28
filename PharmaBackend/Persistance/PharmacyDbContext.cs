using Domain.Entites;
using Microsoft.EntityFrameworkCore;
using NetTopologySuite.Geometries;
using Domain.Entites;
using NetTopologySuite;
using NpgsqlTypes;
using Location = Domain.Entites.Location;

namespace Persistence;

public class PharmacyDbContext : DbContext
{
    public virtual DbSet<Admin> Admins { get; set; }
    public virtual DbSet<Pharmacy> Pharmacies { get; set; }
    public virtual DbSet<Medicine> Medicines { get; set; }
    public virtual DbSet<PharmacyMedicine> PharmacyMedicines { get; set; }
    

    public PharmacyDbContext(DbContextOptions<PharmacyDbContext> options) : base(options) { }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder){
        base.OnModelCreating(modelBuilder);
        
        var geometryFactory = NtsGeometryServices.Instance.CreateGeometryFactory(srid: 4326);
        
        modelBuilder.HasPostgresExtension("postgis");
        
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(PharmacyDbContext).Assembly);
        
        modelBuilder.Entity<Admin>(
            entity => {
                entity
                    .Property(e => e.Id)
                    .UseIdentityColumn();
                entity
                    .Property(e => e.Name)
                    .IsRequired();
            }
        ); 
        
        modelBuilder.Entity<Medicine>(
            entity => {
                entity
                    .Property(e => e.Id)
                    .UseIdentityColumn();
                entity
                    .Property(e => e.Name)
                    .IsRequired();
                entity
                    .Property(e => e.AmharicName)
                    .IsRequired();
            }
        );

        modelBuilder.Entity<Pharmacy>(
            entity => {
                entity
                    .Property(e => e.Id)
                    .UseIdentityColumn();
                entity
                    .Property(e => e.AuthId)
                    .IsRequired();
                entity
                    .Property(e => e.Name)
                    .IsRequired();
                entity
                    .Property(e => e.AuthId)
                    .IsRequired();
                entity
                    .Property(e => e.PhoneNumbers)
                    .HasDefaultValue(new List<string>());
                entity
                    .Property(e => e.Emails)
                    .HasDefaultValue(new List<string>());
                entity
                    .Property(e => e.Address)
                    .IsRequired()
                    .HasColumnType("geography(Point)");
                entity
                    .HasMany(e => e.PharmacyMedicines)
                    .WithOne(e => e.Pharmacy);
                    
            }
        );
       
        modelBuilder.Entity<PharmacyMedicine>(
            entity => {
                entity
                    .HasKey(e => new{ e.MedicineId, e.PharmacyId });
                entity
                    .Property(e => e.Quantity)
                    .HasDefaultValue(0);
                entity
                    .Property(e => e.Price)
                    .HasDefaultValue(0);
                entity
                    .HasOne(e => e.Medicine)
                    .WithMany(u => u.PharmacyMedicines)
                    .HasForeignKey(e => e.MedicineId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_MEDICINE");
                entity
                    .HasOne(e => e.Pharmacy)
                    .WithMany(u => u.PharmacyMedicines)
                    .HasForeignKey(e => e.PharmacyId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_PHARMACY");
                
            }
        );
        

    }
    
}