FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy the project files
COPY ["./Accounts.api/Accounts.api.csproj", "Accounts.api/"]
COPY ["./Contracts/Contracts.csproj", "Contracts/"]

# Restore dependencies
RUN dotnet restore "Contracts/Contracts.csproj"
RUN dotnet restore "Accounts.api/Accounts.api.csproj"

# Copy the rest of the files
COPY . .

# Build the application
RUN dotnet build "Accounts.api/Accounts.api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Accounts.api/Accounts.api.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Accounts.api.dll"]
