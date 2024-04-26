using Tweets.api.Data;
using Tweets.api.Entities;
using Tweets.api.Interfaces;

namespace Tweets.api.Services
{
    public class FeedService : IFeedService
    {
        private readonly DataContext _dataContext;

        public FeedService(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<List<Tweet>> GetFeed()
        {
            return await _dataContext.Tweets.ToListAsync();
        }
    }
}
