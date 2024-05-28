namespace Contracts
{
    public record UserCreatedEvent
    {
        public Guid id { get; set; }
        public string UserName { get; set; }
    }
}
