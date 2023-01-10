using HealthApp.Model;

public class Osoba {

    public Guid Id {get; set;} = Guid.NewGuid();

    public String Ime {get; set;} = String.Empty;

    public String Prezime {get; set;} = String.Empty;

    public String JMBG {get; set;} = String.Empty;

    public String UserName {get; set;} = String.Empty;

    public String PasswordHash { get; set; } = String.Empty;

    public String Email {get; set;} = String.Empty;

    //public Uloga Uloga {get; set; }a

    public String uloga {get; set;} = String.Empty;
    
    public int publicId {get; set;}

   



}