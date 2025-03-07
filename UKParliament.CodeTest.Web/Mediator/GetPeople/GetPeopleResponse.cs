using UKParliament.CodeTest.Web.ViewModels;

namespace UKParliament.CodeTest.Web.Mediator.GetPeople
{
    public class GetPeopleResponse
    {
        public IEnumerable<PersonViewModel>? People { get; set; }
    }
}
