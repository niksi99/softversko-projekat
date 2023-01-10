using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HealthApp.Model;
using Firebase.Database;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Authorization;

namespace HealthAppointment.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DoktorOpstePrakseController : ControllerBase
    {
        
        [Route("VratiForumSimptoma"),  Authorize(Roles = "admin, DoktorOpstePrakse, DoktorOpstePrakse")]
        [HttpGet]
        public async Task<ActionResult> VratiForumSimptoma()  //vraca forum simptoma gde pacijenti postavljaju svoje simptome, radi
        {
            try
            {
                var fbc = new FirebaseClient("https://health-appointment-a0b43-default-rtdb.europe-west1.firebasedatabase.app/");
                var result = await fbc.Child("Tiketi").OnceSingleAsync<JObject>();
                if(result == null) return BadRequest("List is empty!");
                return Ok(JsonConvert.DeserializeObject<Dictionary<string, ObjavaNaForumu>>(result.ToString()));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("ProslediPacijentaDoktoru"),  Authorize(Roles = "admin, DoktorOpstePrakse")]  //To do
        [HttpPut]
        public async Task<ActionResult> ProslediPacijentaDoktoru(string idTiketa, string idDoktora){  //prosledjuje pacijenta doktoru koji ce ga leciti (sa foruma)
            try{
                FirebaseClient fbc = new FirebaseClient("https://health-appointment-a0b43-default-rtdb.europe-west1.firebasedatabase.app");
                var childe = fbc.Child("Tiketi");
                var listaObjava = await childe.OnceSingleAsync<JObject>();
                if(listaObjava == null) return BadRequest("List is empty!");
                var deserializedList = JsonConvert.DeserializeObject<Dictionary<string, ObjavaNaForumu>>(listaObjava.ToString());
                Guid tiketGUID = Guid.Parse(idTiketa);
                ObjavaNaForumu nasaObjava = new ObjavaNaForumu();
                string objectKey = string.Empty;
                foreach(KeyValuePair<string, ObjavaNaForumu> dic in deserializedList){
                    if(dic.Value.ID == tiketGUID){
                        nasaObjava = dic.Value;
                        objectKey = dic.Key;
                        continue;
                    }
                }
                if(objectKey != string.Empty){
                    string urlExtension = "Tiketi/" + objectKey;
                    nasaObjava.IDDoktora = Guid.Parse(idDoktora);
                    nasaObjava.datumProsledjivanja = DateTime.Now;
                    var postChild = fbc.Child(urlExtension);
                    await postChild.PutAsync(JsonConvert.SerializeObject(nasaObjava));
                    return Ok();
                }
                else return BadRequest("Nije pronadjen takav objekat!");
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }
    }
}