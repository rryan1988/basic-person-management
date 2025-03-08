using AutoFixture.Xunit2;
using Microsoft.Extensions.Logging;
using Moq;
using UKParliament.CodeTest.Data;
using UKParliament.CodeTest.Services;
using UKParliament.CodeTest.Web.Mediator.GetPeopleByDepartment;
using Xunit;

namespace UKParliament.CodeTest.Tests.WebTests
{
    public class GetPeopleByDepartmentRequestHandlerTests
    {
        [Theory]
        [AutoData]
        public async Task Handle_ReturnsPeople_GivenValidDepartment(
            [Frozen] Mock<IPersonService> personService,
            List<Person> people,
            GetPeopleByDepartmentRequestHandler handler)
        {
            // Arrange
            personService.Setup(s => s.GetPeopleByDepartment(It.IsAny<string>())).ReturnsAsync(people);

            // Act
            var result = await handler.Handle(new GetPeopleByDepartmentRequest { Department = "IT" }, CancellationToken.None);

            // Assert
            Assert.NotNull(result.People);
            Assert.Equal(people.Count, result.People.Count());
        }

        [Theory]
        [AutoData]
        public async Task Handle_LogsError_WhenExceptionThrown(
            [Frozen] Mock<IPersonService> personService,
            [Frozen] Mock<ILogger<GetPeopleByDepartmentRequestHandler>> logger,
            GetPeopleByDepartmentRequestHandler handler)
        {
            // Arrange
            var exception = new Exception("Test exception");
            personService.Setup(s => s.GetPeopleByDepartment(It.IsAny<string>())).ThrowsAsync(exception);

            // Act & Assert
            await Assert.ThrowsAsync<Exception>(() => handler.Handle(new GetPeopleByDepartmentRequest { Department = "IT" }, CancellationToken.None));
            logger.Verify(
                x => x.LogError(
                    It.IsAny<EventId>(),
                    It.Is<Exception>(x => x == exception),
                    It.Is<string>(x => x == "An error occurred while getting people by department.")),
                Times.Once);
        }
    }
}
