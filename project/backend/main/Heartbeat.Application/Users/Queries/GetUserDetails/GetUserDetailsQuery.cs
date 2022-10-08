using Heartbeat.Application.Common.Behaviors;
using MediatR;

namespace Heartbeat.Application.Users.Queries.GetUserDetails;

public class GetUserDetailsQuery : IRequest<OperationResult<UserDetailsDto>>
{
    public int UserId { get; set; }
}