using Heartbeat.Domain;

namespace Heartbeat.Persistence.InitialGenerators;

public static class UsersGenerator
{
    private static string[] _names =
    {
        "Courtney",
        "Arley",
        "Ayesha",
        "Derry",
        "Garry",
        "Tomasz",
        "Howard",
        "Muna",
        "Pearl",
    };

    private static string[] _surnames =
    {
        "Lawrence",
        "Kim",
        "Kinney",
        "Castro",
        "Odom",
        "Rennie",
        "Freeman",
        "Walter",
        "Rankin",
    };

    public static User GetAdmin(string name, string surname)
    {
        return new User
        {
            Name = name,
            Surname = surname,
            Role = UserRole.Admin,
            Cookie = Guid.NewGuid().ToString()
        };
    }

    public static User GetRandomEmployee()
    {
        var random = new Random();

        var name = _names[random.Next(0, _names.Length)];
        var surname = _surnames[random.Next(0, _surnames.Length)];

        return new User
        {
            Name = name,
            Surname = surname,
            Role = UserRole.Employee,
            Cookie = Guid.NewGuid().ToString()
        };
    }
}