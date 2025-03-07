using FluentValidation;

namespace UKParliament.CodeTest.Web.Mediator.GetPerson
{
    public class GetPersonRequestValidator : AbstractValidator<GetPersonRequest>
    {
        public GetPersonRequestValidator()
        {
            RuleFor(x => x.Id).GreaterThan(0).WithMessage(x => "User Id must be a valid value greater than 0: {x.Id}");
        }
    }
}
