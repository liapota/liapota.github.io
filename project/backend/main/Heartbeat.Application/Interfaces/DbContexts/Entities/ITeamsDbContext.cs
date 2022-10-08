using Heartbeat.Application.Common.Behaviors;
using Heartbeat.Domain;
using Microsoft.EntityFrameworkCore;

namespace Heartbeat.Application.Interfaces.DbContexts.Entities;

public interface ITeamsDbContext
{
    public DbSet<Team> Teams { get; set; }
    public Task<OperationResult> SaveChangesAsync(CancellationToken cancellationToken);
}