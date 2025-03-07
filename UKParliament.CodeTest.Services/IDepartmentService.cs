public interface IDepartmentService
{
    Task<IEnumerable<Department>> GetDepartments();
}
