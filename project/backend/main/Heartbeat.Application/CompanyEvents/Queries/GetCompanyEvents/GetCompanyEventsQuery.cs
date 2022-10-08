using Heartbeat.Application.Common.Behaviors;
using Heartbeat.Domain;
using MediatR;

namespace Heartbeat.Application.CompanyEvents.Queries.GetCompanyEvents;

public class GetCompanyEventsQuery : IRequest<OperationResult<IEnumerable<CompanyEventDto>>>
{
    public int UserId { get; set; }
}