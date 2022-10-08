using Heartbeat.Domain;

namespace Heartbeat.Persistence.InitialGenerators;

public static class CompanyEventGenerator
{
    public static IEnumerable<CompanyEvent> GetEvents()
    {
        return new[]
        {
            new CompanyEvent()
            {
                CreatorId = 1,
                Title = "SomeEvent1",
                Description = "SomeDescription",
                StartTime = DateTime.UtcNow.AddDays(-1),
                Duration = TimeSpan.FromHours(2),
                Reward = 23
            },
            new CompanyEvent()
            {
                CreatorId = 1,
                Title = "SomeEvent2",
                Description = "SomeDescription",
                StartTime = DateTime.UtcNow,
                Duration = TimeSpan.FromHours(3),
                Reward = 32
            },
            new CompanyEvent()
            {
                CreatorId = 1,
                Title = "SomeEvent3",
                Description = "SomeDescription",
                StartTime = DateTime.UtcNow.AddDays(1),
                Duration = TimeSpan.FromHours(1),
                Reward = 45
            },
        };
    }
}