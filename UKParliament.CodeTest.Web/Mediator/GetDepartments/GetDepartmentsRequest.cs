using MediatR;
using UKParliament.CodeTest.Web.ViewModels;

namespace UKParliament.CodeTest.Web.Mediator.GetDepartments
{
    public class GetDepartmentsRequest : IRequest<GetDepartmentsResponse>
    {
    }
}
