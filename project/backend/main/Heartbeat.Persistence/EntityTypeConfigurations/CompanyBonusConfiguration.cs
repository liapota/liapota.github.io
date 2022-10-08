using Heartbeat.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Heartbeat.Persistence.EntityTypeConfigurations;

public class CompanyBonusConfiguration : IEntityTypeConfiguration<CompanyBonus>
{
    public void Configure(EntityTypeBuilder<CompanyBonus> builder)
    {
        builder.HasKey(x => x.Id);
        builder.HasIndex(x => x.Id).IsUnique();
        builder.Property(x => x.Title).HasMaxLength(250);
        builder.Property(x => x.Description).HasMaxLength(250);
    }
}