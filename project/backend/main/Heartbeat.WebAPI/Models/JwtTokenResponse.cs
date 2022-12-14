using Newtonsoft.Json;

namespace Heartbeat.WebAPI.Models;

public class JwtTokenResponse
{
    [JsonProperty("access_token")]
    public string Token { get; set; }
    [JsonProperty("username")]
    public string Username { get; set; }
}