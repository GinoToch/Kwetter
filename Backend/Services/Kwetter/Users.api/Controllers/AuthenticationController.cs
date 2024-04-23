using Microsoft.AspNetCore.Mvc;
using Users.api.Data;
using Users.api.DTO;
using Users.api.Entities;
using Users.api.Interfaces;

namespace Users.api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthenticationController : ControllerBase
    {
        private readonly DataContext _dataContext;
        private readonly IAuthenticationService _authenticationService;

        public AuthenticationController(DataContext dataContext, IAuthenticationService authenticationService)
        {
            _dataContext = dataContext;
            _authenticationService = authenticationService;
        }
        [HttpGet(Name = "GetSomething")]
        public IActionResult GetSomething()
        {
            return Ok("dit werkt");
        }

        [HttpPost("register")]
        public async Task<ActionResult<User>> UserRegister(UserAuthenticationDTO request)
        {
            User user = new User();

            user.UserName = request.UserName;
            user.Id = Guid.NewGuid();

            bool hasCreatedIser = await _authenticationService.Register(user, request.Password);

            if (hasCreatedIser) return Ok(user);
            return Unauthorized(new { message = "User already in use" });
        }

        [HttpPost("login")]
        public async Task<ActionResult<string>> UserLogin(UserAuthenticationDTO request)
        {
            string? result = await _authenticationService.Login(request.UserName, request.Password);

            if (result == null) return Unauthorized(new { message = "Unable to login." });
            
            return Ok(new { token = result });
        }

    }
}
