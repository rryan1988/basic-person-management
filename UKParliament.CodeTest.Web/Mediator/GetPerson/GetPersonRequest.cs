using MediatR;

namespace UKParliament.CodeTest.Web.Mediator.GetPerson
{
    public class GetPersonRequest : IRequest<GetPersonResponse>
    {
        public int Id { get; set; }
    }
}
