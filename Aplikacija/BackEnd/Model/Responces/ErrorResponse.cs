namespace HealthApp.Model.Responces
{
    public class ErrorResponse
    {
        public IEnumerable<String> ErrorMessage {get; set;}

           public ErrorResponse(String errorMessage) : 
            this(new List<String>() { errorMessage }) {
                
            }

           public ErrorResponse(IEnumerable<String> errorMessage) {
               ErrorMessage = errorMessage;
           }
     }
}