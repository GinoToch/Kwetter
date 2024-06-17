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

namespace KwetterIntegrationTestsUsers
{
    public class RegisterTest : IntegrationTest
    {
        public RegisterTest(WebAppFactory webAppFactory) : base(webAppFactory) { }

        [Fact]
        public async Task Register_ReturnsOk_WhenUsernameAndPasswordAreValid_Test()
        {
            var registerDto = new UserAuthenticationDTO
            {
                UserName = "testuser",
                Password = "Test@1234"
            };

            // Act: Register user
            var registerResponse = await HttpClient.PostAsJsonAsync("/Authentication/register", registerDto);
            registerResponse.EnsureSuccessStatusCode();
            var registeredUser = await registerResponse.Content.ReadAsStringAsync();

            // Assert: Register
            registeredUser.Should().Be("testuser");
            Db.Users.Count().Should().Be(1);
        }
        
        [Fact]
        public async Task Register_ReturnsUnauthorized_WhenUsernameAndPasswordAreUsed_Test()
        {
            var registerDto = new UserAuthenticationDTO
            {
                UserName = "testuser",
                Password = "Test@1234"
            };

            // Act: Attempt to register the same user again
            var registerResponse1 = await HttpClient.PostAsJsonAsync("/Authentication/register", registerDto);
            var registerResponse2 = await HttpClient.PostAsJsonAsync("/Authentication/register", registerDto);

            // Assert: Check for Unauthorized response
            registerResponse2.StatusCode.Should().Be(HttpStatusCode.Unauthorized);
            var errorResponse = await registerResponse2.Content.ReadFromJsonAsync<object>();
            errorResponse.Should().NotBeNull();
        }
    }
}
