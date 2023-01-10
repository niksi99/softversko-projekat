using System.ComponentModel.DataAnnotations;

namespace BackEnd.Model
{
    public class ADMIN
    {   
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        public String uloga { get; set; } = "admin";
        public String UserName {get; set;} = String.Empty;

        public String PasswordHash { get; set; } = String.Empty;
    }
}