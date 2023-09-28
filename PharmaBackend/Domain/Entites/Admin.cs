

using Domain.Common;

namespace Domain.Entites;
public class Admin : BaseEntity
{
    public string AuthId { get; set; }
    public string Name { get; set; }
}
