using PushAPI.Helpers;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace PushAPI.Models.Push
{
    public partial class Usuario
    {
        [NotMapped]
        public Role Role { get {
                switch (this.iID_Perfil)
                {
                    case 1:
                        return Role.Admin;
                        break;

                    case 4:
                        return Role.Transmissor;
                        break;

                    case 5:
                        return Role.GestorTI;
                        break;

                    default:
                        return Role.User;
                        break;

                }
            }  
        }
    }
}
