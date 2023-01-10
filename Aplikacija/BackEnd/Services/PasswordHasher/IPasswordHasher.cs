namespace HealthApp.Services.PasswordHasher
{
    public interface IPasswordHasher
    {
         String HashPassword(string password);

         bool VerifyPassword(String Password, String PasswordHash);
    }
}