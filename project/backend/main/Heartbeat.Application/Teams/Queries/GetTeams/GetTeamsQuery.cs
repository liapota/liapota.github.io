using Heartbeat.Application.Common.Behaviors;
using Heartbeat.Application.DtoModels;
using MediatR;

namespace Heartbeat.Application.Teams.Queries.GetTeams;

public class GetTeamsQuery : IRequest<OperationResult<IEnumerable<TeamDto>>>
{
    public int UserId { get; set; }
}