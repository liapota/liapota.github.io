using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace Heartbeat.WebAPI.Options;

public class AuthOptions
{
    public const string ISSUER = "Heartbeat";
    public const string AUDIENCE = "Heartbeat";
    private const string KEY = "very_secret_key";
    public const int LIFETIME = Int32.MaxValue;

    public static SymmetricSecurityKey GetSymmetricSecurityKey()
    {
        return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KEY));
    }
}