using System.ComponentModel.DataAnnotations;

public class RegisterRequest {

    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    public String Ime {get; set;} = String.Empty;

    [Required]
    public String Prezime {get; set;} = String.Empty;

    [StringLength(13)]
    [Required]
    public String JMBG {get; set;} = String.Empty;

    [Required]
    public String UserName {get; set;} = String.Empty;

    [Required]
    public String Password {get; set;} = String.Empty;

    [Required]
    public String ComfirmPassword {get; set;} = String.Empty;

    [Required]
    [EmailAddress]
    public String Email {get; set;} = String.Empty;

    public int publicId {get; set;}
}