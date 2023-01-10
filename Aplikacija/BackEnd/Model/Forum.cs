using System.ComponentModel.DataAnnotations;

namespace HealthApp.Model
{
    public class Forum
    {
        [Key]
        public Guid ID {get; set;}

        public List<ObjavaNaForumu>? objave {get; set;}
    }
}