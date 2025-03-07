using MediatR;
using Microsoft.AspNetCore.Mvc;
using UKParliament.CodeTest.Web.Mediator.GetPeople;
using UKParliament.CodeTest.Web.Mediator.GetPeopleByDepartment;
using UKParliament.CodeTest.Web.Mediator.GetPerson;
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

    [Route("department/{department:string}")]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<PersonViewModel>>> GetByDepartment(string department)
    {
        var request = new GetPeopleByDepartmentRequest { Department = department };
        var response = await _mediator.Send(request);
        if (response.HasErrors())
        {
            return BadRequest(response.ValidationMessage!.Errors);
        }

        return Ok(response.People);
    }
}