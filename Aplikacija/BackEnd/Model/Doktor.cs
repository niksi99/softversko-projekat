using System.ComponentModel.DataAnnotations;
using BackEnd.Model;
using HealthApp.Model;

public class Doktor : Osoba {

    [Required]
    public int BrojLicneKarte {get; set; }

    public String Biografija {get; set;} = String.Empty;
    
    [Required]
    public String Specijalizacija {get; set;} = String.Empty;

    public List<int> Ocene {get; set;} = new List<int>();

    public String? Slika {get; set;}


   
}