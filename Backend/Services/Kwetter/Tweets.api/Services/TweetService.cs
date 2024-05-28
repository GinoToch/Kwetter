using Tweets.api.Data;
using Tweets.api.DTO;
using Tweets.api.Entities;
using Tweets.api.Interfaces;
using Microsoft.Extensions.Logging;
using Tweets.api.Monitoring;

namespace Tweets.api.Services
{
    public class TweetService : ITweetService
    {
        private readonly DataContext _dataContext;
        private readonly ILogger<TweetService> _logger;

        public TweetService(DataContext dataContext, ILogger<TweetService> logger)
        {
            _dataContext = dataContext;
            _logger = logger;
        }

        public async Task<bool> SafeTweet(Tweet request)
        {
            if (string.IsNullOrEmpty(request.Content) ||
                string.IsNullOrEmpty(request.UserName) ||
                request.Id == null ||
                request.CreatedDate == null ||
                request.UserId == null)
            {
                _logger.LogWarning("Invalid {request}", request);
                return false;
            }

            _dataContext.Tweets.Add(request);
            await _dataContext.SaveChangesAsync();
            _logger.LogInformation("Successfully created tweet");
            return true;
        }

    }
}
