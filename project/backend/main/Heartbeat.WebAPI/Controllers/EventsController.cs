using Heartbeat.Application.Common.Behaviors;
using Heartbeat.Application.CompanyEventParticipations.Commands.CreateEventParticipation;
using Heartbeat.Application.CompanyEvents.Commands.CloseCompanyEvent;
using Heartbeat.Application.CompanyEvents.Commands.CreateCompanyEvent;
using Heartbeat.Application.CompanyEvents.Queries.GetCompanyEvents;
using Microsoft.AspNetCore.Mvc;

namespace Heartbeat.WebAPI.Controllers;

[Produces("application/json")]
public class EventsController : BaseController
{
    private readonly ILogger<EventsController> _logger;

    public EventsController(ILogger<EventsController> logger)
    {
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    [HttpGet]
    public async Task<IActionResult> GetEventsAsync()
    {
        var query = new GetCompanyEventsQuery();
        var operation = await Mediator.Send(query);
        if (operation.IsException())
        {
            _logger.LogError(operation.Exception.StackTrace);
            var response = new
            {
                error = operation.Exception.Message
            };
            return StatusCode(StatusCodes.Status500InternalServerError, response);
        }

        return Ok(operation.Result);
    }

    [HttpPost]
    public async Task<IActionResult> CreateEventAsync([FromBody] CreateCompanyEventCommand command)
    {
        command.CreatorId = Convert.ToInt32(HttpContext.User.Identity.Name);
        var operation = await Mediator.Send(command);
        if (operation.IsException())
        {
            _logger.LogError(operation.Exception.StackTrace);
            var response = new
            {
                error = operation.Exception.Message
            };
            return StatusCode(StatusCodes.Status500InternalServerError, response);
        }

        return Ok();
    }

    [HttpPut("create")]
    public async Task<IActionResult> CreateParticipationEventAsync([FromBody] CreateEventParticipationCommand command)
    {
        command.UserId = Convert.ToInt32(HttpContext.User.Identity.Name);
        var operation = await Mediator.Send(command);
        if (operation.IsException())
        {
            _logger.LogError(operation.Exception.StackTrace);
            var response = new
            {
                error = operation.Exception.Message
            };
            return StatusCode(StatusCodes.Status500InternalServerError, response);
        }

        return Ok();
    }

    [HttpPut("close")]
    public async Task<IActionResult> CloseEventAsync([FromBody] CloseCompanyEventCommand command)
    {
        var operation = await Mediator.Send(command);
        if (operation.IsException())
        {
            _logger.LogError(operation.Exception.StackTrace);
            var response = new
            {
                error = operation.Exception.Message
            };
            return StatusCode(StatusCodes.Status500InternalServerError, response);
        }

        return Ok();
    }
}