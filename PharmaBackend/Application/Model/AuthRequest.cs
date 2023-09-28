using System.ComponentModel.DataAnnotations;

namespace Application.Model;

public class AuthRequest{
    [Required(ErrorMessage = "Email Is Required")]
    public string Email{get;set;}
    [Required(ErrorMessage = "Password Is Required")]
    public string Password {get;set;}
}