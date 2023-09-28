using System.ComponentModel.DataAnnotations;
using Domain.Entites;

namespace Application.Model;


public class PharmacyAuthRequest : AuthRequest{

    [Required(ErrorMessage = "Name Is Required")]
    public string Name { set; get; }

    [Required(ErrorMessage = "Address Is Required")]
    public Location Address { set; get; }

    [Required(ErrorMessage = "PhoneNumbers Is Required")]
    public List<string> PhoneNumbers { set; get; }

    [Required(ErrorMessage = "Emails Is Required")] 
    public List<string> Emails { set; get; }

}