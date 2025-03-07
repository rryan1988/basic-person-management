using MediatR;
using UKParliament.CodeTest.Data;
using UKParliament.CodeTest.Services;
using UKParliament.CodeTest.Web.ViewModels;

namespace UKParliament.CodeTest.Web.Mediator.GetPerson
{
    public class GetPersonRequestHandler : IRequestHandler<GetPersonRequest, GetPersonResponse>
    {
        private readonly ILogger<GetPersonRequestHandler> _logger;
        private readonly IPersonService _personService;

        public GetPersonRequestHandler(IPersonService personService, ILogger<GetPersonRequestHandler> logger)
        {
            _logger = logger;
            _personService = personService;
        }

        public async Task<GetPersonResponse> Handle(GetPersonRequest request, CancellationToken cancellationToken)
        {
            try
            {
                Person? person = await _personService.GetPerson(request.Id);
                if (person == null)
                {
                    _logger.LogInformation("Person with ID {PersonId} not found.", request.Id);
                    return new GetPersonResponse { Person = null };
                }
                return MapResponse(person);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while getting person with ID {PersonId}.", request.Id);
                throw;
            }
        }

        private GetPersonResponse MapResponse(Person person)
        {
            var personViewModel = new PersonViewModel
            {
                Id = person.Id,
                FirstName = person.FirstName,
                LastName = person.LastName,
                Email = person.Email,
                Department = person.Department
            };
            return new GetPersonResponse
            {
                Person = personViewModel
            };
        }
    }
}
