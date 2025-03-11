using MediatR;
using Microsoft.AspNetCore.Mvc;
using UKParliament.CodeTest.Web.Mediator.CreatePerson;
using UKParliament.CodeTest.Web.Mediator.DeletePerson;
using UKParliament.CodeTest.Web.Mediator.GetDepartments;
using UKParliament.CodeTest.Web.Mediator.GetPeople;
using UKParliament.CodeTest.Web.Mediator.GetPerson;
using UKParliament.CodeTest.Web.Mediator.UpdatePerson;
using UKParliament.CodeTest.Web.ViewModels;

namespace UKParliament.CodeTest.Web.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PersonController : ControllerBase
{
    private readonly IMediator _mediator;
    private readonly ILogger<PersonController> _logger;
    public PersonController(IMediator mediator, ILogger<PersonController> logger)
    {
        _mediator = mediator;
        _logger = logger;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<PersonViewModel>>> Get()
    {
        try
        {
            var request = new GetPeopleRequest();
            var response = await _mediator.Send(request);
            return Ok(response.People);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while getting people.");
            return StatusCode(500, "An error occurred while getting people.");
        }
    }

    [Route("{id:int}")]
    [HttpGet]
    public async Task<ActionResult<PersonViewModel>> GetById(int id)
    {
        try
        {
            var request = new GetPersonRequest { Id = id };
            var response = await _mediator.Send(request);
            if (response.HasErrors())
            {
                return BadRequest(response.ValidationMessage!.Errors);
            }

            if (response.Person == null)
            {
                return NotFound();
            }

            return Ok(response.Person);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"An error occurred while getting the person with ID {id}.");
            return StatusCode(500, $"An error occurred while getting the person with ID {id}.");
        }
    }

    [HttpPost]
    public async Task<ActionResult> Create([FromBody] PersonViewModel personViewModel)
    {
        try
        {
            var command = new CreatePersonCommand { NewPerson = personViewModel };
            var response = await _mediator.Send(command);
            if (response.HasErrors())
            {
                return BadRequest(response.ValidationMessage!.Errors);
            }
            personViewModel.Id = response.Id!.Value;
            return CreatedAtAction(nameof(GetById), new { id = personViewModel.Id }, personViewModel);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while creating a new person.");
            return StatusCode(500, "An error occurred while creating a new person.");
        }
    }

    [HttpPut]
    public async Task<ActionResult> Update([FromBody] PersonViewModel personViewModel)
    {
        try
        {
            var command = new UpdatePersonCommand { UpdatedPerson = personViewModel };
            var response = await _mediator.Send(command);

            if (response.HasErrors())
            {
                return BadRequest(response.ValidationMessage!.Errors);
            }

            return Ok();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while updating the person.");
            return StatusCode(500, "An error occurred while updating the person.");
        }
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult> Delete(int id)
    {
        try
        {
            var command = new DeletePersonCommand { Id = id };
            var response = await _mediator.Send(command);

            if (response.HasErrors())
            {
                return BadRequest(response.ValidationMessage!.Errors);
            }

            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"An error occurred while deleting the person with ID {id}.");
            return StatusCode(500, $"An error occurred while deleting the person with ID {id}.");
        }
    }
}