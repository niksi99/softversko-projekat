using HealthApp.Model.Responces;

namespace BackEnd.Model.Responces
{
    public class PacijentAUR : AuthenticatedUserResponses
    {
        public Pacijent? p {get; set;}
    }
}