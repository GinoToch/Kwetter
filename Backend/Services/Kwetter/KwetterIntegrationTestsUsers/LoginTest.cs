using System.Net;
using System.Net.Http.Json;
using System.Text.Json;
using System.Threading.Tasks;
using FluentAssertions;
using Users.api.DTO;
using Xunit;
using KwetterIntegrationTestsUsers.Setup;
using Microsoft.AspNetCore.Mvc;
using Renci.SshNet.Security.Cryptography;
using Users.api.Entities;

namespace KwetterIntegrationTestsUsers;

public class LoginTest : IntegrationTest
{
    public LoginTest(WebAppFactory webAppFactory) : base(webAppFactory) { }

        [Fact]
        public async Task RegisterAndLogin_ReturnsOkWithToken_WhenValidCredentials_Test()
        {
            // Arrange: Register a user
            var registerDto = new UserAuthenticationDTO
            {
                UserName = "testuser",
                Password = "Test@1234"
            };
            var registerResponse = await HttpClient.PostAsJsonAsync("/Authentication/register", registerDto);
            registerResponse.EnsureSuccessStatusCode();

            // Act: Login with registered user
            var loginDto = new UserAuthenticationDTO
            {
                UserName = "testuser",
                Password = "Test@1234"
            };
            var loginResponse = await HttpClient.PostAsJsonAsync("/Authentication/login", loginDto);
            loginResponse.EnsureSuccessStatusCode();
            var loginResult = await loginResponse.Content.ReadFromJsonAsync<object>();

            // Assert: Check for token in response
            loginResult.Should().NotBeNull();
        }

        [Fact]
        public async Task Login_ReturnsUnauthorized_WhenUserDoesNotExist_Test()
        {
            // Arrange: Prepare login request for non-existent user
            var loginDto = new UserAuthenticationDTO
            {
                UserName = "nonexistentuser",
                Password = "SomePassword123"
            };

            // Act: Attempt to log in with non-existent user
            var loginResponse = await HttpClient.PostAsJsonAsync("/Authentication/login", loginDto);

            // Assert: Check for Unauthorized response
            loginResponse.StatusCode.Should().Be(HttpStatusCode.Unauthorized);
            var errorResponse = await loginResponse.Content.ReadFromJsonAsync<object>();
            errorResponse.Should().NotBeNull();
        }
}