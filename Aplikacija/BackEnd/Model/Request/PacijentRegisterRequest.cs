namespace HealthApp.Model.Request
{
    public class PacijentRegisterRequest : RegisterRequest
    {
        public int BrojZdravstveneKnjizice {get; set; }

        public int LBO {get; set;}

        
    }
}