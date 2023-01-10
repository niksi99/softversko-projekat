using HealthApp.Model;

namespace BackEnd.Model
{
    public class ObjavaDr
    {
        public Guid ID {get; set;} = Guid.NewGuid();

        public ObjavaNaForumu mojaObjava{get; set;} = new ObjavaNaForumu();

        //public List<ObjavaNaForumu>? listaO {get; set;}

        public Doktor mojLekar {get; set;} = new Doktor();
    }
}