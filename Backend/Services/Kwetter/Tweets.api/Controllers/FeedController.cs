using Microsoft.AspNetCore.Mvc;
using Tweets.api.Data;
using Tweets.api.Entities;
using Tweets.api.Interfaces;

namespace Tweets.api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FeedController : ControllerBase
    {
        private readonly IFeedService feedService;

        public FeedController(IFeedService feedService)
        {
            this.feedService = feedService;
        }

        [HttpGet(Name = "GetFeed")]
        public async Task<IActionResult> GetFeed()
        {
           List<Tweet> tweets = await feedService.GetFeed();
           return Ok(tweets);
        }
    }
}
