using UKParliament.CodeTest.Data;

public interface IDepartmentService
{
    Task<IEnumerable<Department>> GetDepartments();
}
