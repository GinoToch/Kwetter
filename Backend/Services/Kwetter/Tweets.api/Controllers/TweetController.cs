using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Tweets.api.DTO;
using Tweets.api.Entities;
using Tweets.api.Interfaces;

namespace Tweets.api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TweetController : ControllerBase
    {
        private readonly ITweetService _tweetService;

        public TweetController(ITweetService tweetService)
        {
            _tweetService = tweetService;
        }

        [HttpPost("CreateTweet")]
        //[Authorize]
        public async Task<ActionResult<Tweet>> CreateTweet(CreateTweetDTO request)
        {
            Tweet tweet = new Tweet();
            tweet.Id = Guid.NewGuid();
            tweet.Title = request.Title;
            tweet.Content = request.Content;
            tweet.UserId = request.UserId;
            tweet.UserName = request.UserName;
            tweet.Likes = 0;
            tweet.CreatedDate = DateTime.Now;


            if (await _tweetService.SafeTweet(tweet) == true)
            {
                return Ok();
            }
            else
            {
                return BadRequest("Could not create tweet");
            }
        }
    }
}
