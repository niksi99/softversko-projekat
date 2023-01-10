namespace HealthApp.Model
{
    public class AuthConfiguration
    {
        public String AccessTokenSecret { get; set; } = String.Empty;

        public int AccessTokenExpirationMinutes {get; set; }

        public String Issuer {get; set; } = String.Empty;

        public String Audience {get; set; } = String.Empty;
    }
}