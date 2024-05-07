namespace Tweets.api.Entities
{
    public class Tweet
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string UserName { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public int? Likes { get; set; }
        
        public DateTime CreatedDate { get; set; }

    }
}
