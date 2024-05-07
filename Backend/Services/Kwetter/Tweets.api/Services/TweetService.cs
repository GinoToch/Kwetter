using Tweets.api.Data;
using Tweets.api.DTO;
using Tweets.api.Entities;
using Tweets.api.Interfaces;

namespace Tweets.api.Services
{
    public class TweetService : ITweetService
    {
        private readonly DataContext _dataContext;

        public TweetService(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<bool> SafeTweet(Tweet request)
        {
            if (string.IsNullOrEmpty(request.Content) ||
                string.IsNullOrEmpty(request.UserName) ||
                request.Id == null ||
                request.CreatedDate == null ||
                request.UserId == null)
            {
                return false;
            }

            _dataContext.Tweets.Add(request);
            await _dataContext.SaveChangesAsync();
            return true;
        }

    }
}
