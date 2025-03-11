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
            new Department { Id = 4, Name = "HR", DepartmentCode = "HR" },
            new Department { Id = 5, Name = "IT", DepartmentCode = "IT" },
            new Department { Id = 6, Name = "Legal", DepartmentCode = "LGL" },
            new Department { Id = 7, Name = "Mysteries", DepartmentCode = "MYS"});

        modelBuilder.Entity<Person>().HasData(
            new Person { Id = 1, FirstName = "John", LastName = "Doe", Email = "john.doe@example.com", Department = "Sales", DateOfBirth = new DateTime(1985, 5, 15) },
            new Person { Id = 2, FirstName = "Jane", LastName = "Smith", Email = "jane.smith@example.com", Department = "Marketing", DateOfBirth = new DateTime(1990, 8, 25) },
            new Person { Id = 3, FirstName = "Michael", LastName = "Johnson", Email = "michael.johnson@example.com", Department = "Finance", DateOfBirth = new DateTime(1982, 3, 10) },
            new Person { Id = 4, FirstName = "Emily", LastName = "Davis", Email = "emily.davis@example.com", Department = "HR", DateOfBirth = new DateTime(1995, 12, 5) },
            new Person { Id = 5, FirstName = "William", LastName = "Brown", Email = "william.brown@example.com", Department = "Sales", DateOfBirth = new DateTime(1987, 7, 20) },
            new Person { Id = 6, FirstName = "Olivia", LastName = "Jones", Email = "olivia.jones@example.com", Department = "Marketing", DateOfBirth = new DateTime(1992, 11, 30) },
            new Person { Id = 7, FirstName = "James", LastName = "Garcia", Email = "james.garcia@example.com", Department = "Finance", DateOfBirth = new DateTime(1983, 4, 18) },
            new Person { Id = 8, FirstName = "Sophia", LastName = "Martinez", Email = "sophia.martinez@example.com", Department = "HR", DateOfBirth = new DateTime(1996, 9, 22) },
            new Person { Id = 9, FirstName = "Benjamin", LastName = "Rodriguez", Email = "benjamin.rodriguez@example.com", Department = "Sales", DateOfBirth = new DateTime(1988, 6, 12) },
            new Person { Id = 10, FirstName = "Isabella", LastName = "Wilson", Email = "isabella.wilson@example.com", Department = "Marketing", DateOfBirth = new DateTime(1991, 10, 14) },
            new Person { Id = 11, FirstName = "Henry", LastName = "Lee", Email = "henry.lee@example.com", Department = "Finance", DateOfBirth = new DateTime(1984, 2, 28) },
            new Person { Id = 12, FirstName = "Mia", LastName = "Walker", Email = "mia.walker@example.com", Department = "HR", DateOfBirth = new DateTime(1997, 3, 6) },
            new Person { Id = 13, FirstName = "Alexander", LastName = "Hall", Email = "alexander.hall@example.com", Department = "Sales", DateOfBirth = new DateTime(1986, 1, 19) },
            new Person { Id = 14, FirstName = "Charlotte", LastName = "Allen", Email = "charlotte.allen@example.com", Department = "Marketing", DateOfBirth = new DateTime(1993, 5, 27) },
            new Person { Id = 15, FirstName = "Daniel", LastName = "Young", Email = "daniel.young@example.com", Department = "Finance", DateOfBirth = new DateTime(1981, 12, 3) }
        );

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