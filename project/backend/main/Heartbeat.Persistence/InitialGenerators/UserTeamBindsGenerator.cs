using Heartbeat.Domain;
using Heartbeat.Domain.Relations;

namespace Heartbeat.Persistence.InitialGenerators;

public class UserTeamBindsGenerator
{
    public static IEnumerable<UserTeamBind> GetUserTeamBinds(User[] users, Team[] teams)
    {
        var binds = new List<UserTeamBind>();

        for (int i = 0; i < users.Length; i++)
        {
            // var team = teams[i % teams.Length];
            // binds.Add(new()
            // {
            //     UserId = users[i].Id,
            //     TeamId = team.Id
            // });
            
            binds.Add(new()
            {
                UserId = users[i].Id,
                TeamId = 1
            });
            binds.Add(new()
            {
                UserId = users[i].Id,
                TeamId = 2
            });
            binds.Add(new()
            {
                UserId = users[i].Id,
                TeamId = 3
            });
        }

        return binds;
    }
}