using AutoMapper;
using Heartbeat.Application.Common.Mappings;
using Heartbeat.Domain;
using Newtonsoft.Json;

namespace Heartbeat.Application.DtoModels;

public class Crewman : IMapWith<User>
{
    [JsonProperty("user_id")] public int UserId { get; set; }
    [JsonProperty("name")] public string Name { get; set; }
    [JsonProperty("surname")] public string Surname { get; set; }

    public void Mapping(Profile profile)
    {
        profile.CreateMap<User, Crewman>()
            .ForMember(crewman => crewman.UserId,
                opt => opt.MapFrom(user => user.Id))
            .ForMember(crewman => crewman.Name,
                opt => opt.MapFrom(user => user.Name))
            .ForMember(crewman => crewman.Surname,
                opt => opt.MapFrom(user => user.Surname));
    }
}