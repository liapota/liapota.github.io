using AutoMapper;
using Heartbeat.Application.Common.Mappings;
using Heartbeat.Domain;
using Newtonsoft.Json;

namespace Heartbeat.Application.DtoModels;

public class ParticipationTeam : IMapWith<Team>, IMapWith<IEnumerable<Crewman>>
{
    [JsonProperty("team_id")] public int TeamId { get; set; }
    [JsonProperty("team_title")] public string TeamTitle { get; set; }
    [JsonProperty("teammates")] public IEnumerable<Crewman> Teammates { get; set; }

    public void Mapping(Profile profile)
    {
        profile.CreateMap<Team, ParticipationTeam>()
            .ForMember(partTeam => partTeam.TeamId,
                opt => opt.MapFrom(team => team.Id))
            .ForMember(partTeam => partTeam.TeamTitle,
                opt => opt.MapFrom(team => team.Title));

        profile.CreateMap<IEnumerable<Crewman>, ParticipationTeam>()
            .ForMember(partTeam => partTeam.Teammates,
                opt => opt.MapFrom(crewmen => crewmen));
    }
}