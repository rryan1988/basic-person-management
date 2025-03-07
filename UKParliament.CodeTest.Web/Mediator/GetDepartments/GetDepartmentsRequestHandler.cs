using MediatR;
using UKParliament.CodeTest.Data;
using UKParliament.CodeTest.Services;
using UKParliament.CodeTest.Web.ViewModels;

namespace UKParliament.CodeTest.Web.Mediator.GetDepartments
{
    public class GetDepartmentsRequestHandler : IRequestHandler<GetDepartmentsRequest, GetDepartmentsResponse>
    {
        private readonly ILogger<GetDepartmentsRequestHandler> _logger;
        private readonly IDepartmentService _departmentService;

        public GetDepartmentsRequestHandler(IDepartmentService departmentService, ILogger<GetDepartmentsRequestHandler> logger)
        {
            _logger = logger;
            _departmentService = departmentService;
        }

        public async Task<GetDepartmentsResponse> Handle(GetDepartmentsRequest request, CancellationToken cancellationToken)
        {
            try
            {
                var departments = await _departmentService.GetDepartments();
                return MapResponse(departments);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while getting departments.");
                throw;
            }
        }

        private GetDepartmentsResponse MapResponse(IEnumerable<Department> departments)
        {
            var departmentData = MapToViewData(departments);
            return new GetDepartmentsResponse
            {
                Departments = departmentData
            };
        }

        private IEnumerable<DepartmentViewModel> MapToViewData(IEnumerable<Department> departments)
        {
            List<DepartmentViewModel> departmentViewModel = new List<DepartmentViewModel>();
            foreach (var department in departments)
            {
                departmentViewModel.Add(new DepartmentViewModel
                {
                    Id = department.Id,
                    Name = department.Name,
                    DepartmentCode = department.DepartmentCode
                });
            }
            return departmentViewModel;
        }
    }
}
