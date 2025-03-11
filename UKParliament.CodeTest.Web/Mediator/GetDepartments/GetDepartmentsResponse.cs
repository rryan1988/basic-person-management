using UKParliament.CodeTest.Web.ViewModels;

namespace UKParliament.CodeTest.Web.Mediator.GetDepartments
{
    public class GetDepartmentsResponse
    {
        public IEnumerable<DepartmentViewModel>? Departments { get; set; }
    }
}
