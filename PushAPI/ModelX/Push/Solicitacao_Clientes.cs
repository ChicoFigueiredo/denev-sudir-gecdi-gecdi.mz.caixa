using System;
using System.Collections.Generic;

namespace PushAPI.Models.Push
{
    public partial class Solicitacao_Clientes
    {
        public string cpfFormatado { get { return CPF.ToString(@"000\.000\.000\-00"); }  }
        public string mensagemPreview { 
            get { 
                if (this.idSolicitacao_PUSHNavigation != null) {
                    return this.idSolicitacao_PUSHNavigation
                               .Mensagem
                               .Replace("{{Campo1}}",this.Campo1)
                               .Replace("{{Campo2}}",this.Campo2)
                               .Replace("{{Campo3}}",this.Campo3)
                               .Replace("{{Campo4}}",this.Campo4)
                               .Replace("{{Campo5}}",this.Campo5);
                }
                else 
                {
                    return "";
                }
            }  
        }

    }
}
