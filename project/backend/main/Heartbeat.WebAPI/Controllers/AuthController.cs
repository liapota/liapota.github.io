using Heartbeat.Application.Interfaces.DbContexts.Entities;
using Heartbeat.Application.Users.Queries.GetUserDetails;
using Microsoft.AspNetCore.Mvc;

namespace Heartbeat.WebAPI.Controllers;


[Produces("application/json")]
public class AuthController : BaseController
{
    private readonly ILogger<AuthController> _logger;
    private readonly IUsersDbContext _usersDbContext;
    
    public AuthController(ILogger<AuthController> logger, IUsersDbContext usersDbContext)
    {
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        _usersDbContext = usersDbContext ?? throw new ArgumentNullException(nameof(usersDbContext));
    }

    [HttpGet]
    public async Task<IActionResult> GetAuthCookieAndUserInfo([FromQuery] int id)
    {
        var query = new GetUserDetailsQuery
        {
            UserId = id
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

        HttpContext.Response.Cookies.Append("user", operation.Result.Cookie);
        return Ok(operation.Result);
    }
}