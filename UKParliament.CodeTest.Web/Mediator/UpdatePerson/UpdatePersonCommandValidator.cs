using FluentValidation;
using System.Security.Cryptography.X509Certificates;
using UKParliament.CodeTest.Web.Constants;

namespace UKParliament.CodeTest.Web.Mediator.UpdatePerson
{
    public class UpdatePersonCommandValidator : AbstractValidator<UpdatePersonCommand>
    {
        public UpdatePersonCommandValidator()
        {
            RuleFor(x => x.UpdatedPerson).NotNull().WithMessage(ValidationConstants.PersonNull);
            RuleFor(x => x.UpdatedPerson.Id).NotNull().WithMessage(ValidationConstants.IdNull);
            RuleFor(x => x.UpdatedPerson.Id).GreaterThan(0).WithMessage(ValidationConstants.InvalidId);
            RuleFor(x => x.UpdatedPerson.FirstName).NotEmpty().WithMessage(ValidationConstants.FirstNameNull);
            RuleFor(x => x.UpdatedPerson.FirstName).MaximumLength(50).WithMessage(string.Format(ValidationConstants.MaxLength, 50, "First Name"));
            RuleFor(x => x.UpdatedPerson.LastName).NotEmpty().WithMessage(ValidationConstants.LastNameNull);
            RuleFor(x => x.UpdatedPerson.LastName).MaximumLength(50).WithMessage(string.Format(ValidationConstants.MaxLength, 50, "Last Name"));
            RuleFor(x => x.UpdatedPerson.Email).NotEmpty().WithMessage(ValidationConstants.EmailNull);
            RuleFor(x => x.UpdatedPerson.Email).Matches(@"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$").WithMessage(ValidationConstants.InvalidEmail);
            RuleFor(x => x.UpdatedPerson.Department).NotEmpty().WithMessage(ValidationConstants.InvalidDepartment);
        }
    }
}
