using AutoMapper;
using Heartbeat.Application.Common.Behaviors;
using Heartbeat.Application.Interfaces.DbContexts.Entities.Relations;
using Heartbeat.Domain.Relations;
using MediatR;

namespace Heartbeat.Application.CompanyEventParticipations.Commands.CreateEventParticipation;

public class CreateEventParticipationCommandHandler : IRequestHandler<CreateEventParticipationCommand, OperationResult>
{
    private readonly IEventParticipationDbContext _eventParticipationDbContext;
    private readonly IMapper _mapper;

    public CreateEventParticipationCommandHandler(IEventParticipationDbContext eventParticipationDbContext,
        IMapper mapper)
    {
        _eventParticipationDbContext = eventParticipationDbContext ??
                                       throw new ArgumentNullException(nameof(eventParticipationDbContext));
        _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
    }

    public async Task<OperationResult> Handle(CreateEventParticipationCommand request, CancellationToken cancellationToken)
    {
        var newParticipation = new CompanyEventParticipation
        {
            UserId = request.UserId,
            CompanyEventId = request.CompanyEventId,
            IsConfirmed = false
        };

        await _eventParticipationDbContext.EventParticipations.AddAsync(newParticipation);
        await _eventParticipationDbContext.SaveChangesAsync(cancellationToken);
        return OperationResult.SuccessResult();
    }
}