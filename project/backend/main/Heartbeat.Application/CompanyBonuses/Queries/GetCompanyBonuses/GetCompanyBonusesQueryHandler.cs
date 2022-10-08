using AutoMapper;
using Heartbeat.Application.Common.Behaviors;
using Heartbeat.Application.Interfaces.DbContexts.Entities;
using Heartbeat.Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Heartbeat.Application.CompanyBonuses.Queries.GetCompanyBonuses;

public class GetCompanyBonusesQueryHandler : IRequestHandler<GetCompanyBonusesQuery, OperationResult<IEnumerable<CompanyBonusDto>>>
{
    private readonly ICompanyBonusDbContext _bonusDbContext;
    private readonly IMapper _mapper;

    public GetCompanyBonusesQueryHandler(ICompanyBonusDbContext bonusDbContext, IMapper mapper)
    {
        _bonusDbContext = bonusDbContext ?? throw new ArgumentNullException(nameof(bonusDbContext));
        _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
    }

    public async Task<OperationResult<IEnumerable<CompanyBonusDto>>> Handle(GetCompanyBonusesQuery request, CancellationToken cancellationToken)
    {
        var bonusDtos = new List<CompanyBonusDto>();
        var bonuses = await _bonusDbContext.CompanyEvents.ToArrayAsync();
        foreach (var bonus in bonuses)
        {
            var bonusDto = _mapper.Map<CompanyBonus, CompanyBonusDto>(bonus);
            bonusDtos.Add(bonusDto);
        }
        return OperationResult<IEnumerable<CompanyBonusDto>>.SuccessResult(bonusDtos);
    }
}