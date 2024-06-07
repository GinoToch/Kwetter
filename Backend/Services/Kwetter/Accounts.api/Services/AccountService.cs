using Accounts.api.Data;
using Accounts.api.Entities;
using Accounts.api.Interfaces;
using Contracts;
using MassTransit;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace Accounts.api.Services
{
    public class AccountService : IAccountService
    {
        private readonly DataContext dataContext;
        private readonly IPublishEndpoint _publishEndpoint;

        public AccountService(DataContext dataContext, IPublishEndpoint publishEndpoint)
        {
            this.dataContext = dataContext;
            _publishEndpoint = publishEndpoint;
        }

        public async Task<Account> DeleteAccount(Guid id)
        {
            var user = dataContext.Accounts.FirstOrDefault(x => x.Id == id);
            if (user != null)
            {
                dataContext.Accounts.Remove(user);
                dataContext.SaveChangesAsync();
                
                await _publishEndpoint.Publish(new UserDeletedEvent
                {
                    id = user.Id,
                });
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
