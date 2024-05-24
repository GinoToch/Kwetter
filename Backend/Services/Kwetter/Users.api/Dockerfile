# Use the ASP.NET runtime image as the base image for the final stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

# Use the .NET SDK image for the build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy the project files and restore dependencies
COPY ["Users.api/Users.api.csproj", "Users.api/"]
COPY ["Contracts/Contracts.csproj", "Contracts/"]
RUN dotnet restore "Users.api/Users.api.csproj"

# Copy the remaining source code and build the project
COPY Users.api/. Users.api/
COPY Contracts/. Contracts/
WORKDIR /src/Users.api
RUN dotnet build -c Release -o /app/build

# Use the build stage to publish the app
FROM build AS publish
RUN dotnet publish "Users.api.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Use the base image to run the app
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Users.api.dll"]
