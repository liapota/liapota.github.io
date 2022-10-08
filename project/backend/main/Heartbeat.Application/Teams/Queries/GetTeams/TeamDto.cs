using AutoMapper;
using Heartbeat.Application.Common.Mappings;
using Heartbeat.Application.DtoModels;
using Heartbeat.Domain;
using Newtonsoft.Json;

namespace Heartbeat.Application.Teams.Queries.GetTeams;

public class TeamDto : IMapWith<Team>, IMapWith<IEnumerable<Crewman>>
{
    [JsonProperty("team_id")] public int TeamId { get; set; }
    [JsonProperty("title")] public string Title { get; set; }
    [JsonProperty("members")] public IEnumerable<Crewman> Members { get; set; }

    public void Mapping(Profile profile)
    {
        profile.CreateMap<Team, TeamDto>()
            .ForMember(teamDto => teamDto.TeamId,
                opt => opt.MapFrom(team => team.Id))
            .ForMember(teamDto => teamDto.Title,
                opt => opt.MapFrom(team => team.Title));

        profile.CreateMap<IEnumerable<Crewman>, TeamDto>()
            .ForMember(teamDto => teamDto.Members,
                opt => opt.MapFrom(crewmen => crewmen));
    }
}