using MediatR;
using Microsoft.AspNetCore.Mvc;
using UKParliament.CodeTest.Web.Mediator.CreatePerson;
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
    public async Task<ActionResult<PersonViewModel>> Get()
    {
        var request = new GetPeopleRequest();
        var response = await _mediator.Send(request);
        return Ok(response.People);
    }

    [Route("{id:int}")]
    [HttpGet]
    public async Task<ActionResult<PersonViewModel>> GetById(int id)
    {
        var request = new GetPersonRequest { Id = id };
        var response = await _mediator.Send(request);
        if(response.HasErrors())
        {
            return BadRequest(response.ValidationMessage!.Errors);
        }

        if (response.Person == null)
        {
            return NotFound();
        }

        return Ok(response.Person);
    }

    [HttpPost]
    public async Task<ActionResult> Create([FromBody] PersonViewModel personViewModel)
    {
        CreatePersonCommand command= new CreatePersonCommand { NewPerson = personViewModel };
        var response = await _mediator.Send(command);
        if (response.HasErrors())
        {
            return BadRequest(response.ValidationMessage!.Errors);
        }
        personViewModel.Id = response.Id!.Value;
        return CreatedAtAction(nameof(GetById), new { id = response.Id }, personViewModel);
    }

    [HttpPut]
    public async Task<ActionResult> Update([FromBody] PersonViewModel personViewModel)
    {
        UpdatePersonCommand command = new UpdatePersonCommand { UpdatedPerson = personViewModel };
        var response = await _mediator.Send(command);

        if (response.HasErrors())
        {
            return BadRequest(response.ValidationMessage!.Errors);
        }

        return NoContent();
    }

    [Route("departments")]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<DepartmentViewModel>>> GetDepartments()
    {
        try
        {
            var request = new GetDepartmentsRequest();
            var response = await _mediator.Send(request);
            return Ok(response.Departments);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while getting departments.");
            return StatusCode(500, "An error occurred while getting departments.");
        }
    }
}