using Microsoft.EntityFrameworkCore;

namespace UKParliament.CodeTest.Data;

public class PersonManagerContext(DbContextOptions<PersonManagerContext> options) : DbContext(options)
{
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Department>().HasData(
            new Department { Id = 1, Name = "Sales", DepartmentCode = "SLS" },
            new Department { Id = 2, Name = "Marketing", DepartmentCode = "MRK" },
            new Department { Id = 3, Name = "Finance", DepartmentCode = "FIN" },
            new Department { Id = 4, Name = "HR", DepartmentCode = "HR" });

        modelBuilder.Entity<Person>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).ValueGeneratedOnAdd();
            entity.HasIndex(e => e.Email).IsUnique();
            entity.Property(e => e.Email).IsRequired();
            entity.Property(e => e.DateOfBirth).IsRequired();
            entity.Property(e => e.FirstName).IsRequired();
            entity.Property(e => e.LastName).IsRequired();
            entity.Property(e => e.Department).IsRequired();

        });
    }

    public DbSet<Person> People { get; set; } = null!;

    public DbSet<Department> Departments { get; set; } = null!;
}