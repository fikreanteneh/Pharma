using System.ComponentModel.DataAnnotations;

namespace Application.Model;


public class AdminAuthRequest  : AuthRequest{


    [Required(ErrorMessage = "Name Is Required")]
    public string Name { set; get; }

}