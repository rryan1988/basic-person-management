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
        try
        {
            return await _context.People.ToListAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while retrieving people.");
            throw new InvalidOperationException("An error occurred while retrieving people.", ex);
        }
    }

    public async Task<Person?> GetPerson(int id)
    {
        try
        {
            return await _context.People.FirstOrDefaultAsync(p => p.Id == id);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"An error occurred while retrieving the person with ID {id}.");
            throw new InvalidOperationException($"An error occurred while retrieving the person with ID {id}.", ex);
        }
    }

    public async Task<int> CreatePerson(Person person)
    {
        try
        {
            if (await _context.People.AnyAsync(p => p.Email == person.Email))
            {
                throw new InvalidOperationException("A person with the same email already exists.");
            }

            _context.People.Add(person);
            await _context.SaveChangesAsync();
            return person.Id;
        }
        catch (DbUpdateException ex)
        {
            _logger.LogError(ex, "An error occurred while creating a new person.");
            throw new InvalidOperationException("An error occurred while creating a new person.", ex);
        }
    }

    public async Task UpdatePerson(Person person)
    {
        try
        {
            var existingPerson = await _context.People.FirstOrDefaultAsync(p => p.Id == person.Id);
            if (existingPerson == null)
            {
                throw new InvalidOperationException("Person not found.");
            }

            if (await _context.People.AnyAsync(p => p.Email == person.Email && p.Id != person.Id))
            {
                throw new InvalidOperationException("A person with the same email already exists.");
            }

            existingPerson.FirstName = person.FirstName;
            existingPerson.LastName = person.LastName;
            existingPerson.Email = person.Email;
            existingPerson.Department = person.Department;
            existingPerson.DateOfBirth = person.DateOfBirth;

            await _context.SaveChangesAsync();
        }
        catch (DbUpdateException ex)
        {
            _logger.LogError(ex, "An error occurred while updating the person.");
            throw new InvalidOperationException("An error occurred while updating the person.", ex);
        }
    }
}