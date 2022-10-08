using Heartbeat.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Heartbeat.Persistence.EntityTypeConfigurations;

public class CompanyEventConfiguration : IEntityTypeConfiguration<CompanyEvent>
{
    public void Configure(EntityTypeBuilder<CompanyEvent> builder)
    {
        builder.HasKey(x => x.Id);
        builder.HasIndex(x => x.Id).IsUnique();
        builder.Property(x => x.CreatorId);
        builder.Property(x => x.Title).HasMaxLength(250);
        builder.Property(x => x.Description).HasMaxLength(250);
        builder.Property(x => x.StartTime);
        builder.Property(x => x.Duration);
        builder.Property(x => x.Reward);
    }
}