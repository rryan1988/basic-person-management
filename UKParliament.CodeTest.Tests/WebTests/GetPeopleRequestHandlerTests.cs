using AutoFixture.Xunit2;
using Microsoft.Extensions.Logging;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UKParliament.CodeTest.Data;
using UKParliament.CodeTest.Services;
using UKParliament.CodeTest.Web.Mediator.GetPeople;
using Xunit;

namespace UKParliament.CodeTest.Tests.WebTests
{
    public class GetPeopleRequestHandlerTests
    {
        [Theory]
        [AutoData]
        public async Task Handle_ReturnsPeople(
            [Frozen] Mock<IPersonService> personService,
            List<Person> people,
            GetPeopleRequestHandler handler)
        {
            // Arrange
            personService.Setup(s => s.GetPeople()).ReturnsAsync(people);

            // Act
            var result = await handler.Handle(new GetPeopleRequest(), CancellationToken.None);

            // Assert
            Assert.NotNull(result.People);
            Assert.Equal(people.Count, result.People.Count());
        }

        [Theory]
        [AutoData]
        public async Task Handle_LogsError_WhenExceptionThrown(
            [Frozen] Mock<IPersonService> personService,
            [Frozen] Mock<ILogger<GetPeopleRequestHandler>> logger,
            GetPeopleRequestHandler handler)
        {
            // Arrange
            var exception = new Exception("Test exception");
            personService.Setup(s => s.GetPeople()).ThrowsAsync(exception);

            // Act & Assert
            await Assert.ThrowsAsync<Exception>(() => handler.Handle(new GetPeopleRequest(), CancellationToken.None));
            logger.Verify(
                x => x.LogError(
                    It.IsAny<EventId>(),
                    It.Is<Exception>(x => x == exception),
                    It.Is<string>(x=> x == "An error occurred while getting people.")),
                Times.Once);
        }
    }
}
