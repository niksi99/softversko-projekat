using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace HealthApp.Services.TokenGenerator
{
    public class PacijentATGenerator
    {
         public String GenerateTokenP(Pacijent pac) {

            List<Claim> claims = new List<Claim>() {
                new Claim("id", pac.Id.ToString()),
                new Claim(ClaimTypes.Name, pac.UserName),
                new Claim(ClaimTypes.Email, pac.Email),
                new Claim(ClaimTypes.Role, "Pacijent")
            };
            

            SecurityKey key = new SymmetricSecurityKey(Encoding.UTF8
            .GetBytes("9my2ZPDaoe9_QzWDEyeBSx2O_gO4YNlj8zV10eCmO1T8otiz1ddrHa8J1n4v-BbgbkuCm9GLuSz0RVdwvfSNKaMwZ2QyL-l_J_Fg5QFgz2ifre7QemGyFpNCezghDpZyjaW1mkyUS08VC-Xryj44eGMM5BImS9gFwakflTkhBpU"));
            SigningCredentials credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            JwtSecurityToken token = new JwtSecurityToken(
                "https://localhost:7040", 
                "https://localhost:7040/",
                 claims,
                 DateTime.Now,
                 DateTime.Now.AddMinutes(50),
                 credentials);
           

            return new JwtSecurityTokenHandler().WriteToken(token);
         }

         public String GenerateTokenOp(Doktor pac) {

            List<Claim> claims = new List<Claim>() {
                new Claim("id", pac.Id.ToString()),
                new Claim(ClaimTypes.Name, pac.UserName),
                new Claim(ClaimTypes.Email, pac.Email),
                new Claim(ClaimTypes.Role, "DoktorOpstePrakse")
            };
            

            SecurityKey key = new SymmetricSecurityKey(Encoding.UTF8
            .GetBytes("9my2ZPDaoe9_QzWDEyeBSx2O_gO4YNlj8zV10eCmO1T8otiz1ddrHa8J1n4v-BbgbkuCm9GLuSz0RVdwvfSNKaMwZ2QyL-l_J_Fg5QFgz2ifre7QemGyFpNCezghDpZyjaW1mkyUS08VC-Xryj44eGMM5BImS9gFwakflTkhBpU"));
            SigningCredentials credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            JwtSecurityToken token = new JwtSecurityToken(
                "https://localhost:7040", 
                "https://localhost:7040/",
                 claims,
                 DateTime.Now,
                 DateTime.Now.AddMinutes(50),
                 credentials);
           

            return new JwtSecurityTokenHandler().WriteToken(token);
         }
        
        public String GenerateTokenSpec(Doktor pac) {

            List<Claim> claims = new List<Claim>() {
                new Claim("id", pac.Id.ToString()),
                new Claim(ClaimTypes.Name, pac.UserName),
                new Claim(ClaimTypes.Email, pac.Email),
                new Claim(ClaimTypes.Role, "DoktorSpecijaliste")
            };
            

            SecurityKey key = new SymmetricSecurityKey(Encoding.UTF8
            .GetBytes("9my2ZPDaoe9_QzWDEyeBSx2O_gO4YNlj8zV10eCmO1T8otiz1ddrHa8J1n4v-BbgbkuCm9GLuSz0RVdwvfSNKaMwZ2QyL-l_J_Fg5QFgz2ifre7QemGyFpNCezghDpZyjaW1mkyUS08VC-Xryj44eGMM5BImS9gFwakflTkhBpU"));
            SigningCredentials credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            JwtSecurityToken token = new JwtSecurityToken(
                "https://localhost:7040", 
                "https://localhost:7040/",
                 claims,
                 DateTime.Now,
                 DateTime.Now.AddMinutes(50),
                 credentials);
           

            return new JwtSecurityTokenHandler().WriteToken(token);
         }
    }
}