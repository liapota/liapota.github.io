using Heartbeat.Domain.Relations;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Heartbeat.Persistence.EntityTypeConfigurations;

public class UserTeamBindConfiguration : IEntityTypeConfiguration<UserTeamBind>
{
    public void Configure(EntityTypeBuilder<UserTeamBind> builder)
    {
        builder.HasKey(userTeamBind => userTeamBind.Id);
        builder.HasIndex(userTeamBind => userTeamBind.Id).IsUnique();
        builder.Property(userTeamBind => userTeamBind.UserId);
        builder.Property(userTeamBind => userTeamBind.TeamId);
    }
}