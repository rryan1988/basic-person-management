namespace UKParliament.CodeTest.Data;

public class Person
{
    public int Id { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;
    public DateTime DateOfBirth { get; set; }
    public string Department { get; set; } = null!;
    public string Email { get; set; } = null!;
}