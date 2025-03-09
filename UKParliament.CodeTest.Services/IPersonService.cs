using UKParliament.CodeTest.Data;

namespace UKParliament.CodeTest.Services;

public interface IPersonService
{
    public Task<IEnumerable<Person>> GetPeople();
    public Task<Person?> GetPerson(int id);
    public Task<int> CreatePerson(Person person);
    public Task UpdatePerson(Person person);

}