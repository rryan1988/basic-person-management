using FluentValidation;
using UKParliament.CodeTest.Web.Constants;

namespace UKParliament.CodeTest.Web.Mediator.GetPeopleByDepartment
{
    public class GetPeopleByDepartmentRequestValidator : AbstractValidator<GetPeopleByDepartmentRequest>
    {
        public GetPeopleByDepartmentRequestValidator()
        {
            RuleFor(x => x.Department).NotEmpty().WithMessage(ValidationConstants.InvalidDepartment);
            RuleFor(x => x.Department).NotNull().WithMessage(ValidationConstants.DepartmentNull);
        }
    }
}
