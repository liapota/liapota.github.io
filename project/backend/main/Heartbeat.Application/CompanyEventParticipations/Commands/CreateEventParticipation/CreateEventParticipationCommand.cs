using Heartbeat.Application.Common.Behaviors;
using MediatR;
using Newtonsoft.Json;

namespace Heartbeat.Application.CompanyEventParticipations.Commands.CreateEventParticipation;

public class CreateEventParticipationCommand : IRequest<OperationResult>
{
    [JsonIgnore] public int UserId { get; set; }
    [JsonProperty("event_id")] public int CompanyEventId { get; set; }
}