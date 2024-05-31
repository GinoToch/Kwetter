using Contracts;
using MassTransit;
using Microsoft.EntityFrameworkCore;
using Users.api.Data;

namespace Users.api.Services.Events
{
    public sealed class UserDeletedConsumer : IConsumer<UserDeletedEvent>
    {
        private readonly DataContext _dataContext;

        public UserDeletedConsumer(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task Consume(ConsumeContext<UserDeletedEvent> context)
        {
            var userId = context.Message.id;

            var foundUser = await _dataContext.Users.FirstOrDefaultAsync(t => t.Id == userId);

            _dataContext.Users.Remove(foundUser);

            await _dataContext.SaveChangesAsync();
        }
    }
}