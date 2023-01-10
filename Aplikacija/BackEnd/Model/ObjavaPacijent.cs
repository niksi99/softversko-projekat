using HealthApp.Model;

namespace BackEnd.Model
{
    public class ObjavaPacijent
    {
        public ObjavaNaForumu mojaObjava {get; set;} = new ObjavaNaForumu();
        //public List<ObjavaNaForumu> listaO {get; set;} = new List<ObjavaNaForumu>();
        public Pacijent mojPacj {get; set;} = new Pacijent();
    }
}