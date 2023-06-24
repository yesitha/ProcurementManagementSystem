using Microsoft.EntityFrameworkCore;
using PWMSBackend.Data;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Http.Json;
using PWMSBackend.CustomIdGenerator;
using Microsoft.Extensions.FileProviders;

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
builder.Services.AddScoped<FmppIdGenerator>();
builder.Services.AddScoped<GRNIdGenerator>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(app.Environment.ContentRootPath, "Uploads/Evidence_of_authorization")),
    RequestPath = "/Uploads/Evidence_of_authorization"
});

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(app.Environment.ContentRootPath, "Uploads/Vendor_Required_Docs/Agreement")),
    RequestPath = "/Uploads/Vendor_Required_Docs/Agreement"
});

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(app.Environment.ContentRootPath, "Uploads/Vendor_Required_Docs/Bond")),
    RequestPath = "/Uploads/Vendor_Required_Docs/Bond"
});

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(app.Environment.ContentRootPath, "Uploads/Vendor_Required_Docs/BankGuarantee")),
    RequestPath = "/Uploads/Vendor_Required_Docs/BankGuarantee"
});
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(app.Environment.ContentRootPath, "Uploads/Vendor_Required_Docs/BusinessRegistration")),
    RequestPath = "/Uploads/Vendor_Required_Docs/BusinessRegistration"
});
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(app.Environment.ContentRootPath, "Uploads/Vendor_Required_Docs/InsuranceCertificate")),
    RequestPath = "/Uploads/Vendor_Required_Docs/InsuranceCertificate"
});
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(app.Environment.ContentRootPath, "Uploads/Vendor_Required_Docs/OtherDocuments")),
    RequestPath = "/Uploads/Vendor_Required_Docs/OtherDocuments"
});

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(app.Environment.ContentRootPath, "Uploads/Letter_of_Acceptence")),
    RequestPath = "/Uploads/Letter_of_Acceptence"
});



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