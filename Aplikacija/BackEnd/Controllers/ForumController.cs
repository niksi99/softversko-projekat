using HealthApp.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Firebase.Database;
using Newtonsoft.Json.Linq;
using System.Text.Json;
using Newtonsoft.Json;
using BackEnd.Model;
using Microsoft.AspNetCore.Authorization;

namespace BackEnd.Controllers
{
    public class ForumController : ControllerBase
    {   
        
        [Route("ObrisiObjavu")]
        [HttpDelete]
        public async Task<IActionResult> obrisiObjavu(Guid idObjave) {

            FirebaseClient fbc = new FirebaseClient("https://health-appointment-a0b43-default-rtdb.europe-west1.firebasedatabase.app/Tiketi");
            await fbc.Child(idObjave.ToString()).DeleteAsync();
            return Ok("Objava je obrisana");
        }

        [Route("ObrisiSveObjave")]
        [HttpDelete]
        public async Task<IActionResult> ObrisiSveObjave() {

            FirebaseClient fbc = new FirebaseClient("https://health-appointment-a0b43-default-rtdb.europe-west1.firebasedatabase.app");
            var result = fbc.Child("Tiketi");
            await result.DeleteAsync();
            return Ok("Objave su obrisane");
        }

        [Route("GetObjaveByPacID"), Authorize(Roles = "admin, DoktorOpstePrakse, DoktorSpecijaliste, Pacijent")]
        [HttpGet]
        public async Task<IActionResult> GetObjaveByPacID(Guid pacID) {
            try{
                FirebaseClient fbc = new FirebaseClient("https://health-appointment-a0b43-default-rtdb.europe-west1.firebasedatabase.app");
                var dete = fbc.Child("Tiketi");
                var objave = await dete.OnceSingleAsync<JObject>();

                List<ObjavaDr> listaObjavaDoktora = new List<ObjavaDr>();
                var deserializedListObjave = JsonConvert.DeserializeObject<Dictionary<string, ObjavaNaForumu>>(objave.ToString());
                List<ObjavaNaForumu> Lobj = new List<ObjavaNaForumu>();

                ObjavaDr novaObjavaLekar = new ObjavaDr();
                foreach(KeyValuePair<string, ObjavaNaForumu> r in deserializedListObjave){
                    ObjavaDr objdr = new ObjavaDr();
                    if(r.Value.pacijentID == pacID){
                        objdr.mojaObjava = r.Value;
                        if(r.Value.IDDoktora != Guid.Empty){
                            objdr.mojLekar = await FindDoctorById(r.Value.IDDoktora);
                        }
                        else objdr.mojLekar = new Doktor();
                        listaObjavaDoktora.Add(objdr);
                    }
                }
               return Ok(listaObjavaDoktora);
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }

       
        [Route("GetObjavaByID"),  Authorize(Roles = "admin, DoktorOpstePrakse, DoktorSpecijaliste")]
        [HttpGet]
        public async Task<IActionResult> GetObjavaID(Guid oID) {
           
            
            try{
                FirebaseClient fbc = new FirebaseClient("https://health-appointment-a0b43-default-rtdb.europe-west1.firebasedatabase.app");
                var dete = fbc.Child("Tiketi");
                var objave = await dete.OnceAsync<ObjavaNaForumu>();

                List<ObjavaNaForumu> Lobj = new List<ObjavaNaForumu>();
                ObjavaNaForumu obj = new ObjavaNaForumu();
                foreach(var o in objave) {
                    if(o.Object.ID == oID) {
                        obj = o.Object; 
                        continue;
                    }
                } 
                return Ok(obj);
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }

        [Route("DodajNovuObjavu"), Authorize(Roles = "Pacijent")]
        [HttpPost]
        public async Task<IActionResult> DodajNovuObjavu(String noviNaslov, String noviSadrzajObjave, Guid pacID) {
           try {
                var fbc = new FirebaseClient("https://health-appointment-a0b43-default-rtdb.europe-west1.firebasedatabase.app/");
            

                var fbc1 = new FirebaseClient("https://health-appointment-a0b43-default-rtdb.europe-west1.firebasedatabase.app/korisnici");
                var dete1 = fbc.Child("pacijenti");
                var pacijenti = await dete1.OnceSingleAsync<JObject>();

                ObjavaNaForumu obj = new ObjavaNaForumu();
                List<ObjavaNaForumu> Lobj = new List<ObjavaNaForumu>();
                ObjavaNaForumu novaObjava = new ObjavaNaForumu();

                novaObjava.naslov = noviNaslov;
                novaObjava.sadrzajObjave = noviSadrzajObjave;
                novaObjava.datumObjave = DateTime.Now;
                novaObjava.pacijentID  = pacID;
                novaObjava.odgovorLekara = "";
                var dete = await fbc.Child("Tiketi").PostAsync(JsonConvert.SerializeObject(novaObjava));
                 
                return Ok(novaObjava);
           } catch (Exception e) {
            return BadRequest(e.Message);
           }
        }

        [Route("DodajNovuObjavuFromBody")]
        [HttpPost]
        public async Task<IActionResult> DodajNovuObjavuFromBody([FromBody] ObjavaNaForumu objave) {
           try {
                var fbc = new FirebaseClient("https://health-appointment-a0b43-default-rtdb.europe-west1.firebasedatabase.app/");
            

                ObjavaNaForumu novaObjava = new ObjavaNaForumu();
                novaObjava.naslov = objave.naslov;
                novaObjava.sadrzajObjave = objave.sadrzajObjave;
                novaObjava.datumObjave = DateTime.Now;
                novaObjava.pacijentID  = objave.pacijentID;
            
                var dete = await fbc.Child("Tiketi").PostAsync(JsonConvert.SerializeObject(novaObjava));
                return Ok(novaObjava);
           } catch (Exception e) {
            return BadRequest(e.Message);
           }
        }


        

        [Route("DoktorOdgovaraNaObjavu"), Authorize(Roles = "DoktorSpecijaliste, DoktorOpstePrakse")]
        [HttpPatch]
        public async Task<ActionResult> DoktorOdgovaraNaObjavu(Guid idObjave, Guid idLekara, String odgLekara){  //izmena dijagnoze
            try
            {
            var fbc = new FirebaseClient("https://health-appointment-a0b43-default-rtdb.europe-west1.firebasedatabase.app");
            var chil = fbc.Child("Tiketi");
            var listaObjava = await chil.OnceSingleAsync<JObject>();
            if(listaObjava == null) return BadRequest("Lista je prazna!");

            #region Copied
            var deserializedList = JsonConvert.DeserializeObject<Dictionary<string, ObjavaNaForumu>>(listaObjava.ToString());
            ObjavaNaForumu nasaDijagnoza = new ObjavaNaForumu();
            string objectKey = string.Empty;
            foreach(KeyValuePair<string, ObjavaNaForumu> dic in deserializedList){
                if(dic.Value.ID == idObjave){
                    nasaDijagnoza = dic.Value;
                    objectKey = dic.Key;
                    continue;
                }
            }
            if(objectKey != string.Empty){
                string urlExtension = "Tiketi/" + objectKey;
                nasaDijagnoza.datumOdgovoraLekara = DateTime.Now;
                nasaDijagnoza.odgovorLekara = odgLekara;
                nasaDijagnoza.IDDoktora = idLekara;
                var postChild = fbc.Child(urlExtension);
                await postChild.PutAsync(JsonConvert.SerializeObject(nasaDijagnoza));
                return Ok(new {});
            }
            else return BadRequest("Nije pronadjen takav objekat!");
            
            #endregion

            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }                
        }
        
        [Route("OceniDoktora")]
        [HttpPost]
        public async Task<IActionResult> OceniDoktora(Guid IDDok, Guid IDObj, int Ocena) {
 
            if(Ocena <= 0 && Ocena >= 6) {
                return BadRequest("Ocena u opsegu od 1 do 5 treab da bude");
            }
 
            var fbc = new FirebaseClient("https://health-appointment-a0b43-default-rtdb.europe-west1.firebasedatabase.app");
            var chil = fbc.Child("Tiketi");
            var objave = await chil.OnceSingleAsync<JObject>();
 
            var deserializedListObjave = JsonConvert.DeserializeObject<Dictionary<string, ObjavaNaForumu>>(objave.ToString());
            ObjavaNaForumu nasaObjava = new ObjavaNaForumu();
            List<ObjavaNaForumu> pomocnaListaObjavaNF = new List<ObjavaNaForumu>();
            string objectKeyObjava = string.Empty;
            foreach(KeyValuePair<string, ObjavaNaForumu> dic in deserializedListObjave){
                if(dic.Value.ID == IDObj){
                    nasaObjava = dic.Value;
                    pomocnaListaObjavaNF.Add(nasaObjava);
                    objectKeyObjava = dic.Key;
                    continue;
                }
            }
 
            if(objectKeyObjava != string.Empty){
                string urlExtension = "Tiketi/" + objectKeyObjava;
                nasaObjava.oceniDoktora = Ocena;
                var postChildObjava = fbc.Child(urlExtension);
                await postChildObjava.PutAsync(JsonConvert.SerializeObject(nasaObjava));
                return Ok();
            } 
            else return BadRequest(new {error = "Nije pronadjen takav objekat!"}); 
        }

        [Route("VratiProsek"), Authorize(Roles = "Pacijent")]
        [HttpGet]
        public async Task<IActionResult> VratiProsek(Guid IDDok) {
            
            int zbir = 0;
            int b = 0;

            var fbc2 = new FirebaseClient("https://health-appointment-a0b43-default-rtdb.europe-west1.firebasedatabase.app");
            var chil2 = fbc2.Child("Tiketi");
            var tiketi = await chil2.OnceAsync<ObjavaNaForumu>();

            ObjavaNaForumu pomocniTiket = new ObjavaNaForumu();
            List<ObjavaNaForumu> Lobj = new List<ObjavaNaForumu>();
            foreach(var d in tiketi) {
                if(d.Object.IDDoktora == IDDok && d.Object.oceniDoktora > 0) {
                    Lobj.Add(d.Object);
                }
            }

            foreach(var i in Lobj) {
                zbir = zbir + i.oceniDoktora;
                b++;
            }

            double prosek;
            prosek = zbir / b;
            
            return Ok(prosek);
        }

            [Route("NeprocitaneObjave"), Authorize(Roles = "DoktorOpstePrakse")]
            [HttpGet]
            public async Task<IActionResult> NeprocitaneObjave() {

                var fbc = new FirebaseClient("https://health-appointment-a0b43-default-rtdb.europe-west1.firebasedatabase.app");
                var dete = fbc.Child("Tiketi");
                var objave = await dete.OnceSingleAsync<JObject>();

                FirebaseClient fbc1 = new FirebaseClient("https://health-appointment-a0b43-default-rtdb.europe-west1.firebasedatabase.app/korisnici");
                var dete1 = fbc1.Child("pacijenti");
                var pacijenti = await dete1.OnceSingleAsync<JObject>();

                FirebaseClient fbc2 = new FirebaseClient("https://health-appointment-a0b43-default-rtdb.europe-west1.firebasedatabase.app/korisnici");
                var dete2 = fbc2.Child("doktori");
                var lekari = await dete2.OnceSingleAsync<JObject>();
                
                var deserializedListObjave = JsonConvert.DeserializeObject<Dictionary<string, ObjavaNaForumu>>(objave.ToString());
                List<ObjavaNaForumu> Lobj = new List<ObjavaNaForumu>();

                 ObjavaNaForumu onf = new ObjavaNaForumu();
                 ObjavaPacijent objaPacijent = new ObjavaPacijent();
                 List<ObjavaPacijent> listaObjPac = new List<ObjavaPacijent>();
                
                 var deserializedListPac = JsonConvert.DeserializeObject<Dictionary<string, Pacijent>>(pacijenti.ToString());
                Pacijent pac = new Pacijent();
                List<Pacijent> Lpac = new List<Pacijent>();
                
                foreach(KeyValuePair<string, ObjavaNaForumu> r in deserializedListObjave){
                    if(r.Value.odgovorLekara.ToString().Length == 0){
                         Pacijent p = await FindPacById(r.Value.pacijentID);
                         AddToObjPacList(listaObjPac, r.Value, p);
                    }   
                }
               
                return Ok(listaObjPac);
            }

        [Route("FindPacById")]

        [HttpGet]

        public async Task<Pacijent> FindPacById(Guid id){

            try{

                var fbc = new FirebaseClient("https://health-appointment-a0b43-default-rtdb.europe-west1.firebasedatabase.app/korisnici/");

                var chil = fbc.Child("pacijenti");

                var result = await chil.OnceSingleAsync<JObject>();

                if(result == null) return new Pacijent();

                var deserializedList = JsonConvert.DeserializeObject<Dictionary<string, Pacijent>>(result.ToString());

                foreach(KeyValuePair<string, Pacijent> k in deserializedList){

                    if(k.Value.Id == id){

                        return k.Value;

                    }

                }
                 return new Pacijent();
            }

            catch(Exception e) {

                return new Pacijent();

            }
        }

        [Route("FindDoctorById")]
        [HttpGet]
        public async Task<Doktor> FindDoctorById(Guid id){

            try{

                var fbc = new FirebaseClient("https://health-appointment-a0b43-default-rtdb.europe-west1.firebasedatabase.app/korisnici/");

                var chil = fbc.Child("doktori");

                var result = await chil.OnceSingleAsync<JObject>();

                if(result == null) return new Doktor();

                var deserializedList = JsonConvert.DeserializeObject<Dictionary<string, Doktor>>(result.ToString());

                foreach(KeyValuePair<string, Doktor> k in deserializedList){

                    if(k.Value.Id == id){

                        return k.Value;

                    }

                }
                 return new Doktor();
            }

            catch(Exception e) {

                return new Doktor();

            }
        }

        [Route("ObjaveSaOdgovoromTogDoktora"), Authorize(Roles = "admin, Pacijent, DoktorOpstePrakse, DoktorSpecijaliste")]
        [HttpGet]
        public async Task<IActionResult> ObjaveSaOdgovoromTogDoktora(Guid idDoktora) {

            try{
                FirebaseClient fbc = new FirebaseClient("https://health-appointment-a0b43-default-rtdb.europe-west1.firebasedatabase.app");
                var dete = fbc.Child("Tiketi");
                var objave = await dete.OnceSingleAsync<JObject>();

                List<ObjavaPac> listaObjavaDoktora = new List<ObjavaPac>();
                var deserializedListObjave = JsonConvert.DeserializeObject<Dictionary<string, ObjavaNaForumu>>(objave.ToString());
                List<ObjavaNaForumu> Lobj = new List<ObjavaNaForumu>();

                ObjavaPac novaObjavaLekar = new ObjavaPac();
                foreach(KeyValuePair<string, ObjavaNaForumu> r in deserializedListObjave){
                    ObjavaPac objpac = new ObjavaPac();
                    if(r.Value.IDDoktora == idDoktora){
                        objpac.mojaObjava = r.Value;
                        if(r.Value.IDDoktora != Guid.Empty){
                            objpac.mojiPac = await FindPacById(r.Value.pacijentID);
                        }
                        else objpac.mojiPac = new Pacijent();
                        listaObjavaDoktora.Add(objpac);
                    }
                }
               return Ok(listaObjavaDoktora);
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }

        private void AddToObjPacList(List<ObjavaPacijent> listaObjPac, ObjavaNaForumu onf, Pacijent p){
            ObjavaPacijent addit = new ObjavaPacijent();
            addit.mojaObjava = onf;
            addit.mojPacj = p;
            listaObjPac.Add(addit);
        }
    }
}