using AutoFixture.Xunit2;
using Microsoft.Extensions.Logging;
using Moq;
using UKParliament.CodeTest.Data;
using UKParliament.CodeTest.Services;
using UKParliament.CodeTest.Web.Mediator.GetPerson;
using UKParliament.CodeTest.Web.ViewModels;
using Xunit;

namespace UKParliament.CodeTest.Tests.WebTests
{
    public class GetPersonRequestHandlerTests
    {

        [Theory]
        [AutoData]
        public async Task Handle_ReturnsPerson_ValidIdGiven(
            [Frozen] Mock<IPersonService> personService,
            GetPersonRequest request,
            GetPersonRequestHandler handler,
            Person person)
        {
            // Arrange
            personService.Setup(s => s.GetPerson(It.Is<int>(x => x == request.Id))).Returns(Task.FromResult<Person?>(person));

            PersonViewModel personResult = new PersonViewModel
            {
                Id = person.Id,
                FirstName = person.FirstName,
                LastName = person.LastName,
                Email = person.Email,
                Department = person.Department
            };

            // Act & Assert
            var response = await handler.Handle(request, CancellationToken.None);
            Assert.NotNull(response);
            Assert.NotNull(response.Person);
            Assert.Equal(personResult.ToString(), response.Person.ToString());
        }

        [Theory]
        [AutoData]
        public async Task Handle_LogsInformation_WhenNoPersonFound(
            [Frozen] Mock<IPersonService> personService,
            [Frozen] Mock<ILogger<GetPersonRequestHandler>> logger,
            GetPersonRequestHandler handler)
        {
            // Arrange
            personService.Setup(s => s.GetPerson(It.IsAny<int>())).Returns(Task.FromResult<Person?>(null));
            
            // Act & Assert
            var response = await handler.Handle(new GetPersonRequest { Id = 1 }, CancellationToken.None);
            logger.Verify(
                x => x.LogInformation(
                    It.IsAny<EventId>(),
                    It.Is<string>(x => x == string.Format("Person with ID {PersonId} not found.", 1))),
                Times.Once);
            Assert.Null(response.Person);
        }

        [Theory]
        [AutoData]
        public async Task Handle_LogsError_WhenExceptionThrown(
            [Frozen] Mock<IPersonService> personService,
            [Frozen] Mock<ILogger<GetPersonRequestHandler>> logger,
            GetPersonRequestHandler handler)
        {
            // Arrange
            var exception = new Exception("Test exception");
            personService.Setup(s => s.GetPerson(It.IsAny<int>())).ThrowsAsync(exception);

            // Act & Assert
            await Assert.ThrowsAsync<Exception>(() => handler.Handle(new GetPersonRequest { Id = 1 }, CancellationToken.None));
            logger.Verify(
                x => x.LogError(
                    It.IsAny<EventId>(),
                    It.Is<Exception>(x => x == exception),
                    It.Is<string>(x => x == string.Format("An error occurred while getting person with ID {PersonId}.", 1))),
                Times.Once);
        }
    }
}
