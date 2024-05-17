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

        [HttpPost("register")]
        public async Task<ActionResult<User>> UserRegister(UserAuthenticationDTO request)
        {
            User user = new User();

            user.UserName = request.UserName;
            user.Id = Guid.NewGuid();

            bool hasCreatedIser = await _authenticationService.Register(user, request.Password);

            if (hasCreatedIser) return Ok(user.UserName);
            return Unauthorized(new { message = "User already in use" });
        }

        [HttpPost("login")]
        public async Task<ActionResult<string>> UserLogin(UserAuthenticationDTO request)
        {
            string? result = await _authenticationService.Login(request.UserName, request.Password);

            if (result == null) return Unauthorized(new { message = "Unable to login." });
            
            return Ok(new { token = result });
        }

        [HttpGet("refreshAccesstoken")]
        public async Task<ActionResult<string>> RefreshAccessToken()
        {
            string? result = await _authenticationService.RefreshAccessToken();
            if (result == null) return Unauthorized(new { message = "Unable to generate new Access token" });
            return Ok(new { token = result });
        }

    }
}
