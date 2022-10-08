using Heartbeat.Application.Common.Behaviors;
using Heartbeat.Domain;
using Microsoft.EntityFrameworkCore;

namespace Heartbeat.Application.Interfaces.DbContexts.Entities;

public interface IUsersDbContext
{
    public DbSet<User> Users { get; set; }
    Task<OperationResult> SaveChangesAsync(CancellationToken cancellationToken);
}