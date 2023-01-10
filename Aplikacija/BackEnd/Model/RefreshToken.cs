using System.ComponentModel.DataAnnotations;

namespace HealthApp.Model

{
    public class RefreshToken
    {
        public String Refresh_Token { get; set; } = String.Empty;

        public Guid UserId { get; set; }

        [Key]
        public Guid Id {get; set;} = Guid.NewGuid();
    }
}