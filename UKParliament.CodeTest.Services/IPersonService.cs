using UKParliament.CodeTest.Data;

namespace UKParliament.CodeTest.Services;

public interface IPersonService
{
    public Task<IEnumerable<Person>> GetPeople();
    public Task<Person?> GetPerson(int id);
    Task<IEnumerable<Person>> GetPeopleByDepartment(string departmentId);

}