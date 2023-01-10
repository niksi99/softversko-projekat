using HealthApp.Services.PasswordHasher;

public class BCryptPasswordHasher : IPasswordHasher
{
    public string HashPassword(string password)
    {
        return BCrypt.Net.BCrypt.HashPassword(password);
    }

    public bool VerifyPassword(string Password, string PasswordHash)
    {
        return BCrypt.Net.BCrypt.Verify(Password, PasswordHash);
    }
}