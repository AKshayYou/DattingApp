using API.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<DataContext>(m =>
{
    m.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddCors();

var app = builder.Build();

//configure the HTTP request pipeline.
app.UseCors(m => m.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200/", "https://localhost:4200/"));

app.MapControllers();

app.Run();
