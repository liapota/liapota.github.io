using Heartbeat.Application.CompanyBonuses.Queries.GetCompanyBonuses;
using Microsoft.AspNetCore.Mvc;

namespace Heartbeat.WebAPI.Controllers;

[Produces("application/json")]
public class BonusController : BaseController
{
    private readonly ILogger<BonusController> _logger;

    public BonusController(ILogger<BonusController> logger)
    {
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    [HttpGet]
    public async Task<IActionResult> GetBonuses()
    {
        var query = new GetCompanyBonusesQuery();
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