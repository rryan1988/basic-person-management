namespace UKParliament.CodeTest.Web.ViewModels;

public class PersonViewModel
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public int Id { get; internal set; }
    public object Age { get; internal set; }
    public string Email { get; internal set; }
    public string Department { get; internal set; }
}