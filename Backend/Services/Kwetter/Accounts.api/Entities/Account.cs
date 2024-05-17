namespace Accounts.api.Entities
{
    public class Account
    {
        public Guid Id { get; set; }
        public string UserName { get; set; }
        public int? Followers { get; set; }
        public string? Description { get; set; }
    }
}
