using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace HealthApp.Services.TokenValidator
{
    public class RefreshTokenValidator
    {
        public bool Validate(String refreshToken) {
            
            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            TokenValidationParameters validationParameters = new TokenValidationParameters() {
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("0my2ZPDaoe9_QzWDEyeBSx2O_gO4YNlj8zV10eCmO1T8otiz1ddrHa8J1n4v-BbgbkuCm9GLuSz0RVdwvfSNKaMwZ2QyL-l_J_Fg5QFgz2ifre7QemGyFpNCezghDpZyjaW1mkyUS08VC-Xryj44eGMM5BImS9gFwakflTkhBpU")),
                ValidIssuer = "https://localhost:7040",
                ValidAudience = "https://localhost:7040",
                ValidateIssuerSigningKey = true,
                ValidateIssuer = true,
                ValidateAudience = true,
                ClockSkew = TimeSpan.Zero
                
            };

            try {
                tokenHandler.ValidateToken(refreshToken, validationParameters, out SecurityToken validatedToken);
                return true;
            } catch (Exception) {
                return false;
            }
          
        }
    }
}