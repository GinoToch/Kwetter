namespace Contracts
{
    public record UserDeletedEvent
    {
        public Guid id { get; set; }
    }
}
