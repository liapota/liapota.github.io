using AutoMapper;
using Heartbeat.Application.Common.Behaviors;
using Heartbeat.Application.Common.Exceptions;
using Heartbeat.Application.DtoModels;
using Heartbeat.Application.Interfaces.DbContexts.Entities;
using Heartbeat.Application.Interfaces.DbContexts.Entities.Relations;
using Heartbeat.Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Heartbeat.Application.Users.Queries.GetUserDetails;

public class GetUserDetailsQueryHandler : IRequestHandler<GetUserDetailsQuery, OperationResult<UserDetailsDto>>
{
    private readonly IUsersDbContext _usersDbContext;
    private readonly ITeamsDbContext _teamsDbContext;
    private readonly IUserTeamBindsDbContext _bindsDbContext;
    private readonly IMapper _mapper;

    public GetUserDetailsQueryHandler(IUsersDbContext usersDbContext, ITeamsDbContext teamsDbContext,
        IUserTeamBindsDbContext bindsDbContext, IMapper mapper)
    {
        _usersDbContext = usersDbContext ?? throw new ArgumentNullException(nameof(usersDbContext));
        _teamsDbContext = teamsDbContext ?? throw new ArgumentNullException(nameof(teamsDbContext));
        _bindsDbContext = bindsDbContext ?? throw new ArgumentNullException(nameof(bindsDbContext));
        _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
    }

    public async Task<OperationResult<UserDetailsDto>> Handle(GetUserDetailsQuery request, CancellationToken cancellationToken)
    {
        var user = await _usersDbContext.Users
            .FirstOrDefaultAsync(user => user.Id == request.UserId, cancellationToken);
        if (user == default)
            return OperationResult<UserDetailsDto>.ExceptionResult(new UserNotFoundException());

        var teammatesOperation = await GetTeammatesAsync(request.UserId);
        if (teammatesOperation.IsException())
            return OperationResult<UserDetailsDto>.ExceptionResult(teammatesOperation.Exception);

        var partTeamsOperation = await GetParticipationTeams(request.UserId);
        if (partTeamsOperation.IsException())
            return OperationResult<UserDetailsDto>.ExceptionResult(partTeamsOperation.Exception);

        var userDetails = _mapper.Map<User, UserDetailsDto>(user);
        userDetails = _mapper.Map<IEnumerable<Crewman>, UserDetailsDto>(teammatesOperation.Result, userDetails);
        userDetails =
            _mapper.Map<IEnumerable<ParticipationTeam>, UserDetailsDto>(partTeamsOperation.Result, userDetails);

        return OperationResult<UserDetailsDto>.SuccessResult(userDetails);
    }

    private async Task<OperationResult<IEnumerable<Crewman>>> GetTeammatesAsync(int userId)
    {
        var crewmen = new List<Crewman>();
        var userBinds = await _bindsDbContext.UserTeamBinds.Where(bind => bind.UserId == userId).ToArrayAsync();
        var userTeamsId = userBinds.Select(bind => bind.TeamId).ToArray();
        var teammatesBind = await _bindsDbContext.UserTeamBinds
            .Where(bind => userTeamsId.Contains(bind.TeamId) && bind.UserId != userId).ToArrayAsync();

        var usersDictionary = new Dictionary<int, User>();
        foreach (var bind in teammatesBind)
        {
            var user = await _usersDbContext.Users.FirstOrDefaultAsync(user => user.Id == bind.UserId);
            if (user != default && usersDictionary.ContainsKey(user.Id) == false)
            {
                usersDictionary.Add(user.Id, user);
                var crewman = _mapper.Map<User, Crewman>(user);
                crewmen.Add(crewman);
            }
        }
        
        return OperationResult<IEnumerable<Crewman>>.SuccessResult(crewmen);
    }

    private async Task<OperationResult<IEnumerable<ParticipationTeam>>> GetParticipationTeams(int userId)
    {
        var partTeams = new List<ParticipationTeam>();
        var userBinds = await _bindsDbContext.UserTeamBinds.Where(bind => bind.UserId == userId).ToArrayAsync();
        var teamsIdBind = userBinds.Select(bind => bind.TeamId);
        var teams = await _teamsDbContext.Teams.Where(team => teamsIdBind.Contains(team.Id)).ToArrayAsync();
        foreach (var team in teams)
        {
            var operation = await GetUsersOfTeamAsync(team, userId);
            if (operation.IsException())
                return OperationResult<IEnumerable<ParticipationTeam>>.ExceptionResult(operation.Exception);
            var partTeam = _mapper.Map<Team, ParticipationTeam>(team);
            partTeam = _mapper.Map<IEnumerable<Crewman>, ParticipationTeam>(operation.Result, partTeam);
            partTeams.Add(partTeam);
        }
        return OperationResult<IEnumerable<ParticipationTeam>>.SuccessResult(partTeams);
    }
    
    private async Task<OperationResult<IEnumerable<Crewman>>> GetUsersOfTeamAsync(Team team, int id) // id - exclude the user from result list
    {
        var crewmen = new List<Crewman>();
        var binds = await _bindsDbContext.UserTeamBinds.Where(bind => bind.TeamId == team.Id && bind.UserId != id).ToArrayAsync();
        foreach (var bind in binds)
        {
            var user = await _usersDbContext.Users.FirstOrDefaultAsync(user => user.Id == bind.UserId);
            if (user == default)
                return OperationResult<IEnumerable<Crewman>>.ExceptionResult(new ArgumentNullException(nameof(team)));
            var crewman = _mapper.Map<Crewman>(user);
            crewmen.Add(crewman);
        }
        return OperationResult<IEnumerable<Crewman>>.SuccessResult(crewmen);
    }
}