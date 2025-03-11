namespace UKParliament.CodeTest.Web.ViewModels;

public class PersonViewModel
{
    public int? Id { get; set; }
    public string FirstName { get; set; } = null!;
    public string LastName { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Department { get; set; } = null!;
    public DateTime DateOfBirth { get; set; }
}