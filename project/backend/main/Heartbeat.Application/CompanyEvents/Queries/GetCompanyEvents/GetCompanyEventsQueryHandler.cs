using AutoMapper;
using Heartbeat.Application.Common.Behaviors;
using Heartbeat.Application.Interfaces.DbContexts.Entities;
using Heartbeat.Application.Interfaces.DbContexts.Entities.Relations;
using Heartbeat.Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Heartbeat.Application.CompanyEvents.Queries.GetCompanyEvents;

public class GetCompanyEventsQueryHandler : IRequestHandler<GetCompanyEventsQuery, OperationResult<IEnumerable<CompanyEventDto>>>
{
    private readonly ICompanyEventsDbContext _eventsDbContext;
    private readonly IEventParticipationDbContext _eventParticipationDbContext;
    private readonly IMapper _mapper;

    public GetCompanyEventsQueryHandler(ICompanyEventsDbContext eventsDbContext,
        IEventParticipationDbContext eventParticipationDbContext, IMapper mapper)
    {
        _eventsDbContext = eventsDbContext ?? throw new ArgumentNullException(nameof(eventsDbContext));
        _eventParticipationDbContext = eventParticipationDbContext ??
                                       throw new ArgumentNullException(nameof(eventParticipationDbContext));
        _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
    }

    public async Task<OperationResult<IEnumerable<CompanyEventDto>>> Handle(GetCompanyEventsQuery request, CancellationToken cancellationToken)
    {
        var events = await _eventsDbContext.CompanyEvents.ToArrayAsync();
        var dtos = events.Select(x => _mapper.Map<CompanyEvent, CompanyEventDto>(x));

        var partEvents = await _eventParticipationDbContext.EventParticipations.Where(x => x.UserId == request.UserId).ToArrayAsync();
        var partIdEvents = partEvents.Select(x => x.CompanyEventId);

        foreach (var dto in dtos)
            if (partIdEvents.Contains(dto.Id))
                dto.IsMember = true;
        
        return OperationResult<IEnumerable<CompanyEventDto>>.SuccessResult(dtos);
    }
}