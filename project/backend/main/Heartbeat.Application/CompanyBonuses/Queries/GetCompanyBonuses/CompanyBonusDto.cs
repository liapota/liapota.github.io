using AutoMapper;
using Heartbeat.Application.Common.Mappings;
using Heartbeat.Domain;
using Newtonsoft.Json;

namespace Heartbeat.Application.CompanyBonuses.Queries.GetCompanyBonuses;

public class CompanyBonusDto : IMapWith<CompanyBonus>
{
    [JsonProperty("id")] public int Id { get; set; }
    [JsonProperty("title")] public string Title { get; set; }
    [JsonProperty("description")] public string Description { get; set; }

    public void Mapping(Profile profile)
    {
        profile.CreateMap<CompanyBonus, CompanyBonusDto>()
            .ForMember(dto => dto.Id,
                opt => opt.MapFrom(x => x.Id))
            .ForMember(dto => dto.Title,
                opt => opt.MapFrom(x => x.Title))
            .ForMember(dto => dto.Description,
                opt => opt.MapFrom(x => x.Description));
    }
}