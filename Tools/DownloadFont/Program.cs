using System.Net;
using System.Text.RegularExpressions;

var url = args[0];

//Regex rx = new(@"(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])", RegexOptions.Multiline | RegexOptions.IgnoreCase );
Regex rx = new Regex(@"(?<Protocol>\w+):\/\/(?<Domain>[\w@][\w.:@]+)\/?[\w\.?=%&=\-@/$,]*");


// See https://aka.ms/new-console-template for more information
string contents;
using (var wc = new WebClient()){
    //wc.UseDefaultCredentials = true;
    WebProxy p = new WebProxy("internet.caixa", true);
    p.Credentials = new NetworkCredential("corpcaixa\\c051431", "Mayara02");
    WebRequest.DefaultWebProxy = p;
    wc.Headers.Add("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.63 Safari/537.36 Edg/102.0.1245.30");
    contents = wc.DownloadString(url);
    //Console.Write(contents);

    //var urls = Regex.Matches(contents,@"(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])", RegexOptions.Multiline | RegexOptions.IgnoreCase );
    var urls = rx.Matches(contents);
    var urls2 = rx.Match(contents);

    foreach (var u in urls)
    {
        var url_file = u.ToString();
        var final =  url_file.Split('/').Last();
        contents = contents.Replace(url_file,$"./{final}");
        Console.WriteLine($"{final} -> {url_file}");
        wc.DownloadFile(url_file,final);
    }

    File.WriteAllText("./font-Open.Sans.css",contents);

    
    Console.WriteLine("\n\n\n" + contents);

    // foreach (var u in urls2)
    // {
    //     var final =  u.ToString().Split('/').Last();
    //     Console.WriteLine($"{final} -> {u.ToString()}");
    //     
    // }


}