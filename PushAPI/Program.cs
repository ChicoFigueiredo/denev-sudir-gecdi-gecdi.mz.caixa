using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Mvc.Infrastructure;
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

builder.Services.Configure<ApiBehaviorOptions>(options =>
{
    options.InvalidModelStateResponseFactory =
        AllowingServerSideValidationToBeDisabledInvalidModelStateResponseFactoryHelper.InvalidModelStateResponseFactory;
});

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


// Code taken from https://github.com/dotnet/aspnetcore/blob/5747cb36f2040d12e75c4b5b3f49580ef7aac5fa/src/Mvc/Mvc.Core/src/DependencyInjection/ApiBehaviorOptionsSetup.cs#L23
// and is modified to optionally disable validation for controller action methods decorated with OptionalValidationAttribute
public static class AllowingServerSideValidationToBeDisabledInvalidModelStateResponseFactoryHelper
{
    public static Func<ActionContext, IActionResult> InvalidModelStateResponseFactory => actionContext =>
    {
        var shouldEnableDataValidationarameterName = ((OptionalValidationAttribute)((ControllerActionDescriptor)actionContext.ActionDescriptor)
            .MethodInfo.GetCustomAttributes(typeof(OptionalValidationAttribute), true)
            .SingleOrDefault())?.ShouldEnableDataValidationParameterName;

        var isValidationEnabled = false; // true habilita a validação de modelos

        if (shouldEnableDataValidationarameterName != null)
        {
            var httpContextRequest = actionContext.HttpContext.Request;
            var shouldEnableDataValidationValue = httpContextRequest.Form[shouldEnableDataValidationarameterName]
                .Union(httpContextRequest.Query[shouldEnableDataValidationarameterName]).FirstOrDefault();
            isValidationEnabled = shouldEnableDataValidationValue?.ToLower() == bool.TrueString.ToLower();
        }

        if (!isValidationEnabled)
        {
            return null;
        }

        var problemDetailsFactory = actionContext.HttpContext.RequestServices.GetRequiredService<ProblemDetailsFactory>();
        var problemDetails = problemDetailsFactory.CreateValidationProblemDetails(actionContext.HttpContext, actionContext.ModelState);
        ObjectResult result;
        if (problemDetails.Status == 400)
        {
            // For compatibility with 2.x, continue producing BadRequestObjectResult instances if the status code is 400.
            result = new BadRequestObjectResult(problemDetails);
        }
        else
        {
            result = new ObjectResult(problemDetails)
            {
                StatusCode = problemDetails.Status,
            };
        }
        result.ContentTypes.Add("application/problem+json");
        result.ContentTypes.Add("application/problem+xml");

        return result;
    };
}

[AttributeUsage(AttributeTargets.Method)]
public class OptionalValidationAttribute : Attribute
{
    public OptionalValidationAttribute(string shouldEnableDataValidationParameterName)
    {
        ShouldEnableDataValidationParameterName = shouldEnableDataValidationParameterName;
    }

    public string ShouldEnableDataValidationParameterName { get; }
}