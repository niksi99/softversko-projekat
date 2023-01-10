using System.Text.Json.Serialization;
using HealthApp.Model;

public class Pacijent : Osoba {

    public int BrojZdravstveneKnjizice {get; set; }

    public int LBO {get; set;}

}