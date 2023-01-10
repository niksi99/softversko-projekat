using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations;

namespace HealthApp.Model
{
    public class ObjavaNaForumu
    {   
        [Key]
        public Guid ID {get; set;} = Guid.NewGuid();

        public String naslov {get; set;} = String.Empty;

        public String sadrzajObjave {get; set;} = String.Empty;

        public DateTime datumObjave {get; set;}

        public DateTime datumOdgovoraLekara {get; set;}

        public DateTime datumProsledjivanja {get; set;}

        [JsonIgnore]
        public Forum? forum {get; set;}

        public Guid pacijentID {get; set;}

        public String odgovorLekara {get; set;} = String.Empty;

        // public List<Doktor>? lekari {get; set;}
        public Guid IDDoktora {get; set;}

        public int oceniDoktora {get; set;}
    }
}