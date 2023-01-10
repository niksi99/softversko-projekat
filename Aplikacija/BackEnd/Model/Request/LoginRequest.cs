using System.ComponentModel.DataAnnotations;

namespace HealthApp.Model.Request
{
    public class LoginRequest
    {
        [Required]
        public String UserName {get; set;} = String.Empty;

        [Required]
        public String Password {get; set;} = String.Empty;

    }
}