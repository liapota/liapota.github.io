using Heartbeat.Domain;
using Heartbeat.Persistence.InitialGenerators;
using Microsoft.EntityFrameworkCore;

namespace Heartbeat.Persistence;

public static class DbInitializer
{
    public static async Task InitializeAsync(ApplicationDbContext context)
    {
        //await context.Database.EnsureDeletedAsync();

        if (await context.Database.EnsureCreatedAsync())
        {
            await InitUsersAsync(context);
            await InitTeamsAsync(context);
            await InitUserTeamBindsAsync(context);
            await InitCompanyEvents(context);
        }
    }

    private static async Task InitUsersAsync(ApplicationDbContext context)
    {
        var first_admin = UsersGenerator.GetAdmin("Name1", "Surname1");
        await context.Users.AddAsync(first_admin);
        var second_admin = UsersGenerator.GetAdmin("Name2", "Surname2");
        await context.Users.AddAsync(second_admin);
        
        for (int i = 0; i < 15; i++)
        {
            var user = UsersGenerator.GetRandomEmployee();
            await context.Users.AddAsync(user);
        }

        await context.SaveChangesAsync(CancellationToken.None);
    }

    private static async Task InitTeamsAsync(ApplicationDbContext context)
    {
        var teams = TeamsGenerator.GetTeams();
        await context.Teams.AddRangeAsync(teams);
        await context.SaveChangesAsync(CancellationToken.None);
    }

    private static async Task InitUserTeamBindsAsync(ApplicationDbContext context)
    {
        var users = await context.Users.Where(x => x.Role != UserRole.Admin).ToArrayAsync();
        var teams = await context.Teams.ToArrayAsync();
        var binds = UserTeamBindsGenerator.GetUserTeamBinds(users, teams);
        await context.UserTeamBinds.AddRangeAsync(binds);
        await context.SaveChangesAsync(CancellationToken.None);
    }

    private static async Task InitCompanyEvents(ApplicationDbContext context)
    {
        var events = CompanyEventGenerator.GetEvents();
        await context.CompanyEvents.AddRangeAsync(events);
        await context.SaveChangesAsync(CancellationToken.None);
    }
}