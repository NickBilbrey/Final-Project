using SmallTalk;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddScoped<SmalltalKContext>();

// Add Cors policy see line 34 as well
builder.Services.AddCors(
    options =>
    {
        options.AddPolicy(
            name: "AllowAny",
            builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()
            );
    }
    );

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseSwagger();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{ 
    app.UseSwaggerUI();
}

app.UseCors("AllowAny");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
