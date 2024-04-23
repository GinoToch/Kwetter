using Users.api.Entities;

namespace Users.api.Interfaces
{
    public interface IAuthenticationService
    {
        Task<string?> Login(string username, string password);
        Task<bool> Register(User user, string password);

    }
}
