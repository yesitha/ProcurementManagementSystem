using Microsoft.EntityFrameworkCore;
using PWMSBackend.Data;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Http.Json;
using PWMSBackend.CustomIdGenerator;

var builder = WebApplication.CreateBuilder(args);

// Set the JSON serializer options
builder.Services.Configure<JsonOptions>(options =>
{
    options.SerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
});


// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddControllers().AddJsonOptions(x =>
                x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<DataContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DataContext"));
});

builder.Services.AddScoped<SppIdGenerator>();
builder.Services.AddScoped<MppIdGenerator>();
builder.Services.AddScoped<ItemIdGenerator>();
builder.Services.AddScoped<CommitteeIdGenerator>();
builder.Services.AddScoped<POIdGenerator>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Allow Cors
app.UseCors(option =>
    option.WithOrigins("http://localhost:3000")
    .AllowAnyMethod()
    .AllowAnyHeader()
);

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();