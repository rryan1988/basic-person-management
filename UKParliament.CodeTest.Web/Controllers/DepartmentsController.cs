using MediatR;
using Microsoft.AspNetCore.Mvc;
using UKParliament.CodeTest.Web.Mediator.GetDepartments;
using UKParliament.CodeTest.Web.ViewModels;

namespace UKParliament.CodeTest.Web.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DepartmentsController : ControllerBase
{
    private readonly IMediator _mediator;
    private readonly ILogger<PersonController> _logger;
    public DepartmentsController(IMediator mediator, ILogger<PersonController> logger)
    {
        _mediator = mediator;
        _logger = logger;
    }

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