using MediatR;
using UKParliament.CodeTest.Data;
using UKParliament.CodeTest.Services;
using UKParliament.CodeTest.Web.ViewModels;

namespace UKParliament.CodeTest.Web.Mediator.GetPeople
{
    public class GetPeopleRequestHandler : IRequestHandler<GetPeopleRequest, GetPeopleResponse>
    {
        private ILogger<GetPeopleRequestHandler> _logger;
        private IPersonService _personService;
        public GetPeopleRequestHandler(IPersonService personService, ILogger<GetPeopleRequestHandler> logger) 
        {
            _logger = logger;
            _personService = personService;
        }

        public async Task<GetPeopleResponse> Handle(GetPeopleRequest request, CancellationToken cancellationToken)
        {
            try
            {
                var people = await _personService.GetPeople();
                return MapResponse(people);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while getting people.");
                throw;
            }
        }

        private GetPeopleResponse MapResponse(IEnumerable<Person> people)
        {
            var peopleData = MapToViewData(people);
            return new GetPeopleResponse
            {
                People = peopleData
            };
        }

        private IEnumerable<PersonViewModel> MapToViewData(IEnumerable<Person> people)
        {
            List<PersonViewModel> peopleViewModel = new List<PersonViewModel>();
            foreach (var person in people)
            {
                peopleViewModel.Add(new PersonViewModel
                {
                    Id = person.Id,
                    FirstName = person.FirstName,
                    LastName = person.LastName,
                    Email = person.Email,
                    Department = person.Department,
                    DateOfBirth = person.DateOfBirth
                });
            }
            return peopleViewModel;
        }
    }
}
