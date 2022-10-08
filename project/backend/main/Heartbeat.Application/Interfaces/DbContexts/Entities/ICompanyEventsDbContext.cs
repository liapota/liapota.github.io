using Heartbeat.Application.Common.Behaviors;
using Heartbeat.Domain;
using Microsoft.EntityFrameworkCore;

namespace Heartbeat.Application.Interfaces.DbContexts.Entities;

public interface ICompanyEventsDbContext
{
    public DbSet<CompanyEvent> CompanyEvents { get; set; }
    public Task<OperationResult> SaveChangesAsync(CancellationToken cancellationToken);
}