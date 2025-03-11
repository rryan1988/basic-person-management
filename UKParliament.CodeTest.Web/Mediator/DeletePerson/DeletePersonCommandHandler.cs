using MediatR;
using UKParliament.CodeTest.Services;

namespace UKParliament.CodeTest.Web.Mediator.DeletePerson
{
    public class DeletePersonCommandHandler : IRequestHandler<DeletePersonCommand, DeletePersonResponse>
    {

        private readonly ILogger<DeletePersonCommandHandler> _logger;
        private readonly IPersonService _personService;

        public DeletePersonCommandHandler(IPersonService personService, ILogger<DeletePersonCommandHandler> logger)
        {
            _personService = personService;
            _logger = logger;
        }

        public async Task<DeletePersonResponse> Handle(DeletePersonCommand request, CancellationToken cancellationToken)
        {
            try
            {
                await _personService.DeletePerson(request.Id);
                return new DeletePersonResponse();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while deleting the person.");
                return new DeletePersonResponse
                {
                    ValidationMessage = new FluentValidation.Results.ValidationResult(new List<FluentValidation.Results.ValidationFailure>
                    {
                        new FluentValidation.Results.ValidationFailure("Id", "An error occurred while deleting the person.")
                    })
                };
            }
        }
    }
}
