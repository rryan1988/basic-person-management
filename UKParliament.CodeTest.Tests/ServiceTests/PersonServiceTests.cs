using AutoFixture.Xunit2;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Moq;
using System.Linq.Expressions;
using UKParliament.CodeTest.Data;
using UKParliament.CodeTest.Services;
using Xunit;

namespace UKParliament.CodeTest.Tests.Services
{
    public class PersonServiceTests
    {
        [Theory]
        [AutoData]
        public async Task GetPeople_ReturnsListOfPeople(
            [Frozen] Mock<PersonManagerContext> context,
            List<Person> people,
            PersonService service)
        {
            // Arrange
            context.Setup(c => c.People.ToListAsync(It.IsAny<CancellationToken>()))
                   .ReturnsAsync(people);

            // Act
            var result = await service.GetPeople();

            // Assert
            Assert.Equal(people.Count, result.Count());
        }

        [Theory]
        [AutoData]
        public async Task GetPerson_ReturnsPerson_WhenFound(
            [Frozen] Mock<PersonManagerContext> context,
            Person person,
            PersonService service)
        {
            // Arrange
            context.Setup(c => c.People.FirstOrDefaultAsync(It.IsAny<Expression<Func<Person, bool>>>(), It.IsAny<CancellationToken>()))
                   .ReturnsAsync(person);

            // Act
            var result = await service.GetPerson(person.Id);

            // Assert
            Assert.Equal(person.Id, result.Id);
        }

        [Theory]
        [AutoData]
        public async Task UpdatePerson_UpdatesPerson(
            [Frozen] Mock<PersonManagerContext> context,
            Person person,
            PersonService service)
        {
            // Arrange
            context.Setup(c => c.People.Update(person));
            context.Setup(c => c.SaveChangesAsync(It.IsAny<CancellationToken>()))
                   .ReturnsAsync(1);

            // Act
            await service.UpdatePerson(person);

            // Assert
            context.Verify(c => c.People.Update(person), Times.Once);
            context.Verify(c => c.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Once);
        }

        [Theory]
        [AutoData]
        public async Task DeletePerson_RemovesPerson(
            [Frozen] Mock<PersonManagerContext> context,
            Person person,
            PersonService service)
        {
            // Arrange
            context.Setup(c => c.People.Remove(person));
            context.Setup(c => c.SaveChangesAsync(It.IsAny<CancellationToken>()))
                   .ReturnsAsync(1);

            // Act
            await service.DeletePerson(person.Id);

            // Assert
            context.Verify(c => c.People.Remove(person), Times.Once);
            context.Verify(c => c.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Once);
        }
    }
}