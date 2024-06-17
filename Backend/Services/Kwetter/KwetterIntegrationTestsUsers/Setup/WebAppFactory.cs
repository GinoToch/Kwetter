using System.Data.Common;
using System.Threading.Tasks;
using MassTransit;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Respawn;
using Respawn.Graph;
using Testcontainers.MsSql;
using Users.api.Data;

namespace KwetterIntegrationTestsUsers.Setup
{
    public class WebAppFactory : WebApplicationFactory<Program>, IAsyncLifetime
    {
        public string DbConnectionString { get; private set; } = string.Empty;

        private readonly MsSqlContainer _dbContainer;

        private Respawner respawner = default!;
        private DatabaseFacade _databaseFacade = default!;

        public WebAppFactory()
        {
            _dbContainer = new MsSqlBuilder()
                .Build();
        }

        protected override void ConfigureWebHost(IWebHostBuilder builder)
        {
            builder.ConfigureAppConfiguration((ctx, config) =>
            {
                config.AddInMemoryCollection(new Dictionary<string, string>()
                {
                    {"AppSettings:Token", "thesupersecretpasswordfortesting"}
                });
            });

            builder.ConfigureTestServices(services =>
            {
                services.AddMassTransitTestHarness();

                services.RemoveAll(typeof(DbContextOptions<DataContext>));

                services.AddDbContext<DataContext>(options => { options.UseSqlServer(DbConnectionString); });

                var provider = services.BuildServiceProvider();
                using var scope = provider.CreateScope();
                var context = scope.ServiceProvider.GetRequiredService<DataContext>();

                _databaseFacade = context.Database;

                context.Database.Migrate();
                InitRespawner().Wait();
            });
        }

        public async Task InitRespawner()
        {
            DbConnection conn = await GetOpenedDbConnectionAsync();
            respawner = await Respawner.CreateAsync(conn, new RespawnerOptions
            {
                SchemasToInclude = new[] { "dbo" },
                TablesToIgnore = new Table[]
                {
                    "__EFMigrationsHistory",
                },
                DbAdapter = DbAdapter.SqlServer
            });
        }

        public async Task ResetDatabaseAsync()
        {
            DbConnection conn = await GetOpenedDbConnectionAsync();
            await respawner.ResetAsync(conn);
        }

        public async Task InitializeAsync()
        {
            await _dbContainer.StartAsync().ConfigureAwait(false);
            DbConnectionString = _dbContainer.GetConnectionString();
        }

        async Task IAsyncLifetime.DisposeAsync()
        {
            await _dbContainer.StopAsync();
            await _dbContainer.DisposeAsync();
        }

        private async Task<DbConnection> GetOpenedDbConnectionAsync()
        {
            var conn = _databaseFacade.GetDbConnection();
            if (conn.State != System.Data.ConnectionState.Open)
                await conn.OpenAsync();
            return conn;
        }
    }
}
