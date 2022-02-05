namespace Project2.Models
{
    public class ActionResponse
    {

        public ActionResponse(string status, string code, string message = "")
        {
            Status = status;
            Code = code;
            Message = message;
        }

        public string Status { get; set; }
        public string Code{ get; set; }
        public string Message { get; set; }
    }
}
