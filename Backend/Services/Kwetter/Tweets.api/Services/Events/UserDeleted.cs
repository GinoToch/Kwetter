using Contracts;
using MassTransit;
using Tweets.api.Data;
using Tweets.api.Entities;

namespace Tweets.api.Services.Events
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

            var userTweets = await _dataContext.Tweets.Where(t => t.UserId == userId).ToListAsync();

            _dataContext.Tweets.RemoveRange(userTweets);

            await _dataContext.SaveChangesAsync();
        }
    }
}