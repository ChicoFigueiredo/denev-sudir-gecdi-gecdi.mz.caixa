using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Net.NetworkInformation;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PushAPI.Helpers;

namespace gecdi.mz.caixa.Controllers.Admin
{
    [Route("api/[controller]")]
    [Authorize(Role.Admin)]
    public class TestController : Controller
    {

        // GET: api/Test

        [HttpGet("api/test")]
        public String[] Get(string id = "login.caixa.gov.br", int tentativas = 6)
        {
            Ping p = new Ping();
            PingReply r;
            String[] res = new String[tentativas];

            for (int i = 0; i < tentativas; i++)
            {
                try
                {
                    r = p.Send(id);
                    if (r.Status == IPStatus.Success)
                    {
                        res[i] = "Ping to " + id + "[" + r.Address.ToString() + "]" + " Successful! Response delay = " + r.RoundtripTime.ToString() + " ms \n";
                    }
                    else
                    {
                        res[i] = "Ping to " + id + "[" + (r.Address is null ? "" : r.Address.ToString()) + "]" + " Error! " + r.Status.ToString();
                    }
                }
                catch (Exception e)
                {
                    res[i] = "Ping to " + id + " Fatal Error! " + e.Message;
                }

            }

            return res;
        }

        // GET: api/Test
        [HttpGet("api/testport")]
        public String[] GetPort(string id = "login.caixa.gov.br", int tentativas = 3, string protocolo = "https")
        {
            string url = !id.Contains(protocolo) ? protocolo + "://" + id : id;
            String[] res = new String[tentativas];

            for (int i = 0; i < tentativas; i++)
            {
                try
                {
                    var httpWebRequest = (HttpWebRequest)WebRequest.Create(url);
                    //httpWebRequest.ContentType = "application/json";
                    httpWebRequest.Accept = "*/*";
                    httpWebRequest.Method = "GET";
                    //httpWebRequest.Headers.Add("Authorization", "Basic reallylongstring");

                    HttpWebResponse httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();

                    using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
                    {
                        res[i] = "Response from " + url + "[ " + streamReader.ReadToEnd() + " ] ";
                    }
                }
                catch (Exception e)
                {
                    res[i] = "Response from " + url + " Fatal Error! " + e.Message;
                }
            }
            return res;
        }

        // GET: api/Test
        [HttpGet("api/send-mail")]
        public async Task<ActionResult<string>>  GetSendMail(string de = "gecdi02@caixa.gov.br", string destino = "c051431@corp.caixa.gov.br", string subject = "Teste", string body = "Teste")
        {

            string from = de;
            string to = destino;
            MailMessage message = new MailMessage(from, to);
            message.Subject = subject;
            //message.IsBodyHtml = true;
            message.Body = @"Using this new feature, you can send an email message from an application very easily.";
            SmtpClient client = new SmtpClient("sistemas.correiolivre.caixa",25);
            // Credentials are necessary if the server requires the client
            // to authenticate before it will send email on the client's behalf.
            client.UseDefaultCredentials = true;
            //client.Credentials = new NetworkCredential("c051431", "Mayara02");

            try
            {
                client.Send(message);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught in CreateTestMessage2(): {0}",
                    ex.ToString());
                throw ex;
            }

            return Ok("Teste");
        }




    }
}