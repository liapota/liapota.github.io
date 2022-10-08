using Heartbeat.Application.Common.Behaviors;
using MediatR;
using Newtonsoft.Json;

namespace Heartbeat.Application.CompanyEvents.Commands.CreateCompanyEvent;

public class CreateCompanyEventCommand : IRequest<OperationResult>
{
    [JsonProperty("creator_id")] public int CreatorId { get; set; }
    [JsonProperty("title")] public string Title { get; set; }
    [JsonProperty("description")] public string Description { get; set; }
    [JsonProperty("start")] public DateTime StartTime { get; set; }
    [JsonProperty("duration")] public TimeSpan Duration { get; set; }
    [JsonProperty("reward")] public int Reward { get; set; }
}