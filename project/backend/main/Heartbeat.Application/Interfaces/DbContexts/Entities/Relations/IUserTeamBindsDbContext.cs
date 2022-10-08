using Heartbeat.Application.Common.Behaviors;
using Heartbeat.Domain.Relations;
using Microsoft.EntityFrameworkCore;

namespace Heartbeat.Application.Interfaces.DbContexts.Entities.Relations;

public interface IUserTeamBindsDbContext
{
    public DbSet<UserTeamBind> UserTeamBinds { get; set; }
    public Task<OperationResult> SaveChangesAsync(CancellationToken cancellationToken);
}