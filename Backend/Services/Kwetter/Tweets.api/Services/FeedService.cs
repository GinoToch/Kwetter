using Tweets.api.Data;
using Tweets.api.Entities;
using Tweets.api.Interfaces;

namespace Tweets.api.Services
{
    public class FeedService : IFeedService
    {
        private readonly DataContext _dataContext;
        private readonly ILogger<FeedService> _logger;

        public FeedService(DataContext dataContext, ILogger<FeedService> logger)
        {
            _dataContext = dataContext;
            _logger = logger;
        }

        public async Task<List<Tweet>> GetFeed()
        {
            _logger.LogInformation("Feed got fetched");
            return await _dataContext.Tweets.ToListAsync();
        }
    }
}
