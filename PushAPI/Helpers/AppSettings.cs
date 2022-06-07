namespace PushAPI.Helpers
{
    public class AppSettings
    {
        public string Secret { get; set; }
        public string LDAP_User_Manager { get; set; }
        public string LDAP_Whois { get; set; }
        public string UploadDir { get; set; }
        public string UploadDir_Ant { get; set; }

        public string MailServer { get; set; }
        public int MailPort { get; set; }
        public string MailFrom { get; set; }
    }
}
