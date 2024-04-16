using Microsoft.AspNetCore.Mvc;

namespace Users.api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthenticationController : ControllerBase
    {
        [HttpGet(Name = "GetSomething")]
        public IActionResult GetSomething()
        {
            return Ok("dit werkt");
        }
        
    }
}
