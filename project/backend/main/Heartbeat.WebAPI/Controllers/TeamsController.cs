using Heartbeat.Application.Teams.Queries.GetTeams;
using Microsoft.AspNetCore.Mvc;

namespace Heartbeat.WebAPI.Controllers;

[Produces("application/json")]
public class TeamsController : BaseController
{
    private readonly ILogger<TeamsController> _logger;

    public TeamsController(ILogger<TeamsController> logger)
    {
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    [HttpGet]
    public async Task<IActionResult> GetTeams()
    {
        var query = new GetTeamsQuery
        {
            UserId = Convert.ToInt32(HttpContext.User.Identity.Name)
        };
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
}