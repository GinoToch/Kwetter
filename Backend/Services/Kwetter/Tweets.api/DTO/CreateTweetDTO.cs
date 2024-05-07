namespace Tweets.api.DTO
{
    public class CreateTweetDTO
    {
        public Guid UserId { get; set; }
        public string UserName { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
    }
}
