using PushAPI.Helpers;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace PushAPI.Models.Sites
{
    public partial class Usuario
    {
        [NotMapped]
        public Role Role { get {
                switch (this.idRole)
                {
                    case 1:
                        return Role.Admin;

                    case 2:
                        return Role.GECDI;

                    case 3:
                        return Role.Transmissor;

                    case 4:
                        return Role.GestorTI;

                    case 5:
                        return Role.Solicitante;

                    default:
                        return Role.User;

                }
            }  
        }
    }
}
