using Accounts.api.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace Accounts.api.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public virtual DbSet<Account> Users { get; set; }

        protected DataContext() : base() { }
    }
}
