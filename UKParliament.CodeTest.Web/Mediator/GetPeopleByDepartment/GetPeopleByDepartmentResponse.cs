using FluentValidation.Results;
using UKParliament.CodeTest.Web.ViewModels;

namespace UKParliament.CodeTest.Web.Mediator.GetPeopleByDepartment
{
    public class GetPeopleByDepartmentResponse : BaseResponseWithValidation
    {
        public IEnumerable<PersonViewModel>? People { get; set; }
    }
}
