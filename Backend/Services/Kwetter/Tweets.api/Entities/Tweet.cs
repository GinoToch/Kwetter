namespace Tweets.api.Entities
{
    public class Tweet
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        
        public DateTime CreatedDate { get; set; }

    }
}
