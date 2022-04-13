namespace PushAPI.Models.Push
{
    public partial class spVerifica_Status_Fila
    {
        public int ID { get; set; }
        public long WF { get; set; }
        public DateTime Data { get; set; }
        public string Nome { get; set; }
        public byte Prioridade { get; set; }
        public int IDM { get; set; }
        public string Mensagem { get; set; }
        public string Canal { get; set; }
        public int CN { get; set; }
        public int CR { get; set; }
        public int Total { get; set; }
        public int Enviada { get; set; }
        public int Agendado { get; set; }
        public int Fila { get; set; }
        public bool Cancelado { get; set; }
        public bool Finalizado { get; set; }

    }
}
