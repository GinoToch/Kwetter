using Accounts.api.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace Accounts.api.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public virtual DbSet<Account> Accounts { get; set; }

        protected DataContext() : base() { }
    }
}
