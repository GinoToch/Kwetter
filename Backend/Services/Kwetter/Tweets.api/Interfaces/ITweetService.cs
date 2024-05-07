using Tweets.api.DTO;
using Tweets.api.Entities;

namespace Tweets.api.Interfaces
{
    public interface ITweetService
    {
        Task<bool> SafeTweet(Tweet request);
    }
}
