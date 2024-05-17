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
                Id = Guid.NewGuid(),
                UserName = context.Message.UserName,
                Description = "",
                Followers = 0
            };
            _dataContext.Users.Add(account);
            await _dataContext.SaveChangesAsync();
        }
    }
}
