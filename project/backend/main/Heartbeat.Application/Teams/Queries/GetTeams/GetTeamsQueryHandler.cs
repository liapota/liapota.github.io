using AutoMapper;
using Heartbeat.Application.Common.Behaviors;
using Heartbeat.Application.DtoModels;
using Heartbeat.Application.Interfaces.DbContexts.Entities;
using Heartbeat.Application.Interfaces.DbContexts.Entities.Relations;
using Heartbeat.Domain;
using Heartbeat.Domain.Relations;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Heartbeat.Application.Teams.Queries.GetTeams;

public class GetTeamsQueryHandler : IRequestHandler<GetTeamsQuery, OperationResult<IEnumerable<TeamDto>>>
{
    private readonly IUsersDbContext _usersDbContext;
    private readonly ITeamsDbContext _teamsDbContext;
    private readonly IUserTeamBindsDbContext _bindsDbContext;
    private readonly IMapper _mapper;

    public GetTeamsQueryHandler(IUsersDbContext usersDbContext, ITeamsDbContext teamsDbContext, 
        IUserTeamBindsDbContext bindsDbContext, IMapper mapper)
    {
        _usersDbContext = usersDbContext ?? throw new ArgumentNullException(nameof(usersDbContext));
        _teamsDbContext = teamsDbContext ?? throw new ArgumentNullException(nameof(teamsDbContext));
        _bindsDbContext = bindsDbContext ?? throw new ArgumentNullException(nameof(bindsDbContext));
        _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
    }
    
    public async Task<OperationResult<IEnumerable<TeamDto>>> Handle(GetTeamsQuery request, CancellationToken cancellationToken)
    {
        var teamDtos = new List<TeamDto>();
        
        var userBinds = await _bindsDbContext.UserTeamBinds.Where(bind => bind.UserId == request.UserId).ToArrayAsync(); // get own teams
        var userTeamsOperation = await GetTeamDtosByBindsAsync(userBinds, request.UserId);
        if (userTeamsOperation.IsException())
            return userTeamsOperation;
        teamDtos.AddRange(userTeamsOperation.Result);

        var excludeTeams = teamDtos.Select(team => team.TeamId).ToArray();
        var otherTeams = await _teamsDbContext.Teams.Where(team => excludeTeams.Contains(team.Id) == false).ToArrayAsync(); // get other teams
        foreach (var team in otherTeams)
        {
            var membersOperation = await GetUsersOfTeamAsync(team, request.UserId);
            if (membersOperation.IsException())
                return OperationResult<IEnumerable<TeamDto>>.ExceptionResult(membersOperation.Exception);
            var teamDto = _mapper.Map<Team, TeamDto>(team);
            teamDto = _mapper.Map<IEnumerable<Crewman>, TeamDto>(membersOperation.Result, teamDto);
            teamDtos.Add(teamDto);
        }
        
        return OperationResult<IEnumerable<TeamDto>>.SuccessResult(teamDtos);
    }

    private async Task<OperationResult<IEnumerable<TeamDto>>> GetTeamDtosByBindsAsync(IEnumerable<UserTeamBind> userBinds, int userId)
    {
        var teamDtos = new List<TeamDto>();
        foreach (var userBind in userBinds)
        {
            var teamOperation = await GetTeamByBindAsync(userBind);
            if (teamOperation.IsException())
                return OperationResult<IEnumerable<TeamDto>>.ExceptionResult(teamOperation.Exception);
            
            var membersOperation = await GetUsersOfTeamAsync(teamOperation.Result, userId);
            if (membersOperation.IsException())
                return OperationResult<IEnumerable<TeamDto>>.ExceptionResult(membersOperation.Exception);

            var teamDto = _mapper.Map<Team, TeamDto>(teamOperation.Result);
            teamDto = _mapper.Map<IEnumerable<Crewman>, TeamDto>(membersOperation.Result, teamDto);
            teamDtos.Add(teamDto);
        }
        return OperationResult<IEnumerable<TeamDto>>.SuccessResult(teamDtos);
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

    private async Task<OperationResult<Team>> GetTeamByBindAsync(UserTeamBind userTeamBind)
    {
        var team = await _teamsDbContext.Teams.FirstOrDefaultAsync(team => team.Id == userTeamBind.TeamId);
        if (team == default)
            return OperationResult<Team>.ExceptionResult(new ArgumentNullException(nameof(team)));
        return OperationResult<Team>.SuccessResult(team);
    }
}