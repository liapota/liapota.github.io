namespace Heartbeat.Domain.Relations;

public class CompanyEventParticipation
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int CompanyEventId { get; set; }
    public bool IsConfirmed { get; set; }
}