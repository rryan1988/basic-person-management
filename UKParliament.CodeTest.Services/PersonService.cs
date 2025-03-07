using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using UKParliament.CodeTest.Data;

namespace UKParliament.CodeTest.Services;

public class PersonService : IPersonService
{
    private ILogger<PersonService> _logger;
    private PersonManagerContext _context;
    public PersonService(PersonManagerContext context, ILogger<PersonService> logger)
    {
        _context = context;
        _logger = logger;
    }
    public async Task<IEnumerable<Person>> GetPeople()
    {
        return await _context.People.ToListAsync();
    }

    public async Task<Person?> GetPerson(int id)
    {
        return await _context.People.FirstOrDefaultAsync(p => p.Id == id);
    }

    public async Task<IEnumerable<Person>> GetPeopleByDepartment(string department)
    {
        return await _context.People.Where(p => p.Department == department).ToListAsync();
    }
}