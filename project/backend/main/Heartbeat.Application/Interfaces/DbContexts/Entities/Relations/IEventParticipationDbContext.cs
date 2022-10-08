using Heartbeat.Application.Common.Behaviors;
using Heartbeat.Domain.Relations;
using Microsoft.EntityFrameworkCore;

namespace Heartbeat.Application.Interfaces.DbContexts.Entities.Relations;

public interface IEventParticipationDbContext
{
    public DbSet<CompanyEventParticipation> EventParticipations { get; set; }
    public Task<OperationResult> SaveChangesAsync(CancellationToken cancellationToken);
}