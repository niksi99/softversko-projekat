using BackEnd.Model;

namespace HealthApp.Model.Request
{
    public class DoktorRegisterRequest : RegisterRequest
    {
        public int BrojLicneKarte {get; set; }

        public String Specijalizacija { get; set; } = String.Empty;

        public String Slika {get; set;} = String.Empty;

        public String Biografija {get; set; } = String.Empty;
    }
}