using Heartbeat.Domain;

namespace Heartbeat.Persistence.InitialGenerators;

public static class TeamsGenerator
{
    public static IEnumerable<Team> GetTeams()
    {
        return new List<Team>
        {
            new()
            {
                Title = "HRs"
            },
            new()
            {
                Title = "Backend Developers"
            },
            new()
            {
                Title = "Frontend Developers"
            }
        };
    }
}