using Firebase.Database;
using HealthApp.Model;
using HealthApp.Model.Responces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using HealthAppointment.Controllers;
using Microsoft.AspNetCore.Authorization;

namespace HealthApp.Controllers
{
    public class PacijentController : ControllerBase
    {

        public struct NewOsoba
        {
            public NewOsoba(string id, string ime, string prezime, int publicid)
            {
                ID = id;
                Ime = ime;
                Prezime = prezime;
                PublicID = publicid;
            }

            public NewOsoba(){
                ID = "id";
                Ime = "ime";
                Prezime = "prezime";
                PublicID = 000000;
            }

            

            public string ID { get; set;}
            public string Ime { get; set;}
            public string Prezime {get; set;}
            public int PublicID {get; set;}
        }

        public struct NewPoruka{
                public NewPoruka(DateTime datum, string poslPoruka){
                    datumPoruke = datum;
                    tekstPoruke = poslPoruka;
                }
                public NewPoruka(){
                    datumPoruke = DateTime.Now;
                    tekstPoruke = "Greska negde";
                }
                public DateTime datumPoruke {get; set;}
                public string tekstPoruke {get; set;}
            }

        public struct OsobaPoruka{
            public OsobaPoruka(NewOsoba os, NewPoruka poruka){
                Osoba = os;
                Poruka = poruka;
            }

            public OsobaPoruka(){
                Osoba = new NewOsoba();
                Poruka = new NewPoruka();
            }

            public NewOsoba Osoba {get; set;}
            public NewPoruka Poruka {get;}
        }

        

        public struct PorukaRet{
            public PorukaRet(){
                list = new Dictionary<string, Poruka>();
            }

            public Dictionary<string, Poruka> list {get; set;}
        }

        [Route("VratiSvePorukeOsobe"), Authorize(Roles = "Pacijent, DoktorOpstePrakse, DoktorSpecijaliste")]
        [HttpGet]
        public async Task<ActionResult> VratiSvePorukeOsobe(string idOsobe, bool jePacijent)  //vraca listu svih osoba sa kojima je data osoba komunicirala, i poslednju poruku sa svakim
        {
            try{
                FirebaseClient fbc = new FirebaseClient("https://health-appointment-a0b43-default-rtdb.europe-west1.firebasedatabase.app/");
                var childe = fbc.Child("messages/" + idOsobe);
                List<string> listaRazgovornika = new List<string>();

                var listaRazgovora = await childe.OnceSingleAsync<JObject>();
                if(listaRazgovora == null) return BadRequest("List is empty!");
                var deserializedListRazgovora = JsonConvert.DeserializeObject<Dictionary<string, JArray>>(listaRazgovora.ToString());
                foreach(KeyValuePair<string, JArray> k in deserializedListRazgovora){
                    listaRazgovornika.Add(k.Key);
                }

                List<OsobaPoruka> retOsobaPoruka = new List<OsobaPoruka>();
                foreach (string s in listaRazgovornika){
                    NewPoruka posPoruka = await VratiPoslednjuPoruku(idOsobe, s);
                    NewOsoba osobaZaPoruku = await VratiOsobuKaoStructPoId(s, jePacijent);
                    OsobaPoruka zaListu = new OsobaPoruka(osobaZaPoruku, posPoruka);
                    retOsobaPoruka.Add(zaListu);
                }

                return Ok(retOsobaPoruka);
            }
            catch(Exception e){
                return BadRequest(e.Message);
                
            }
        }

        [Route("VratiPoslednjuPoruku")]
        [HttpGet]
        public async Task<NewPoruka> VratiPoslednjuPoruku(string osoba, string dete)  //vraca forum simptoma gde pacijenti postavljaju svoje simptome, radi
        {
            try
            {
                var fbc = new FirebaseClient("https://health-appointment-a0b43-default-rtdb.europe-west1.firebasedatabase.app/messages/" + osoba + "/");
                var result = await fbc.Child(dete).OnceSingleAsync<JArray>();
                if(result == null) return new NewPoruka();
                var deserializedList = JsonConvert.DeserializeObject<List<Poruka>>(result.ToString());
                NewPoruka retPoruka = new NewPoruka(deserializedList.Last().date, deserializedList.Last().text);
                return retPoruka;
            }
            catch (Exception e)
            {
                return new NewPoruka();
            }
        }

        [Route("VratiOsobuKaoStructPoId")]
        [HttpGet]
        public async Task<NewOsoba> VratiOsobuKaoStructPoId(string osoba, bool jePacijent)  //vraca forum simptoma gde pacijenti postavljaju svoje simptome, radi
        {
            try
            {
                string childExtension = jePacijent ? "pacijenti" : "doktori";
                var fbc = new FirebaseClient("https://health-appointment-a0b43-default-rtdb.europe-west1.firebasedatabase.app/korisnici/");
                var result = await fbc.Child(childExtension).OnceSingleAsync<JObject>();
                if(result == null) return new NewOsoba();;
                
                var deserializedList = JsonConvert.DeserializeObject<Dictionary<string, Osoba>>(result.ToString());
                //return Ok(deserializedList);
                NewOsoba retOsoba = new NewOsoba();
                foreach (KeyValuePair<string, Osoba> k in deserializedList){
                    if(k.Value.Id.ToString() == osoba){
                        retOsoba.ID = k.Value.Id.ToString();
                        retOsoba.Ime = k.Value.Ime;
                        retOsoba.Prezime = k.Value.Prezime;
                        retOsoba.PublicID = k.Value.publicId;
                        continue;
                    }
                }
                return retOsoba;
            }
            catch (Exception e)
            {
                return new NewOsoba();  //"BadRequest catch");  
            }
        }



        private void SmestiUListu(){

        }
    }
}