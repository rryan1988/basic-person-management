using FluentValidation;

namespace UKParliament.CodeTest.Web.Mediator.GetPeopleByDepartment
{
    public class GetPeopleByDepartmentRequestValidator : AbstractValidator<GetPeopleByDepartmentRequest>
    {
        public GetPeopleByDepartmentRequestValidator()
        {
            RuleFor(x => x.Department).NotEmpty().WithMessage("Department name cannot be empty");
            RuleFor(x => x.Department).NotNull().WithMessage("Department name cannot be null");
        }
    }
}
