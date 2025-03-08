using FluentValidation;
using UKParliament.CodeTest.Web.Constants;

namespace UKParliament.CodeTest.Web.Mediator.GetPerson
{
    public class GetPersonRequestValidator : AbstractValidator<GetPersonRequest>
    {
        public GetPersonRequestValidator()
        {
            RuleFor(x => x.Id).GreaterThan(0).WithMessage(ValidationConstants.InvalidId);
        }
    }
}
