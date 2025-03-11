using MediatR;

namespace UKParliament.CodeTest.Web.Mediator.DeletePerson
{
    public class DeletePersonCommand : IRequest<DeletePersonResponse>
    {
        public int Id { get; set; }
    }
}
