using Heartbeat.Application.Helpers;
using Heartbeat.Application.Interfaces;
using Heartbeat.Application.Interfaces.DbContexts.Entities;
using Heartbeat.Application.Interfaces.DbContexts.Entities.Relations;
using Heartbeat.Application.Interfaces.MoneyHelper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Heartbeat.Persistence;

public static class DependencyInjection
{
    public static IServiceCollection AddPersistence(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration["DbConnection"];
        services.AddDbContext<ApplicationDbContext>(
            options => options.UseNpgsql(connectionString));
        
        services.AddScoped<IUsersDbContext>(
            provider => provider.GetService<ApplicationDbContext>());
        services.AddScoped<ITeamsDbContext>(
            provider => provider.GetService<ApplicationDbContext>());
        services.AddScoped<ICompanyEventsDbContext>(
            provider => provider.GetService<ApplicationDbContext>());
        
        services.AddScoped<IUserTeamBindsDbContext>(
            provider => provider.GetService<ApplicationDbContext>());
        services.AddScoped<IEventParticipationDbContext>(
            provider => provider.GetService<ApplicationDbContext>());
        services.AddScoped<ICompanyBonusDbContext>(
            provider => provider.GetService<ApplicationDbContext>());

        services.AddSingleton<IMoneyHelper, MoneyHelperMock>();
        return services;
    }
}