using Accounts.api.Entities;
using Accounts.api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Accounts.api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly AccountService _accountService;

        public AccountController(AccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpGet("{id}")]
        public ActionResult<Account> GetAccount(Guid id)
        {
            var account = _accountService.GetAccount(id);
            if (account == null)
            {
                return NotFound();
            }
            return Ok(account);
        }
    }
}
