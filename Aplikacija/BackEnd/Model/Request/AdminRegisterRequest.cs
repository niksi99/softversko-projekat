using System.ComponentModel.DataAnnotations;

namespace BackEnd.Model.Request
{
    public class AdminRegisterRequest
    {
        [Required]
        public String UserName { get; set; } = String.Empty;

        [Required]
        public String Password {get; set;} = String.Empty;

        [Required]
        public String ComfirmPassword {get; set;} = String.Empty;
    }
}