using FluentValidation.Results;
using Microsoft.AspNetCore.Components.Forms;
using UKParliament.CodeTest.Web.ViewModels;

namespace UKParliament.CodeTest.Web.Mediator.GetPerson
{
    public class GetPersonResponse : BaseResponseWithValidation
    {
        public PersonViewModel? Person { get; set; }
    }
}
