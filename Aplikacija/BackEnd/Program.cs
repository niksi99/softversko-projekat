using System.Text;
using HealthApp.Model;
using HealthApp.Services.PasswordHasher;
using HealthApp.Services.TokenGenerator;
using HealthApp.Services.TokenValidator;

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json.Linq;
using System.Text.Json;
using Newtonsoft.Json;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.


// builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
//         .AddJwtBearer(options => {
//             AuthConfiguration auth = new AuthConfiguration();

//             options.TokenValidationParameters = new TokenValidationParameters {
//                 IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8
//                     .GetBytes("9my2ZPDaoe9_QzWDEyeBSx2O_gO4YNlj8zV10eCmO1T8otiz1ddrHa8J1n4v")),

//             };
//             builder.Configuration.Bind("Authentication", options);
//         });


//builder.Services.Configure<AuthConfiguration>(builder.Configuration.GetSection("ConnectionKeys"));

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8
                .GetBytes(builder.Configuration.GetSection("Authentication:AccessTokenSecret").Value)),
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidIssuer ="https://localhost:7040", 
            ValidAudience = "https://localhost:7040",
            ClockSkew = TimeSpan.Zero
        };
    });

builder.Services.AddSingleton<IPasswordHasher, BCryptPasswordHasher>();
//builder.Services.AddSingleton<IUserRepository, MemoryUserRepo>();
builder.Services.AddSingleton<AccessTokenGenerator>();
builder.Services.AddSingleton<PacijentATGenerator>();
builder.Services.AddSingleton<RefreshTokenGenerator>();
builder.Services.AddSingleton<RefreshTokenValidator>();


builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(
    options => {
        options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme {
            Scheme = "Bearer", 
            BearerFormat = "JWT",
            Name = "Authorization",
            Description = "Authorization Token by Bearer",
            Type = SecuritySchemeType.Http
        });
        options.AddSecurityRequirement(new OpenApiSecurityRequirement 
        {
            {
                new OpenApiSecurityScheme {
                    Reference = new OpenApiReference {
                        Id = "Bearer", 
                        Type = ReferenceType.SecurityScheme
                    }
                },
                new List<String>()
            }
        });
    }
);


builder.Services.AddCors(options=>{options.AddPolicy("Cors", builder=>{
                builder.WithOrigins(new string[]{
                "http://localhost:8080",
                "https://localohost:8080",
                "http://127.0.0.1:8080",
                "https://127.0.0.1:8080",
                "https://localhost:7040",
                "https://127.0.0.1:7040",
                "http://localhost:7040",
                "http://127.0.0.1:7040"
                
                }).AllowAnyHeader()
                .AllowAnyMethod()
                .AllowAnyOrigin();
            });
        });





var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.UseCors("Cors");

app.MapControllers();

app.Run();
