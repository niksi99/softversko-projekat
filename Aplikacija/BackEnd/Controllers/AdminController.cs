using HealthApp.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Firebase.Database;
using Newtonsoft.Json.Linq;
using System.Text.Json;
using Newtonsoft.Json;
using BackEnd.Model;
using Microsoft.AspNetCore.Authorization;

public class AdminController : ControllerBase {




    [Route("DeleteDoctor")]
    [HttpDelete]
    public async Task<IActionResult> DeleteD(Guid dID) {

        FirebaseClient fbc = new FirebaseClient("https://health-appointment-a0b43-default-rtdb.europe-west1.firebasedatabase.app/korisnici");
            var dete = fbc.Child("doktori");
            var nasObjekat = (await dete.OnceAsync<Doktor>()).Where(a => a.Object.Id.ToString() == dID.ToString()).FirstOrDefault();
            if(nasObjekat == null) {
                return BadRequest("Nepostojeci doktor");
            }
            await dete.DeleteAsync();
            return Ok("Pacijent je obrisan");
    }

    [Route("DeletePacijent")]
    [HttpDelete]
    public async Task<IActionResult> DeleteP(Guid pID) {

        FirebaseClient fbc = new FirebaseClient("https://health-appointment-a0b43-default-rtdb.europe-west1.firebasedatabase.app/korisnici");
            var dete = fbc.Child("pacijenti");
            var nasObjekat = (await dete.OnceAsync<Pacijent>()).Where(a => a.Object.Id.ToString() == pID.ToString()).FirstOrDefault();
            if(nasObjekat == null) {
                return BadRequest("Nepostojeci paicjent");
            }
            await dete.DeleteAsync();
            return Ok("Pacijent je obrisan");
        
    }

    [Route("SpisakPacijenata")]
    [HttpGet]
    public async Task<IActionResult> SpisakPacijenata() {
        var fbc = new FirebaseClient("https://health-appointment-a0b43-default-rtdb.europe-west1.firebasedatabase.app/korisnici");
        var result = await fbc.Child("pacijenti").OnceSingleAsync<JObject>();

        return Ok(result.ToString());
    }

    //[Authorize]
    [Route("SpisakDoktora")]
    [HttpGet]
    public async Task<IActionResult> SpisakDoktora() {
        var fbc = new FirebaseClient("https://health-appointment-a0b43-default-rtdb.europe-west1.firebasedatabase.app/korisnici");
        var result = await fbc.Child("doktori").OnceSingleAsync<JObject>();

        return Ok(result.ToString());
    }

    [Route("SpisakLogIn-ovanih")]
    [HttpGet]
     public async Task<IActionResult> SpisakPacijenataLog() {
        var fbc = new FirebaseClient("https://health-appointment-a0b43-default-rtdb.europe-west1.firebasedatabase.app/");
        var result = await fbc.Child("refresh-tokens").OnceSingleAsync<JObject>();
        return Ok(result.ToString());
    }

    [Route("SveObjave"), Authorize(Roles = "DoktorOpstePrakse")]
    [HttpGet]
    public async Task<IActionResult> SveObjavePrikaz() {
        var fbc = new FirebaseClient("https://health-appointment-a0b43-default-rtdb.europe-west1.firebasedatabase.app/");
        var result = await fbc.Child("Tiketi").OnceSingleAsync<JObject>();
        return Ok(result.ToString());
    }

    [Route("DoktoriPoSpecijalizaciji"), AllowAnonymous] 
    [HttpGet]
    public async Task<IActionResult> DoktoriSpecijalizanti() {

       try
            {
                var fbc = new FirebaseClient("https://health-appointment-a0b43-default-rtdb.europe-west1.firebasedatabase.app/korisnici");
                var chil = fbc.Child("doktori");
                var listaDoktora = await chil.OnceAsync<Doktor>();
                Doktor d = new Doktor();
                List<Doktor> doktori = new List<Doktor>();
                foreach (var D in listaDoktora) {
                    if(D.Object.Specijalizacija.ToString() != "OpstaPraksa"){
                       d = D.Object;
                       doktori.Add(d);
                       continue;
                    }
               }
               return Ok(doktori);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }


    }

    [Route("IzmeniBiografiju")]
    [HttpPut]
    public async Task<ActionResult> IzmeniDijagnozu(Guid dokId, String novaBiografija){  //izmena dijagnoze
            try
            {
            var fbc = new FirebaseClient("https://health-appointment-a0b43-default-rtdb.europe-west1.firebasedatabase.app/korisnici");
            var chil = fbc.Child("doktori");
            var listaDr = await chil.OnceSingleAsync<JObject>();
            if(listaDr == null) return BadRequest("Lista je prazna!");

            #region Copied
            var deserializedList = JsonConvert.DeserializeObject<Dictionary<string, Doktor>>(listaDr.ToString());
            Doktor lekar = new Doktor();
            string objectKey = string.Empty;
            foreach(KeyValuePair<string, Doktor> dic in deserializedList){
                if(dic.Value.Id == dokId){
                    lekar = dic.Value;
                    objectKey = dic.Key;
                    continue;
                }
            }
            if(objectKey != string.Empty){
                string urlExtension = "korisnici/doktori" + objectKey;
                lekar.Biografija = novaBiografija;
                var postChild = fbc.Child(urlExtension);
                await postChild.PutAsync(JsonConvert.SerializeObject(lekar));
                return Ok(lekar);
            }
            else return BadRequest("Nije pronadjen takav objekat!");
            
            #endregion

            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }                
        }
    
   


}