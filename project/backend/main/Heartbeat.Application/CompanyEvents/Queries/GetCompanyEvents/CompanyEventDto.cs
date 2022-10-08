using AutoMapper;
using Heartbeat.Application.Common.Mappings;
using Heartbeat.Domain;
using Newtonsoft.Json;

namespace Heartbeat.Application.CompanyEvents.Queries.GetCompanyEvents;

public class CompanyEventDto : IMapWith<CompanyEvent>
{
    [JsonProperty("id")] public int Id { get; set; }
    [JsonProperty("creator_id")] public int CreatorId { get; set; }
    [JsonProperty("title")] public string Title { get; set; }
    [JsonProperty("description")] public string Description { get; set; }
    [JsonProperty("start")] public DateTime StartTime { get; set; }
    [JsonProperty("duration")] public TimeSpan Duration { get; set; }
    [JsonProperty("reward")] public int Reward { get; set; }
    [JsonProperty("is_member")] public bool IsMember { get; set; }

    public void Mapping(Profile profile)
    {
        profile.CreateMap<CompanyEvent, CompanyEventDto>()
            .ForMember(dto => dto.Id,
                opt => opt.MapFrom(x => x.Id))
            .ForMember(dto => dto.CreatorId,
                opt => opt.MapFrom(x => x.CreatorId))
            .ForMember(dto => dto.Title,
                opt => opt.MapFrom(x => x.Title))
            .ForMember(dto => dto.Description,
                opt => opt.MapFrom(x => x.Description))
            .ForMember(dto => dto.StartTime,
                opt => opt.MapFrom(x => x.StartTime.ToLocalTime()))
            .ForMember(dto => dto.Duration,
                opt => opt.MapFrom(x => x.Duration))
            .ForMember(dto => dto.Reward,
                opt => opt.MapFrom(x => x.Reward));
    }
}