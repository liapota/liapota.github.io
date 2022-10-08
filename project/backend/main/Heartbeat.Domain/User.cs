namespace Heartbeat.Domain;

public class User
{
    public int Id { get; set; }
    public UserRole Role { get; set; }
    public string Name { get; set; }
    public string Surname { get; set; }
    public string Cookie { get; set; }
}

public enum UserRole
{
    Admin,
    Employee
}