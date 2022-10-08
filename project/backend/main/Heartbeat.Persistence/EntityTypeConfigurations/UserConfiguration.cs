using Heartbeat.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Heartbeat.Persistence.EntityTypeConfigurations;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.HasKey(user => user.Id);
        builder.HasIndex(user => user.Id).IsUnique();
        builder.Property(user => user.Role);
        builder.Property(user => user.Name).HasMaxLength(250);
        builder.Property(user => user.Surname).HasMaxLength(250);
        builder.Property(user => user.Cookie).HasMaxLength(250);
    }
}