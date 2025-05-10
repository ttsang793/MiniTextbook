using System.Text.Json.Serialization;
using Core.Interface;
using Infrastructure.Repository;
using Infrastructure.Database;
using Application.Interface;
using Application.Service;

var builder = WebApplication.CreateBuilder(args);
// Add services to the container.
builder.Services.RegisterDb(builder.Configuration);
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<IService, Service>();
builder.Services.AddScoped<IVnPayService, VnPayService>();
builder.Services.AddControllers().AddJsonOptions(x =>
    x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
    options.AddPolicy("AllowVnPay", policy =>
    {
        policy.WithOrigins("https://localhost:5173").AllowAnyHeader().AllowAnyMethod();
    }
));
builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(30);
    options.Cookie.HttpOnly = true;
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
});

var app = builder.Build();

app.UseCors("AllowVnPay");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseSession();

app.Run();