using MediatR;
using UKParliament.CodeTest.Web.ViewModels;

namespace UKParliament.CodeTest.Web.Mediator.UpdatePerson
{
    public class UpdatePersonCommand : IRequest<UpdatePersonResponse>
    {
        public PersonViewModel UpdatedPerson { get; set; } = null!;
    }
}
