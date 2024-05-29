using Accounts.api.Entities;
using Accounts.api.Interfaces;
using Accounts.api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Accounts.api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpGet("GetAccount")]
        public ActionResult<Account> GetAccount(string name)
        {
            var account = _accountService.GetAccount(name);
            if (account.Value == null)
            {
                return NotFound();
            }
            return Ok(account);
        }
    }
}
