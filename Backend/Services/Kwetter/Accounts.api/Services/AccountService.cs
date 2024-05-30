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

        public ActionResult<Account> DeleteAccount(Guid id)
        {
            var user = dataContext.Accounts.FirstOrDefault(x => x.Id == id);
            if (user != null)
            {
                dataContext.Accounts.Remove(user);
                dataContext.SaveChangesAsync();
            }
            else { return null; }
            return user;
        }

        public ActionResult<Account> GetAccount(string name)
        {
            var user = dataContext.Accounts.SingleOrDefault(x => x.UserName == name);            
            return user; 
        }
    }
}
