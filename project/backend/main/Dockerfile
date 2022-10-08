FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["/Heartbeat.WebAPI/Heartbeat.WebAPI.csproj", "Heartbeat.WebAPI/"]
COPY ["/Heartbeat.Persistence/Heartbeat.Persistence.csproj", "Heartbeat.Persistence/"]
COPY ["/Heartbeat.Domain/Heartbeat.Domain.csproj", "Heartbeat.Domain/"]
COPY ["/Heartbeat.Application/Heartbeat.Application.csproj", "Heartbeat.Application/"]
RUN dotnet restore "Heartbeat.WebAPI/Heartbeat.WebAPI.csproj"
COPY . .
WORKDIR "/src/Heartbeat.WebAPI"
RUN dotnet build "Heartbeat.WebAPI.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Heartbeat.WebAPI.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Heartbeat.WebAPI.dll"]
