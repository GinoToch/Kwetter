using Tweets.api.Entities;

namespace Tweets.api.Interfaces
{
    public interface IFeedService
    {
        public Task<List<Tweet>> GetFeed();
    }
}
