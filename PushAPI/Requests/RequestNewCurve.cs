namespace PushAPI.Requests
{
    public class RequestNewCurve
    {
        public string Apelido { get; set; }
        public string Nome { get; set; }
        public int Quantidade { get; set;}
        public int QuantidadeBaixa { get; set; }
        public string HorarioDe { get; set; }
        public string HorarioAte { get; set; }
        public string HorarioBaixaDe { get; set; }
        public string HorarioBaixaAte { get; set; }
    }
}
