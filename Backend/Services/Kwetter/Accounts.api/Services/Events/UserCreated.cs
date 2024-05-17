using Accounts.api.Data;
using Accounts.api.Entities;
using Contracts;
using MassTransit;

namespace Accounts.api.Services.Events
{
    public sealed class UserCreatedConsumer : IConsumer<UserCreatedEvent>
    {
        private readonly DataContext _dataContext;

        public UserCreatedConsumer(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task Consume(ConsumeContext<UserCreatedEvent> context)
        {
            var account = new Account
            {
                Id = context.Message.id,
                UserName = context.Message.UserName,
                Description = "",
                Followers = 0
            };
            _dataContext.Accounts.Add(account);
            await _dataContext.SaveChangesAsync();
        }
    }
}
