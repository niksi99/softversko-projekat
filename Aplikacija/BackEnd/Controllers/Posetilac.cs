using System;
using System.Linq;
using System.Threading.Tasks;
using HealthApp.Model;
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
    public class Posetilac : ControllerBase
    {

        [Route("VratiDoktore"), AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult> VratiDoktore()  //vraca listu svih doktora, radi
        {
            try
            {
                var fbc = new FirebaseClient("https://health-appointment-a0b43-default-rtdb.europe-west1.firebasedatabase.app/korisnici");
                var result = await fbc.Child("doktori").OnceSingleAsync<JObject>();
                if(result == null) return BadRequest("List is empty!");
                return Ok(JsonConvert.DeserializeObject<Dictionary<string, Doktor>>(result.ToString()));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}