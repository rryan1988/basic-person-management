using FluentValidation;
using UKParliament.CodeTest.Web.Constants;

namespace UKParliament.CodeTest.Web.Mediator.CreatePerson
{
    public class CreatePersonCommandValidator : AbstractValidator<CreatePersonCommand>
    {
        public CreatePersonCommandValidator()
        {
            RuleFor(x => x.NewPerson).NotNull().WithMessage(ValidationConstants.PersonNull);
            RuleFor(x => x.NewPerson.FirstName).NotEmpty().WithMessage(ValidationConstants.FirstNameNull);
            RuleFor(x => x.NewPerson.FirstName).MaximumLength(50).WithMessage(string.Format(ValidationConstants.MaxLength, 50, "First Name"));
            RuleFor(x => x.NewPerson.LastName).NotEmpty().WithMessage(ValidationConstants.LastNameNull);
            RuleFor(x => x.NewPerson.LastName).MaximumLength(50).WithMessage(string.Format(ValidationConstants.MaxLength, 50, "Last Name"));
            RuleFor(x => x.NewPerson.Email).NotEmpty().WithMessage(ValidationConstants.EmailNull);
            RuleFor(x => x.NewPerson.Email).Matches(@"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$").WithMessage(ValidationConstants.InvalidEmail);
            RuleFor(x => x.NewPerson.Department).NotEmpty().WithMessage(ValidationConstants.InvalidDepartment);
        }
    }
}
