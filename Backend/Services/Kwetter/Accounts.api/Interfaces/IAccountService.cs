using Accounts.api.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Accounts.api.Interfaces
{
    public interface IAccountService
    {
        ActionResult<Account> GetAccount(string name);

        ActionResult<Account> DeleteAccount(Guid id);
    }
}
