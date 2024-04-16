using Tweets.api.Entities;

namespace Tweets.api.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options){}

        public virtual DbSet<Tweet> Tweets { get; set; }

        protected DataContext() : base() { }
    }
}
