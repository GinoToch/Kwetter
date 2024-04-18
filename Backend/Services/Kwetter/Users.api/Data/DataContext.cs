using Microsoft.EntityFrameworkCore;
using Users.api.Entities;

namespace Users.api.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public virtual DbSet<User> Users { get; set; }

        protected DataContext() : base() { }
    }
}
