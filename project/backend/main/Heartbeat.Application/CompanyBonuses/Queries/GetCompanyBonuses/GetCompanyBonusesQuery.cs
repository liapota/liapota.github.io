using Heartbeat.Application.Common.Behaviors;
using MediatR;

namespace Heartbeat.Application.CompanyBonuses.Queries.GetCompanyBonuses;

public class GetCompanyBonusesQuery : IRequest<OperationResult<IEnumerable<CompanyBonusDto>>>
{
    
}