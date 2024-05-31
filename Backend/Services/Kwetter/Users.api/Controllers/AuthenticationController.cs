using Microsoft.AspNetCore.Authorization;
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

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<User>> UserRegister(UserAuthenticationDTO request)
        {
            User user = new User();

            user.UserName = request.UserName;
            user.Id = Guid.NewGuid();

            bool hasCreatedIser = await _authenticationService.Register(user, request.Password, user.Id);

            if (hasCreatedIser) return Ok(user.UserName);
            return Unauthorized(new { message = "User already in use" });
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<string>> UserLogin(UserAuthenticationDTO request)
        {
            string? result = await _authenticationService.Login(request.UserName, request.Password);

            if (result == null) return Unauthorized(new { message = "Unable to login." });
            
            return Ok(new { token = result });
        }

        [HttpPost("RefreshToken")]
        [AllowAnonymous]
        public async Task<IActionResult> Refresh()
        {
            var refreshToken = Request.Cookies["refreshToken"];
            if (string.IsNullOrEmpty(refreshToken))
            {
                return Unauthorized("Refresh token is missing.");
            }

            var newAccessToken = await _authenticationService.RefreshAccessToken(refreshToken);
            if (newAccessToken == null)
            {
                return Unauthorized("Invalid refresh token.");
            }

            return Ok(new { AccessToken = newAccessToken });
        }
    }
}
