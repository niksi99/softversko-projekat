using System.Text.Json.Serialization;
using HealthApp.Model;
using System.ComponentModel.DataAnnotations;


namespace HealthApp.Model{
    public class Poruka
    {
        // [Key]
        // public int id {get; set;}
        public DateTime date {get; set; }

        public bool mine {get; set;}  //cija je poruka

        public string text {get; set;} = string.Empty;

       // [JsonIgnore]
        public string type {get; set;} = string.Empty;
    }
}