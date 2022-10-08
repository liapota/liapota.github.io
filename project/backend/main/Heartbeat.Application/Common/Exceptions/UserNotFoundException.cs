namespace Heartbeat.Application.Common.Exceptions;

public class UserNotFoundException : Exception
{
    public UserNotFoundException() : base("Invalid id") { }
}