using System.ComponentModel.DataAnnotations;

namespace HealthApp.Model.Request;

public class RequestRefresh {

    [Required]
    public String RefreshToken { get; set; } = String.Empty;
}