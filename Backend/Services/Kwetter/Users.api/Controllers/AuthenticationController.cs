using Microsoft.AspNetCore.Mvc;
using Users.api.Data;
using Users.api.Entities;

namespace Users.api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthenticationController : ControllerBase
    {
        private readonly DataContext _dataContext;

        public AuthenticationController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        [HttpGet(Name = "GetSomething")]
        public IActionResult GetSomething()
        {
            return Ok("dit werkt");
        }

        [HttpPost]
        public IActionResult Post()
        {
            User user = new User
            {
                UserName = "Test",
                PasswordHash = [2],
                PasswordSalt = [54],
                
            };
            _dataContext.Users.Add(user);
            _dataContext.SaveChanges();
            return Ok(user);
        }
        
    }
}
