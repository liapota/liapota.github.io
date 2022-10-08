using Heartbeat.Domain.Relations;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Heartbeat.Persistence.EntityTypeConfigurations;

public class CompanyEventParticipationConfiguration : IEntityTypeConfiguration<CompanyEventParticipation>
{
    public void Configure(EntityTypeBuilder<CompanyEventParticipation> builder)
    {
        builder.HasKey(x => x.Id);
        builder.HasIndex(x => x.Id).IsUnique();
        builder.Property(x => x.UserId);
        builder.Property(x => x.CompanyEventId);
        builder.Property(x => x.IsConfirmed);
    }
}