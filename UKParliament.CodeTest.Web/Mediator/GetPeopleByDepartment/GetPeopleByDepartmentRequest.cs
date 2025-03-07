using MediatR;

namespace UKParliament.CodeTest.Web.Mediator.GetPeopleByDepartment
{
    public class GetPeopleByDepartmentRequest : IRequest<GetPeopleByDepartmentResponse>
    {
        public string Department { get; set; } = null!;
    }
}
