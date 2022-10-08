using Heartbeat.Application.Common.Behaviors;
using Heartbeat.Application.Interfaces.DbContexts.Entities;
using Heartbeat.Application.Interfaces.DbContexts.Entities.Relations;
using Heartbeat.Application.Interfaces.MoneyHelper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Heartbeat.Application.CompanyEvents.Commands.CloseCompanyEvent;

public class CloseCompanyEventCommandHandler : IRequestHandler<CloseCompanyEventCommand, OperationResult>
{
    private readonly IMoneyHelper _moneyHelper;
    private readonly IEventParticipationDbContext _eventParticipationDbContext;
    private readonly IUsersDbContext _usersDbContext;

    public CloseCompanyEventCommandHandler(IMoneyHelper moneyHelper,
        IEventParticipationDbContext eventParticipationDbContext, IUsersDbContext usersDbContext)
    {
        _moneyHelper = moneyHelper ?? throw new ArgumentNullException(nameof(moneyHelper));
        _eventParticipationDbContext = eventParticipationDbContext ??
                                       throw new ArgumentNullException(nameof(eventParticipationDbContext));
        _usersDbContext = usersDbContext ?? throw new ArgumentNullException(nameof(usersDbContext));
    }

    public async Task<OperationResult> Handle(CloseCompanyEventCommand request, CancellationToken cancellationToken)
    {
        var partUsers = await _eventParticipationDbContext.EventParticipations
            .Where(x => x.CompanyEventId == request.CompanyEventId).ToArrayAsync();
        var partIdUsers = partUsers.Select(x => x.UserId);
        var users = await _usersDbContext.Users.Where(x => partIdUsers.Contains(x.Id)).ToArrayAsync();
        foreach (var user in users)
        {
            await _moneyHelper.UpdateUserMoneyAsync(user.Id, request.Reward);
        }

        return OperationResult.SuccessResult();
    }
}