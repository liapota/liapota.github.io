using System.Reflection;
using Heartbeat.Application;
using Heartbeat.Application.Common.Mappings;
using Heartbeat.Application.Interfaces.DbContexts.Entities;
using Heartbeat.Persistence;
using Heartbeat.WebAPI.Middlewares;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(
    options =>
        options.AddDefaultPolicy(builder =>
        {
            builder.SetIsOriginAllowed(origin => new Uri(origin).Host == "localhost");
        }));

builder.Services.AddControllers().AddNewtonsoftJson();
builder.Services.AddAutoMapper(config =>
{
    config.AddProfile(new AssemblyMappingProfile(Assembly.GetExecutingAssembly()));
    config.AddProfile(new AssemblyMappingProfile(typeof(IUsersDbContext).Assembly));
});
builder.Services.AddApplication();
builder.Services.AddPersistence(builder.Configuration);

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var serviceProvider = scope.ServiceProvider;
    try
    {
        var context = serviceProvider.GetRequiredService<ApplicationDbContext>();
        await DbInitializer.InitializeAsync(context);
    }
    catch (Exception exception)
    {
        Console.WriteLine(exception.StackTrace);
    }
}

app.UseCors();

app.UseMiddleware<CapAuthenticationMiddleware>();

app.UseRouting();

app.UseEndpoints(endpoints =>
{
    endpoints.MapDefaultControllerRoute();
});

app.Run();