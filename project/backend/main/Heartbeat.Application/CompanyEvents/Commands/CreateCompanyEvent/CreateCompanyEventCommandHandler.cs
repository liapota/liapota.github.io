using AutoMapper;
using Heartbeat.Application.Common.Behaviors;
using Heartbeat.Application.Interfaces.DbContexts.Entities;
using Heartbeat.Domain;
using MediatR;

namespace Heartbeat.Application.CompanyEvents.Commands.CreateCompanyEvent;

public class CreateCompanyEventCommandHandler : IRequestHandler<CreateCompanyEventCommand, OperationResult>
{
    private readonly ICompanyEventsDbContext _eventsDbContext;
    private readonly IMapper _mapper;

    public CreateCompanyEventCommandHandler(ICompanyEventsDbContext eventsDbContext, IMapper mapper)
    {
        _eventsDbContext = eventsDbContext ?? throw new ArgumentNullException(nameof(eventsDbContext));
        _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
    }

    public async Task<OperationResult> Handle(CreateCompanyEventCommand request, CancellationToken cancellationToken)
    {
        var newEvent = new CompanyEvent
        {
            CreatorId = request.CreatorId,
            Title = request.Title,
            Description = request.Description,
            StartTime = request.StartTime,
            Duration = request.Duration,
            Reward = request.Reward
        };

        await _eventsDbContext.CompanyEvents.AddAsync(newEvent);
        await _eventsDbContext.SaveChangesAsync(cancellationToken);
        return OperationResult.SuccessResult();
    }
}