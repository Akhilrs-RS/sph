namespace Aura.Dropship.Api.Models.Entities;

public class Review
{
    public int Id { get; set; }
    public int ProductId { get; set; }
    public Product? Product { get; set; }
    public string AuthorName { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public int Rating { get; set; } = 5;
    public string Title { get; set; } = string.Empty;
    public string Comment { get; set; } = string.Empty;
    public int HelpfulVotes { get; set; } = 0;
    public bool IsVerifiedBuyer { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
