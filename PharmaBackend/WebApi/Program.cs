using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Application;
using Persistence;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

AddSwaggerDoc(builder.Services);

// Add services to the container.
builder.Services.AddApplicationServices();
builder.Services.AddInfrastructureService(builder.Configuration);
builder.Services.AddPersistanceService(builder.Configuration);

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();



// Configuration
var app = builder.Build();

// app.UseCors(options =>
// {
//     options
//         .WithOrigins("http://localhost:5173")
//         .AllowAnyOrigin()
//         .AllowAnyMethod()
//         .AllowAnyHeader();
// });

app.UseCors("AllowOrigin");
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthentication(); 
app.UseAuthorization();
app.UseHttpsRedirection();
app.MapControllers();

app.Run();


void AddSwaggerDoc(IServiceCollection services) 
{ 
    services.AddCors(options =>
    {
        options.AddPolicy("AllowOrigin",
            builder => builder.WithOrigins("http://localhost:5173")
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials());
    });
    services.AddSwaggerGen(c => 
    { 
        c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
        { 
            Description = @"JWT Authorization header using the Bearer scheme.  
                      Enter 'Bearer' [space] and then your token in the text input below. 
                      Example: 'Bearer 12345abcdef'", 
            Name = "Authorization", 
            In = ParameterLocation.Header, 
            Type = SecuritySchemeType.ApiKey, 
            Scheme = "Bearer" 
        }); 
 
        c.AddSecurityRequirement(new OpenApiSecurityRequirement() 
        { 
            { 
                new OpenApiSecurityScheme 
                { 
                    Reference = new OpenApiReference 
                    { 
                        Type = ReferenceType.SecurityScheme, 
                        Id = "Bearer" 
                    }, 
                    Scheme = "oauth2", 
                    Name = "Bearer", 
                    In = ParameterLocation.Header, 
 
                }, 
                new List<string>() 
            } 
        }); 
 
        c.SwaggerDoc("v1", new OpenApiInfo 
        { 
            Version = "v1", 
            Title = "ONE APP Api", 
 
        }); 
 
    }); 
}
