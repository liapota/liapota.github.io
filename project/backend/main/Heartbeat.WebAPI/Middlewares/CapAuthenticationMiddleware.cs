using System.Security.Claims;
using Heartbeat.Application.Interfaces.DbContexts.Entities;
using Microsoft.EntityFrameworkCore;

namespace Heartbeat.WebAPI.Middlewares;

public class CapAuthenticationMiddleware
{
    private readonly RequestDelegate _next;

    public CapAuthenticationMiddleware(RequestDelegate next)
    {
        _next = next ?? throw new ArgumentNullException(nameof(next));
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var usersDbContext = context.RequestServices.GetService<IUsersDbContext>();
        var userCookie = context.Request.Cookies["user"];
        if (userCookie != null)
        {
            var user = await usersDbContext.Users.FirstOrDefaultAsync(x => x.Cookie == userCookie);
            if (user != null)
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, user.Id.ToString()),
                    new Claim(ClaimsIdentity.DefaultRoleClaimType, user.Role.ToString())
                };
                var claimsPrincipal = new ClaimsPrincipal(new[] { new ClaimsIdentity(claims) });
                context.User = claimsPrincipal;
            }
        }

        await _next.Invoke(context);
    }
}