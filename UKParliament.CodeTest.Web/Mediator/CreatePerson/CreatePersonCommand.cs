using MediatR;
using UKParliament.CodeTest.Web.ViewModels;

namespace UKParliament.CodeTest.Web.Mediator.CreatePerson
{
    public class CreatePersonCommand : IRequest<CreatePersonResponse>
    {
        public PersonViewModel NewPerson { get; set; } = null!;
    }
}
