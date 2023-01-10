namespace HealthApp.Model.Responces;

public class AuthenticatedUserResponses {
    public String AccessToken { get; set; } = String.Empty;

    public String RefreshToken { get; set; } = String.Empty;
}