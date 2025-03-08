using FluentValidation.Results;
using MediatR;
using UKParliament.CodeTest.Services;

namespace UKParliament.CodeTest.Web.Mediator.UpdatePerson
{
    public class UpdatePersonCommandHandler : IRequestHandler<UpdatePersonCommand, UpdatePersonResponse>
    {
        ILogger<UpdatePersonCommandHandler> _logger;
        IPersonService _personService;
        public UpdatePersonCommandHandler(IPersonService personService, ILogger<UpdatePersonCommandHandler> logger)
        {
            _logger = logger;
            _personService = personService;
        }
        public async Task<UpdatePersonResponse> Handle(UpdatePersonCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var person = await _personService.GetPerson(request.Person.Id);
                if (person == null)
                {
                    _logger.LogWarning("Person with ID {PersonId} not found.", request.Person.Id);
                    return new UpdatePersonResponse
                    {
                        ValidationMessage = new ValidationResult(new List<ValidationFailure>
                {
                    new ValidationFailure("Id", "Person not found")
                })
                    };
                }

                person.FirstName = request.Person.FirstName;
                person.LastName = request.Person.LastName;
                person.Email = request.Person.Email;
                person.Department = request.Person.Department;
                person.DateOfBirth = request.Person.DateOfBirth;

                await _personService.UpdatePerson(person);

                return new UpdatePersonResponse
                {
                    Id = person.Id
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while updating the person with ID {PersonId}.", request.Person.Id);
                throw;
            }
        }
    }
}
