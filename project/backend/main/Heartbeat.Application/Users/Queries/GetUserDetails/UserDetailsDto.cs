using AutoMapper;
using Heartbeat.Application.Common.Mappings;
using Heartbeat.Application.DtoModels;
using Heartbeat.Domain;
using Newtonsoft.Json;

namespace Heartbeat.Application.Users.Queries.GetUserDetails;

public class UserDetailsDto : IMapWith<User>
{
    [JsonProperty("id")] public int Id { get; set; }
    [JsonProperty("role")] public UserRole UserRole { get; set; }
    [JsonProperty("name")] public string Name { get; set; }
    [JsonProperty("surname")] public string Surname { get; set; }
    [JsonProperty("participation_teams")] public IEnumerable<ParticipationTeam> ParticipationTeams { get; set; }
    [JsonProperty("teammates")] public IEnumerable<Crewman> Teammates { get; set; }
    [JsonIgnore] public string Cookie { get; set; }

    public void Mapping(Profile profile)
    {
        profile.CreateMap<User, UserDetailsDto>()
            .ForMember(dto => dto.Id,
                opt => opt.MapFrom(user => user.Id))
            .ForMember(dto => dto.UserRole,
                opt => opt.MapFrom(user => user.Role))
            .ForMember(dto => dto.Name,
                opt => opt.MapFrom(user => user.Name))
            .ForMember(dto => dto.Surname,
                opt => opt.MapFrom(user => user.Surname))
            .ForMember(dto => dto.Cookie,
                opt => opt.MapFrom(x => x.Cookie));

        profile.CreateMap<IEnumerable<ParticipationTeam>, UserDetailsDto>()
            .ForMember(dto => dto.ParticipationTeams,
                opt => opt.MapFrom(teams => teams));

        profile.CreateMap<IEnumerable<Crewman>, UserDetailsDto>()
            .ForMember(dto => dto.Teammates,
                opt => opt.MapFrom(crewmen => crewmen));
    }
}