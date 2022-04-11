using PushAPI.Models.Atendimento;
using PushAPI.Models.Sites;
using System.DirectoryServices;

namespace PushAPI.Responses
{
    public class AuthenticateResponse
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Photo { get; set; }
        public string Username { get; set; }
        public string token { get; set; }
        public Usuario User { get; set; }
        public string CodFuncao { get; set; }
        public string Funcao { get; set; }
        public string LotacaoFisica { get; set; }
        public string LotacaoSigla { get; set; }
        public string LotacaoNome { get; set; }
        public string LotacaoTipo { get; set; }
        public string ApelidoAtendente { get; set; }


        public AuthenticateResponse(Usuario _Usuario, string _token, DirectoryEntry xDE, SearchResult UserData, Atendentes at)
        {
            Id = _Usuario.idUsuario;
            Username = _Usuario.cUsuario;
            Name = UserData.Properties.Contains("no-usuario") ? (String)UserData.Properties["no-usuario"][0] : "";
            CodFuncao = UserData.Properties.Contains("nu-funcao") ? UserData.Properties["nu-funcao"][0].ToString() : "";
            Funcao = UserData.Properties.Contains("no-funcao") ? (String)(UserData.Properties["no-funcao"][0]).ToString() : "";
            LotacaoFisica = UserData.Properties.Contains("nu-lotacaofisica") ? UserData.Properties["nu-lotacaofisica"][0].ToString() : "0";
            LotacaoSigla = UserData.Properties.Contains("sg-unidade") ? (String)UserData.Properties["sg-unidade"][0].ToString() : "" ;
            LotacaoNome = UserData.Properties.Contains("no-lotacaofisica") ? (String)UserData.Properties["no-lotacaofisica"][0].ToString() : "";
            LotacaoTipo = UserData.Properties.Contains("nu-tp-unidade") ? UserData.Properties["nu-tp-unidade"][0].ToString() : "0";
            ApelidoAtendente = at?.vApelidoAtendente ?? "";
            token = _token;
            User = _Usuario;
            if (xDE.Properties["thumbnailPhoto"] != null)
                Photo = "data:image/png;base64," + Convert.ToBase64String((byte[])xDE.Properties["thumbnailPhoto"].Value);

        }
    }
 }
/*
 
                                new Claim("idUser", Usuario.idUsuario.ToString()),
                                new Claim("Matricula", Usuario.cUsuario.ToString().ToUpper()),
                                new Claim("Role", Usuario.idRoleNavigation.Role.ToString()),
                                new Claim("Nome", UserData.Properties.Contains("no-usuario") ? (String)UserData.Properties["no-usuario"][0] : ""),
                                new Claim("CodFuncao", UserData.Properties.Contains("nu-funcao") ? UserData.Properties["nu-funcao"][0].ToString() : ""),
                                new Claim("Funcao",  UserData.Properties.Contains("no-funcao") ? (String)(UserData.Properties["no-funcao"][0]).ToString() : ""),
                                new Claim("LotacaoFisica", UserData.Properties.Contains("nu-lotacaofisica") ? UserData.Properties["nu-lotacaofisica"][0].ToString() : "0" ),
                                new Claim("LotacaoSigla", UserData.Properties.Contains("sg-unidade") ? (String)UserData.Properties["sg-unidade"][0].ToString() : "" ),
                                new Claim("LotacaoTipo", UserData.Properties.Contains("nu-tp-unidade") ? UserData.Properties["nu-tp-unidade"][0].ToString() : "0" ),
 */