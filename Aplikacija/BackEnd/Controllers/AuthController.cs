using System.Collections.Generic;
using System.Security.Claims;
using System.Security.Cryptography;
using BackEnd.Model;
using BackEnd.Model.Request;
using BackEnd.Model.Responces;

using HealthApp.Model;
using HealthApp.Model.Request;
using HealthApp.Model.Responces;
using HealthApp.Services.PasswordHasher;
using HealthApp.Services.TokenGenerator;
using HealthApp.Services.TokenValidator;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Firebase.Database;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using Firebase.Database.Query;

public class AuthController : ControllerBase {

    private readonly IPasswordHasher _passwordHasher;
    private readonly AccessTokenGenerator _accessTokenGenerator;
    private readonly PacijentATGenerator _pAccessTokenGenerator;
    //private readonly DrATGenerator _drAccessTokenGenerator;
    private readonly RefreshTokenGenerator _refreshTokenGenerator;
    private readonly RefreshTokenValidator _refreshTokenValidator;
    

    //konstruktor
    public AuthController(IPasswordHasher passwordHasher, AccessTokenGenerator atg, PacijentATGenerator pAccessTokenGenerator,
     RefreshTokenGenerator rtg, RefreshTokenValidator rtv)
    {   
        _passwordHasher = passwordHasher;
        _accessTokenGenerator = atg;
        _refreshTokenGenerator = rtg;
        _refreshTokenValidator = rtv;
        _pAccessTokenGenerator = pAccessTokenGenerator;
    }

    [Route("Register-Doktor"), AllowAnonymous]
    [HttpPost]
     public async Task<IActionResult> RegisterDr([FromBody] DoktorRegisterRequest newDok) {
        
        if(newDok.Password != newDok.ComfirmPassword) {
            return BadRequest(new ErrorResponse("Ne poklapaju se lozinke"));
        }
        var fbc1 = new FirebaseClient("https://health-appointment-a0b43-default-rtdb.europe-west1.firebasedatabase.app/korisnici");
        var dete = fbc1.Child("doktori");
        var listaLekara = await dete.OnceSingleAsync<JObject>();

        var deserializedListDoktori = JsonConvert.DeserializeObject<Dictionary<string, Doktor>>(listaLekara.ToString());

        foreach(KeyValuePair<string, Doktor> r in deserializedListDoktori){
            if(r.Value.UserName == newDok.UserName) {
                return BadRequest("Vec postoji doktor/ka sa takvo username");
            }
            if(r.Value.Email == newDok.Email) {
                return BadRequest("Vec postoji doktor/ka sa takav mejl");
            }
            if(r.Value.BrojLicneKarte == newDok.BrojLicneKarte) {
                return BadRequest("Vec postoji doktor/ka sa taj broj licne karte");
            }
            if(r.Value.publicId == newDok.publicId) {
                return BadRequest("Vec postoji doktor/ka sa taj publicID");
            }
        }  
        Random generator = new Random();
        String passwordHashed = _passwordHasher.HashPassword(newDok.Password);

        int A = generator.Next(10000, 10000000);

        String a = string.Empty;
         if(newDok.Specijalizacija == "OpstaPraksa")
            a = "DoktorOpstePrakse";
        else
            a = "DoktorSpecijaliste";

        Doktor lekar = new Doktor() {
            Ime = newDok.Ime,
            Prezime = newDok.Prezime,
            JMBG = newDok.JMBG,
            UserName = newDok.UserName,
            Email = newDok.Email,
            PasswordHash = passwordHashed,
            BrojLicneKarte = newDok.BrojLicneKarte,
            Specijalizacija = newDok.Specijalizacija,
            Slika = newDok.Slika,
            Biografija = newDok.Biografija,
            publicId = A,
            uloga = a
        };
       try {
            await dete.PostAsync(JsonConvert.SerializeObject(lekar));
            return Ok(lekar);
        }
        catch (Exception e) {
            return BadRequest(e.Message);
        }
     }


    [Route("Register-Pacijent"), AllowAnonymous]
    [HttpPost]
     public async Task<IActionResult> RegisterPacijent([FromBody] PacijentRegisterRequest newPac) {
        
        if(newPac.Password != newPac.ComfirmPassword) {
            return BadRequest(new ErrorResponse("Ne poklapaju se lozinke"));
        }
        var fbc1 = new FirebaseClient("https://health-appointment-a0b43-default-rtdb.europe-west1.firebasedatabase.app/korisnici");
        var dete = fbc1.Child("pacijenti");
        var listaLekara = await dete.OnceSingleAsync<JObject>();

        var deserializedListPac = JsonConvert.DeserializeObject<Dictionary<string, Pacijent>>(listaLekara.ToString());

        foreach(KeyValuePair<string, Pacijent> r in deserializedListPac){
            // if(r.Value.UserName == newPac.UserName) {
            //     return BadRequest(new ErrorResponse("Vec postoji sa takvm UserName"));
            // }
            if(r.Value.Email == newPac.Email) {
                return BadRequest("Vec postoji pac sa takav mejl");
            }
            if(r.Value.LBO == newPac.LBO) {
                return BadRequest("Vec postoji pac sa taj LBO");
            }
            if(r.Value.BrojZdravstveneKnjizice == newPac.BrojZdravstveneKnjizice) {
                return BadRequest("Vec postoji pac sa taj broj z knjizice");
            }
            if(r.Value.publicId == newPac.publicId) {
                return BadRequest("Vec postoji pac sa taj publicID");
            }
        }  

        var fbc = new FirebaseClient("https://health-appointment-a0b43-default-rtdb.europe-west1.firebasedatabase.app/korisnici").Child("pacijenti");

        Random generator = new Random();

        int A = generator.Next(10000, 100000);
        String passwordHashed = _passwordHasher.HashPassword(newPac.Password);
        Pacijent pacijent = new Pacijent() {
            Ime = newPac.Ime,
            Prezime = newPac.Prezime,
            JMBG = newPac.JMBG,
            UserName = newPac.UserName,
            Email = newPac.Email,
            PasswordHash = passwordHashed,
            BrojZdravstveneKnjizice = newPac.BrojZdravstveneKnjizice,
            LBO = newPac.LBO,
            publicId = A
        };
        pacijent.uloga = "Pacijent";

       
        try {
            await fbc.PostAsync(JsonConvert.SerializeObject(pacijent));
            return Ok(pacijent);
        }
        catch (Exception e) {
            return BadRequest(e.Message);
        }
     }

    [Route("Register-Admin")]
    [HttpPost]
     public async Task<IActionResult> RegisterAdmin([FromBody] AdminRegisterRequest newAd) {
        
        if(newAd.Password != newAd.ComfirmPassword) {
            return BadRequest(new ErrorResponse("Ne poklapaju se lozinke"));
        }
        var fbc1 = new FirebaseClient("https://health-appointment-a0b43-default-rtdb.europe-west1.firebasedatabase.app/korisnici");
        var dete = fbc1.Child("admini");
        var listaAdmina = await dete.OnceAsync<ADMIN>();

        foreach(var i in listaAdmina) {
            if(i.Object.UserName == newAd.UserName) {
                return BadRequest(new ErrorResponse("Vec postoji admin"));
            }
        }

        String passwordHashed = _passwordHasher.HashPassword(newAd.Password);
        ADMIN a = new ADMIN() {
            UserName = newAd.UserName,
            PasswordHash = passwordHashed
        };

        var fbc = new FirebaseClient("https://health-appointment-a0b43-default-rtdb.europe-west1.firebasedatabase.app/korisnici").Child("admini");
       try {
            await fbc.PostAsync(JsonConvert.SerializeObject(a));
            return Ok(a);
        }
        catch (Exception e) {
            return BadRequest(e.Message);
        }

     }

    [Route("DrLogIn"), AllowAnonymous]
    [HttpPost]
    public async Task<IActionResult> DrLogIn([FromBody] LoginRequest loginRequest) {

        var fbc = new FirebaseClient("https://health-appointment-a0b43-default-rtdb.europe-west1.firebasedatabase.app/korisnici");
        var chil = fbc.Child("doktori");


        var listaD =  await chil.OnceAsync<Doktor>();

        Doktor p = new Doktor();
            foreach(var d in listaD) {
                if(d.Object.UserName == loginRequest.UserName) {
                 p = d.Object; 
                 continue;
                }
            }
            

        bool isCorrectPassword = _passwordHasher.VerifyPassword(loginRequest.Password, p.PasswordHash);
        if(!isCorrectPassword) {
            return Unauthorized();
        }

        String accesToken;
        if(p.uloga != "DoktorOpstePrakse")
            accesToken = _pAccessTokenGenerator.GenerateTokenSpec(p);
        else 
            accesToken = _pAccessTokenGenerator.GenerateTokenOp(p);
        String refreshToken = _refreshTokenGenerator.GenerateTokenR();

        RefreshToken refreshTokenDTO = new RefreshToken() {
          Refresh_Token =  refreshToken,
          UserId = p.Id
        };

        var fbc1 = new FirebaseClient("https://health-appointment-a0b43-default-rtdb.europe-west1.firebasedatabase.app").Child("refresh-tokens");
        await fbc1.PostAsync(JsonConvert.SerializeObject(refreshTokenDTO));

        return Ok(new DoktorAUR() {
            AccessToken = accesToken,
            RefreshToken = refreshToken,
            d = p
        });  
    }

    [Route("AdminLogIn")] 
    [HttpPost]
    public async Task<IActionResult> AdminLogIn([FromBody] LoginRequest loginRequest) {
        var fbc = new FirebaseClient("https://health-appointment-a0b43-default-rtdb.europe-west1.firebasedatabase.app/korisnici");
        var chil = fbc.Child("admini");


        var listaA =  await chil.OnceAsync<ADMIN>();
        ADMIN p = new ADMIN();
            foreach(var d in listaA) {
                if(d.Object.UserName == loginRequest.UserName) {
                 p = d.Object; 
                 continue;
                }
            }
            

        bool isCorrectPassword = _passwordHasher.VerifyPassword(loginRequest.Password, p.PasswordHash);
        if(!isCorrectPassword) {
            return Unauthorized();
        }

        String accesToken = _accessTokenGenerator.GenerateTokenA(p);
        String refreshToken = _refreshTokenGenerator.GenerateTokenR();

        RefreshToken refreshTokenDTO = new RefreshToken() {
          Refresh_Token =  refreshToken,
          UserId = p.Id
        };

        var fbc1 = new FirebaseClient("https://health-appointment-a0b43-default-rtdb.europe-west1.firebasedatabase.app").Child("refresh-tokens");
        await fbc1.PostAsync(JsonConvert.SerializeObject(refreshTokenDTO));

        return Ok(new AdminAUR() {
            AccessToken = accesToken,
            RefreshToken = refreshToken,
            a = p
        });

       
    }

    [Route("PacLogIn")]
    [HttpPost]
    public async Task<IActionResult> PacLogIn([FromBody] LoginRequest loginRequest) {
        var fbc = new FirebaseClient("https://health-appointment-a0b43-default-rtdb.europe-west1.firebasedatabase.app/korisnici");
        var chil = fbc.Child("pacijenti");


        var listaP =  await chil.OnceAsync<Pacijent>();
        Pacijent p = new Pacijent();
            foreach(var d in listaP) {
                if(d.Object.UserName == loginRequest.UserName) {
                 p = d.Object;
                 continue;
                }
            }
            

        bool isCorrectPassword = _passwordHasher.VerifyPassword(loginRequest.Password, p.PasswordHash);
        if(!isCorrectPassword) {
            return Unauthorized();
        }

        String accesToken = _pAccessTokenGenerator.GenerateTokenP(p);
        String refreshToken = _refreshTokenGenerator.GenerateTokenR();

        RefreshToken refreshTokenDTO = new RefreshToken() {
          Refresh_Token =  refreshToken,
          UserId = p.Id
        };

        var fbc1 = new FirebaseClient("https://health-appointment-a0b43-default-rtdb.europe-west1.firebasedatabase.app").Child("refresh-tokens");
        await fbc1.PostAsync(JsonConvert.SerializeObject(refreshTokenDTO));

        return Ok(new PacijentAUR() {
            AccessToken = accesToken,
            RefreshToken = refreshToken,
            p = p
        });
    }

    [Route("RefreshTokenDr")]
    [HttpPost]
    public async Task<IActionResult> RefreshTD([FromBody] RequestRefresh req) {

        var fbc = new FirebaseClient("https://health-appointment-a0b43-default-rtdb.europe-west1.firebasedatabase.app");
        var dete = fbc.Child("refresh-tokens");
        var listaRefTokena = await dete.OnceAsync<RefreshToken>();

        Doktor o = new Doktor();
        RefreshToken rt = new RefreshToken();

         foreach(var RT in listaRefTokena){
                if(RT.Object.Refresh_Token == req.RefreshToken) {
                 rt = RT.Object;
                 o.Id = RT.Object.UserId; 
                 continue;
                }
            }

        String accesToken;
        if(o.uloga == "DoktorOpstePrakse")
            accesToken = _pAccessTokenGenerator.GenerateTokenOp(o);
        else
            accesToken = _pAccessTokenGenerator.GenerateTokenSpec(o);
        String refreshToken = _refreshTokenGenerator.GenerateTokenR();

        return Ok(new AuthenticatedUserResponses() {
            AccessToken = accesToken,
            RefreshToken = refreshToken
        });
    }

    [Route("RefreshTokenPac")]
    [HttpPost]
    public async Task<IActionResult> RefreshTP([FromBody] RequestRefresh req) {
        
        var fbc = new FirebaseClient("https://health-appointment-a0b43-default-rtdb.europe-west1.firebasedatabase.app");
        var dete = fbc.Child("refresh-tokens");
        var listaRefTokena = await dete.OnceAsync<RefreshToken>();

        Pacijent o = new Pacijent();
        RefreshToken rt = new RefreshToken();

         foreach(var RT in listaRefTokena){
                if(RT.Object.Refresh_Token == req.RefreshToken) {
                 rt = RT.Object;
                 o.Id = RT.Object.UserId; 
                 continue;
                }
        
            }

        String accesToken = _pAccessTokenGenerator.GenerateTokenP(o);
        String refreshToken = _refreshTokenGenerator.GenerateTokenR();

        return Ok(new AuthenticatedUserResponses() {
            AccessToken = accesToken,
            RefreshToken = refreshToken
        });
    }
}