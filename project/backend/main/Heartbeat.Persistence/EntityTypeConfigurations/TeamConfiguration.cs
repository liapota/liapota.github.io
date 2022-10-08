using Heartbeat.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Heartbeat.Persistence.EntityTypeConfigurations;

public class TeamConfiguration : IEntityTypeConfiguration<Team>
{
    public void Configure(EntityTypeBuilder<Team> builder)
    {
        builder.HasKey(team => team.Id);
        builder.HasIndex(team => team.Id).IsUnique();
        builder.Property(team => team.Title).HasMaxLength(250);
    }
}