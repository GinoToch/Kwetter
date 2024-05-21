using Accounts.api.Data;
using Accounts.api.Entities;
using Accounts.api.Interfaces;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace Accounts.api.Services
{
    public class AccountService : IAccountService
    {
        private readonly DataContext dataContext;

        public AccountService(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }

        public ActionResult<Account> GetAccount(Guid id)
        {
            return dataContext.Accounts.SingleOrDefault(x => x.Id == id);
        }
    }
}
