using Heartbeat.Application.Common.Behaviors;
using Heartbeat.Application.Interfaces.DbContexts.Entities;
using Heartbeat.Application.Interfaces.DbContexts.Entities.Relations;
using Heartbeat.Domain;
using Heartbeat.Domain.Relations;
using Heartbeat.Persistence.EntityTypeConfigurations;
using Microsoft.EntityFrameworkCore;

namespace Heartbeat.Persistence;

public class ApplicationDbContext : DbContext, IUsersDbContext, ITeamsDbContext, ICompanyEventsDbContext, ICompanyBonusDbContext,
    IUserTeamBindsDbContext, IEventParticipationDbContext
{
    private DbSet<CompanyBonus> _companyEvents;
    public DbSet<User> Users { get; set; }
    public DbSet<Team> Teams { get; set; }
    public DbSet<CompanyEvent> CompanyEvents { get; set; }
    public DbSet<UserTeamBind> UserTeamBinds { get; set; }
    public DbSet<CompanyEventParticipation> EventParticipations { get; set; }
    
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options) { }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.ApplyConfiguration(new UserConfiguration());
        builder.ApplyConfiguration(new TeamConfiguration());
        builder.ApplyConfiguration(new CompanyEventConfiguration());
        builder.ApplyConfiguration(new UserTeamBindConfiguration());
        builder.ApplyConfiguration(new CompanyEventParticipationConfiguration());
        base.OnModelCreating(builder);
    }

    DbSet<CompanyBonus> ICompanyBonusDbContext.CompanyEvents
    {
        get => _companyEvents;
        set => _companyEvents = value;
    }

    public new async Task<OperationResult> SaveChangesAsync(CancellationToken cancellationToken)
    {
        try
        {
            await TrySaveChangesAsync(cancellationToken);
            return OperationResult.SuccessResult();
        }
        catch (Exception exception)
        {
            return OperationResult.ExceptionResult(exception);
        }
    }

    private Task<int> TrySaveChangesAsync(CancellationToken cancellationToken)
    {
        return base.SaveChangesAsync(cancellationToken);
    }
}