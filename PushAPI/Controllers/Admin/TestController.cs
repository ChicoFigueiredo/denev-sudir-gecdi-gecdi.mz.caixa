using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
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


    }
}