global using Microsoft.EntityFrameworkCore;
using Tweets.api.Data;
using Tweets.api.Extensions;
using Tweets.api.Interfaces;
using Tweets.api.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddScoped<IFeedService, FeedService>();

// Add services to the container.

builder.Services.AddCors(o => o.AddPolicy("default", builder =>
{
    builder.AllowAnyOrigin()
           .AllowAnyMethod()
           .AllowAnyHeader();
}));

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<DataContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("Database"));
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    //app.ApplyMigrations();
}

//app.UseHttpsRedirection();



app.UseAuthorization();
app.UseCors("default");
app.MapControllers();

app.Run();
