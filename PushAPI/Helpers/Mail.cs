using Microsoft.Extensions.Options;
using PushAPI.Models.Push;
using System.Net.Mail;

namespace PushAPI.Helpers
{
    public class Mail
    {

        private static readonly AppSettings _appSettings;
		private static string mailServer;
		private static int mailPort;
		private static string mailFrom;
		

        static Mail()
        {
            var config = new ConfigurationBuilder()
                            .AddJsonFile("appsettings.json", optional: false)
                            .Build();
            mailServer = config.GetValue<string>("AppSettings:MailServer");
			mailPort = config.GetValue<int>("AppSettings:MailPort");
			mailFrom = config.GetValue<string>("AppSettings:mailFrom");
        }

        public static async Task<bool> MailSentAsync(Solicitacao sol, string to = "", string cc = "", string bcc = "", string from = "")
        {
            to = to.Trim() == "" ? $"{sol.Matricula_Cadastramento}@corp.caixa.gov.br" : to;
            bcc = bcc.Trim() == "" ? $"gecdi02@caixa.gov.br" : bcc;

            string subject = $"[GECDI/PUSH] Inclusão/Alteração de Solicitação de PUSH {sol.idSolicitacao_PUSH} - {sol.Nome_Solicitacao}";
            string body = $@"
<STYLE>
    BODY { "{font: Arial 12px} " }
</STYLE>
<P>Foi alterado no sistema a solicitação de PUSH abaixo:<BR><BR></P>
<P>ID Solicitação: <B>{sol.idSolicitacao_PUSH}</></P>
<P>Data Criação: <B>{(sol.Data_Cadastramento ?? DateTime.Now).ToString("dd/MMM/yyyy")}</></P>
<P>REQ / WF: <B>{sol.REQ_WO_Aprovacao_Mensagem} / {sol.WF_GECRM}</></P>
<P>App / Canal: {sol.Canal} / <B>{sol.Mensagem}</B></P>
<P>ID Mensagem / Mensagem: {sol.idEnvio_Mensagem} / <B>{sol.Mensagem}</B></P>
<P>Quantidade Prevista / Carregada: <B>{sol.Quantidade_Total}</B></P>
<P>Enviar entre: <B>{(sol.Enviar_a_partir_de ?? DateTime.Now).ToString("dd/MMM/yyyy")} - {(sol.Enviar_no_maximo_ate ?? DateTime.Now).ToString("dd/MMM/yyyy")} / {((sol.Enviar_DOM ?? false) ? "DOM" : "")} {((sol.Enviar_SEG ?? false) ? "SEG" : "")} {((sol.Enviar_TER ?? false) ? "TER" : "")} {((sol.Enviar_QUA ?? false) ? "QUA" : "")} {((sol.Enviar_QUI ?? false) ? "QUI" : "")} {((sol.Enviar_SEX ?? false) ? "SEX" : "")} {((sol.Enviar_SAB ?? false) ? "SAB" : "")}  </B></P>
<P>Horario de envio: <B>{sol.Enviar_Horario_InicialFormatado} - {sol.Enviar_Horario_FinalFormatado}</B></P>
<P>Impactos Previstos: <B>{sol.Impactos_Previstos}</B></P>
<P>Observacoes: <B>{sol.Observacoes}</B></P>
";
            return await MailSentAsync(to, subject, body, cc, bcc, from);

        }

        public async static Task<bool> MailSentAsync(string to, string subject, string body, string cc = "", string bcc ="", string from = "")
        {
            from = from.Trim() == "" ? mailFrom :"GECDI02 - PUSH <gecdi02@caixa.gov.br>";
            MailMessage message = new MailMessage(from, to);
            message.Subject = subject;
            message.IsBodyHtml = true;
            message.Body = body;

            if (cc.Trim() != "")
                cc.Split(new char[]{',',';' }).ToList().ForEach(icc => message.CC.Add(icc));

            if (bcc.Trim() != "")
                bcc.Split(new char[] { ',', ';' }).ToList().ForEach(ibcc => message.Bcc.Add(ibcc));
            

            SmtpClient client = new SmtpClient(mailServer, mailPort);
            client.UseDefaultCredentials = true;
            //client.Credentials = new NetworkCredential("c051431", "Mayara02");

            try
            {
                await client.SendMailAsync(message);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught in CreateTestMessage2(): {0}", ex.ToString());
                //throw ex;
                return false;
            }

            return true;
        }


    }
}
