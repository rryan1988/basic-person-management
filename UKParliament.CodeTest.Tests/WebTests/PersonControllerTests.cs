using AutoFixture.Xunit2;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using UKParliament.CodeTest.Data;
using UKParliament.CodeTest.Services;
using UKParliament.CodeTest.Web.Controllers;
using UKParliament.CodeTest.Web.Mediator.GetPeople;
using UKParliament.CodeTest.Web.Mediator.GetPeopleByDepartment;
using UKParliament.CodeTest.Web.Mediator.GetPerson;
using UKParliament.CodeTest.Web.ViewModels;
using Xunit;

namespace UKParliament.CodeTest.Web.Tests.Controllers
{
    public class PersonControllerTests
    {
        [Theory]
        [AutoData]
        public async Task Get_ReturnsOkResult_WithListOfPeople(
            [Frozen] Mock<IMediator> mediator,
            List<PersonViewModel> people,
            PersonController controller)
        {
            // Arrange
            mediator.Setup(m => m.Send(It.IsAny<GetPeopleRequest>(), It.IsAny<CancellationToken>()))
                    .ReturnsAsync(new GetPeopleResponse { People = people });

            // Act
            var result = await controller.Get();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var returnValue = Assert.IsType<List<PersonViewModel>>(okResult.Value);
            Assert.Equal(people.Count, returnValue.Count);
        }

        [Theory]
        [AutoData]
        public async Task GetById_ReturnsOkResult_WithPerson(
            [Frozen] Mock<IMediator> mediator,
            PersonViewModel person,
            PersonController controller)
        {
            // Arrange
            mediator.Setup(m => m.Send(It.IsAny<GetPersonRequest>(), It.IsAny<CancellationToken>()))
                    .ReturnsAsync(new GetPersonResponse { Person = person });

            // Act
            var result = await controller.GetById(person.Id);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var returnValue = Assert.IsType<PersonViewModel>(okResult.Value);
            Assert.Equal(person.Id, returnValue.Id);
        }

        [Theory]
        [AutoData]
        public async Task GetById_ReturnsNotFound_WhenPersonNotFound(
            [Frozen] Mock<IMediator> mediator,
            PersonController controller)
        {
            // Arrange
            mediator.Setup(m => m.Send(It.IsAny<GetPersonRequest>(), It.IsAny<CancellationToken>()))
                    .ReturnsAsync(new GetPersonResponse { Person = null });

            // Act
            var result = await controller.GetById(1);

            // Assert
            Assert.IsType<NotFoundResult>(result.Result);
        }

        [Theory]
        [AutoData]
        public async Task GetByDepartment_ReturnsOkResult_WithListOfPeople(
            [Frozen] Mock<IMediator> mediator,
            List<PersonViewModel> people,
            PersonController controller)
        {
            // Arrange
            mediator.Setup(m => m.Send(It.IsAny<GetPeopleByDepartmentRequest>(), It.IsAny<CancellationToken>()))
                    .ReturnsAsync(new GetPeopleByDepartmentResponse { People = people });

            // Act
            var result = await controller.GetByDepartment("IT");

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var returnValue = Assert.IsType<List<PersonViewModel>>(okResult.Value);
            Assert.Equal(people.Count, returnValue.Count);
        }

        [Theory]
        [AutoData]
        public async Task GetByDepartment_ReturnsNotFound_WhenNoPeopleFound(
            [Frozen] Mock<IMediator> mediator,
            PersonController controller)
        {
            // Arrange
            mediator.Setup(m => m.Send(It.IsAny<GetPeopleByDepartmentRequest>(), It.IsAny<CancellationToken>()))
                    .ReturnsAsync(new GetPeopleByDepartmentResponse { People = null });

            // Act
            var result = await controller.GetByDepartment("IT");

            // Assert
            Assert.IsType<NotFoundResult>(result.Result);
        }
    }



}

