using MediatR;
using UKParliament.CodeTest.Data;
using UKParliament.CodeTest.Services;

namespace UKParliament.CodeTest.Web.Mediator.CreatePerson
{
    public class CreatePersonCommandHandler : IRequestHandler<CreatePersonCommand, CreatePersonResponse>
    {
        private readonly ILogger<CreatePersonCommandHandler> _logger;
        private readonly IPersonService _personService;
        public CreatePersonCommandHandler(IPersonService personService, ILogger<CreatePersonCommandHandler> logger)
        {
            _personService = personService;
            _logger = logger;
        }
        public async Task<CreatePersonResponse> Handle(CreatePersonCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var person = new Person
                {
                    FirstName = request.NewPerson.FirstName,
                    LastName = request.NewPerson.LastName,
                    Email = request.NewPerson.Email,
                    Department = request.NewPerson.Department,
                };

                var personId = await _personService.CreatePerson(person);

                return new CreatePersonResponse
                {
                    Id = personId
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while creating a new person.");
                throw;
            }
        }
    }
}
