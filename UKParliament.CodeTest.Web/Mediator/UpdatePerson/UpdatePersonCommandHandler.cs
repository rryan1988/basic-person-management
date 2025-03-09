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
                var person = await _personService.GetPerson((int)request.UpdatedPerson.Id!);
                if (person == null)
                {
                    _logger.LogWarning("Person with ID {PersonId} not found.", request.UpdatedPerson.Id);
                    return new UpdatePersonResponse
                    {
                        ValidationMessage = new ValidationResult(new List<ValidationFailure>
                {
                    new ValidationFailure("Id", "Person not found")
                })
                    };
                }

                person.FirstName = request.UpdatedPerson.FirstName;
                person.LastName = request.UpdatedPerson.LastName;
                person.Email = request.UpdatedPerson.Email;
                person.Department = request.UpdatedPerson.Department;
                person.DateOfBirth = request.UpdatedPerson.DateOfBirth;

                await _personService.UpdatePerson(person);

                return new UpdatePersonResponse();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while updating the person with ID {PersonId}.", request.UpdatedPerson.Id);
                throw;
            }
        }
    }
}
