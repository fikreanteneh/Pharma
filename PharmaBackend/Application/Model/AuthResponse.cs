namespace Application.Model;

public class AuthResponse{
    public int Id { get; set; }
    public string  AuthId{ get; set; }
    public string Email { get; set; }
    public string Role { get; set; }
    public string Token { get; set; }
}