using System.ComponentModel.DataAnnotations;

namespace Application.Model;

public class ChangePasswordDTO{
    [Required(ErrorMessage = "Old Password Is Required")]
    public string OldPassword { get; set; }
    [Required(ErrorMessage = "New Password Is Required")]
    public string NewPassword { get; set; }
    [Required(ErrorMessage = "You are not Autorized to change this password")]
    public string Token{ get; set; }
}