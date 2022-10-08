using Heartbeat.Application.Common.Behaviors;
using MediatR;
using Newtonsoft.Json;

namespace Heartbeat.Application.CompanyEvents.Commands.CloseCompanyEvent;

public class CloseCompanyEventCommand : IRequest<OperationResult>
{
    [JsonProperty("event_id")] public int CompanyEventId { get; set; }
    [JsonProperty("reward")] public int Reward { get; set; }
}