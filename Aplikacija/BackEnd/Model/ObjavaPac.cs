using HealthApp.Model;

namespace BackEnd.Model
{
    public class ObjavaPac
    {
        public Guid ID {get; set;} = Guid.NewGuid();

        public ObjavaNaForumu? mojaObjava{get; set;}

        public Pacijent? mojiPac {get; set;}
    }
}