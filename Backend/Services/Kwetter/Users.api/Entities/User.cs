namespace Users.api.Entities
{
    public class User
    {
        public Guid Id{ get; set; }
        public string UserName { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }

        public string RefreshToken { get; set; }
    }
}
