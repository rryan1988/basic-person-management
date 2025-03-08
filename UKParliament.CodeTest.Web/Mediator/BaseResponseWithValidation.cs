using FluentValidation.Results;

namespace UKParliament.CodeTest.Web.Mediator
{
    public class BaseResponseWithValidation
    {
        public ValidationResult? ValidationMessage { get; set; }
        public bool HasErrors()
        {
            return ValidationMessage != null && ValidationMessage.Errors.Any();
        }
    }
}
