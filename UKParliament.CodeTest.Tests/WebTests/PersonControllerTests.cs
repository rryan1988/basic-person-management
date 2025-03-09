using AutoFixture.Xunit2;
using FluentValidation.Results;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using UKParliament.CodeTest.Data;
using UKParliament.CodeTest.Services;
using UKParliament.CodeTest.Web.Controllers;
using UKParliament.CodeTest.Web.Mediator.CreatePerson;
using UKParliament.CodeTest.Web.Mediator.GetPeople;
using UKParliament.CodeTest.Web.Mediator.GetPerson;
using UKParliament.CodeTest.Web.Mediator.UpdatePerson;
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
            int id,
            PersonController controller)
        {
            // Arrange
            person.Id = id;
            mediator.Setup(m => m.Send(It.IsAny<GetPersonRequest>(), It.IsAny<CancellationToken>()))
                    .ReturnsAsync(new GetPersonResponse { Person = person });

            // Act
            var result = await controller.GetById((int)person.Id);

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
        public async Task Create_ReturnsCreatedResult_WithNewPerson(
            [Frozen] Mock<IMediator> mediator,
            PersonViewModel personViewModel,
            PersonController controller)
        {
            // Arrange
            mediator.Setup(m => m.Send(It.IsAny<CreatePersonCommand>(), It.IsAny<CancellationToken>()))
                    .ReturnsAsync(new CreatePersonResponse { Id = personViewModel.Id });

            // Act
            var result = await controller.Create(personViewModel);

            // Assert
            var createdResult = Assert.IsType<CreatedAtActionResult>(result);
            Assert.Equal(nameof(controller.GetById), createdResult.ActionName);
            Assert.Equal(personViewModel.Id, createdResult.RouteValues!["id"]);
        }

        [Theory]
        [AutoData]
        public async Task Update_ReturnsNoContentResult_WhenPersonUpdated(
            [Frozen] Mock<IMediator> mediator,
            PersonViewModel personViewModel,
            PersonController controller)
        {
            // Arrange
            mediator.Setup(m => m.Send(It.IsAny<UpdatePersonCommand>(), It.IsAny<CancellationToken>()))
                    .ReturnsAsync(new UpdatePersonResponse());

            // Act
            var result = await controller.Update(personViewModel);

            // Assert
            Assert.IsType<NoContentResult>(result);
        }

        [Theory]
        [AutoData]
        public async Task Update_ReturnsNotFoundResult_WhenPersonNotFound(
            [Frozen] Mock<IMediator> mediator,
            PersonViewModel personViewModel,
            PersonController controller)
        {
            // Arrange
            mediator.Setup(m => m.Send(It.IsAny<UpdatePersonCommand>(), It.IsAny<CancellationToken>()))
                    .ReturnsAsync(new UpdatePersonResponse
                    {
                        ValidationMessage = new ValidationResult(new List<ValidationFailure>
                        {
                            new ValidationFailure("Id", "Person not found")
                        })
                    });

            // Act
            var result = await controller.Update(personViewModel);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

    }

    }

