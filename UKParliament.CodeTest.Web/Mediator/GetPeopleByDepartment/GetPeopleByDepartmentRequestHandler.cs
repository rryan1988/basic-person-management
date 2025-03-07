using MediatR;
using UKParliament.CodeTest.Data;
using UKParliament.CodeTest.Services;
using UKParliament.CodeTest.Web.ViewModels;

namespace UKParliament.CodeTest.Web.Mediator.GetPeopleByDepartment
{
    public class GetPeopleByDepartmentRequestHandler : IRequestHandler<GetPeopleByDepartmentRequest, GetPeopleByDepartmentResponse>
    {
        private readonly ILogger<GetPeopleByDepartmentRequestHandler> _logger;
        private readonly IPersonService _personService;

        public GetPeopleByDepartmentRequestHandler(IPersonService personService, ILogger<GetPeopleByDepartmentRequestHandler> logger)
        {
            _logger = logger;
            _personService = personService;
        }

        public async Task<GetPeopleByDepartmentResponse> Handle(GetPeopleByDepartmentRequest request, CancellationToken cancellationToken)
        {
            try
            {
                var people = await _personService.GetPeopleByDepartment(request.Department);
                return MapResponse(people);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while getting people by department.");
                throw;
            }
        }

        private GetPeopleByDepartmentResponse MapResponse(IEnumerable<Person> people)
        {
            var peopleData = MapToViewData(people);
            return new GetPeopleByDepartmentResponse
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
                    Department = person.Department
                });
            }
            return peopleViewModel;
        }
    }
}
