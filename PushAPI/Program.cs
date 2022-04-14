using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using PushAPI.Helpers;
using PushAPI.Models.Atendimento;
using PushAPI.Models.Push;
using PushAPI.Models.Sites;
using PushAPI.Services;
using Swashbuckle.AspNetCore;
using System.Configuration;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers().AddJsonOptions(x => x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(setup =>
{
    // Include 'SecurityScheme' to use JWT Authentication
    var jwtSecurityScheme = new  OpenApiSecurityScheme
    {
        Scheme = "bearer",
        BearerFormat = "JWT",
        Name = "JWT Authentication",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Description = "Put **_ONLY_** your JWT Bearer token on textbox below!",

        Reference = new OpenApiReference
        {
            Id = "jwt_auth", //JwtBearerDefaults.AuthenticationScheme, 
            Type = ReferenceType.SecurityScheme
        }
    };

    setup.AddSecurityDefinition(jwtSecurityScheme.Reference.Id, jwtSecurityScheme);

    setup.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        { jwtSecurityScheme, Array.Empty<string>() }
    });

});

// configure strongly typed settings object
builder.Services.Configure<AppSettings>(builder.Configuration.GetSection("AppSettings"));
builder.Services.AddDbContext<dbSites>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("WebApiDBSites")));
builder.Services.AddDbContext<dbPUSH>(options => options.UseSqlServer(
        builder.Configuration.GetConnectionString("WebApiDBPUSH"),
        sql => sql.CommandTimeout(60 * 60 * 5)
));
builder.Services.AddDbContext<dbAtendimento>(options => options.UseSqlServer(
        builder.Configuration.GetConnectionString("WebApiDBAtendimento"),
        sql => sql.CommandTimeout(60 * 60 * 5)
)); 

// configure DI for application services
builder.Services.AddScoped<IUserService, UserService>();

var app = builder.Build();

DefaultFilesOptions options = new DefaultFilesOptions();
options.DefaultFileNames.Clear();
options.DefaultFileNames.Add("index.html");
app.UseDefaultFiles(options);
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseMiddleware<OptionsMiddleware>();

// global cors policy
app.UseCors(x => x
    .WithMethods("OPTIONS","GET","PUT","DELETE","POST", "HEAD", "TRACE", "PATCH")
    .AllowAnyOrigin()
    .AllowAnyHeader()
    );


// custom jwt auth middleware
app.UseMiddleware<JwtMiddleware>();

app.MapControllers();


app.Run();
