// See https://aka.ms/new-console-template for more information
using System.IO.Compression;

Console.WriteLine("Hello, World!");

char[] separators = { '\u0009', ',', ';', '|' };
string cpf = "";
string v1 = "";
string v2 = "";
string v3 = "";
string v4 = "";
string v5 = "";
int linhas = 0;
int validos = 0;
int rejeitados = 0;


string zipPath = @"\\arquivos.caixa\br\df5325fs201\SUESC\Publico\!PUSH_Upload\upload_id000000000001_teste-carga-full.zip";

if (File.Exists(zipPath))
{
    try
    {
        using (ZipArchive archive = ZipFile.OpenRead(zipPath))
        {
            ZipArchiveEntry entry = archive.Entries.First();
            using (var stream = new StreamReader(entry.Open()))
            {
                while (!stream.EndOfStream)
                {
                    try
                    {
                        string linha = stream.ReadLine().Trim();
                        linhas++;
                        if (linha != "")
                        {
                            string[] colunas = linha.Split(separators);
                            if (colunas.Length >= 1)
                            {
                                cpf = colunas[0];
                                if (IsCpf(cpf))
                                {
                                    if (colunas.Length >= 2)
                                        v1 = colunas[1];
                                    else
                                        v1 = "-";

                                    if (colunas.Length >= 3)
                                        v2 = colunas[2];
                                    else
                                        v2 = "-";

                                    if (colunas.Length >= 4)
                                        v3 = colunas[3];
                                    else
                                        v3 = "-";

                                    if (colunas.Length >= 5)
                                        v4 = colunas[4];
                                    else
                                        v4 = "-";

                                    if (colunas.Length >= 6)
                                        v5 = colunas[5];
                                    else
                                        v5 = "-";
                                    validos++;
                                    Console.WriteLine($"{cpf} | {v1} | {v2} | {v3} | {v4} | {v5}");
                                }
                                else
                                    rejeitados++;
                            }
                            else rejeitados++;
                        }
                        else rejeitados++;
                    }
                    catch (Exception ex2)
                    {
                        rejeitados++;
                    }
                }
            }
        }
    }
    catch (Exception ex)
    {
        throw ex;
    }
}
else
{
    throw new Exception("mierda");
}

Console.WriteLine($"\n\nTermino: {linhas.ToString("#,##0")} linhas lidas | {validos.ToString("#,##0")} linhas válidas | {rejeitados.ToString("#,##0")} linhas rejeitadas");


static bool IsValid(string cpfCnpj)
{
    return (IsCpf(cpfCnpj) || IsCnpj(cpfCnpj));
}

static bool IsCpf(string cpf)
{
    int[] multiplicador1 = new int[9] { 10, 9, 8, 7, 6, 5, 4, 3, 2 };
    int[] multiplicador2 = new int[10] { 11, 10, 9, 8, 7, 6, 5, 4, 3, 2 };

    cpf = cpf.Trim().Replace(".", "").Replace("-", "");
    cpf = $"00000000000{cpf}";
    cpf = cpf.Substring(cpf.Length - 11,11);
    if (cpf.Length != 11)
        return false;

    for (int j = 0; j < 10; j++)
        if (j.ToString().PadLeft(11, char.Parse(j.ToString())) == cpf)
            return false;

    string tempCpf = cpf.Substring(0, 9);
    int soma = 0;

    for (int i = 0; i < 9; i++)
        soma += int.Parse(tempCpf[i].ToString()) * multiplicador1[i];

    int resto = soma % 11;
    if (resto < 2)
        resto = 0;
    else
        resto = 11 - resto;

    string digito = resto.ToString();
    tempCpf = tempCpf + digito;
    soma = 0;
    for (int i = 0; i < 10; i++)
        soma += int.Parse(tempCpf[i].ToString()) * multiplicador2[i];

    resto = soma % 11;
    if (resto < 2)
        resto = 0;
    else
        resto = 11 - resto;

    digito = digito + resto.ToString();

    return cpf.EndsWith(digito);
}

static bool IsCnpj(string cnpj)
{
    int[] multiplicador1 = new int[12] { 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2 };
    int[] multiplicador2 = new int[13] { 6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2 };

    cnpj = cnpj.Trim().Replace(".", "").Replace("-", "").Replace("/", "");
    cnpj = $"00000000000000{cnpj}";
    cnpj = cnpj.Substring(cnpj.Length - 14, 14);
    if (cnpj.Length != 14)
        return false;

    string tempCnpj = cnpj.Substring(0, 12);
    int soma = 0;

    for (int i = 0; i < 12; i++)
        soma += int.Parse(tempCnpj[i].ToString()) * multiplicador1[i];

    int resto = (soma % 11);
    if (resto < 2)
        resto = 0;
    else
        resto = 11 - resto;

    string digito = resto.ToString();
    tempCnpj = tempCnpj + digito;
    soma = 0;
    for (int i = 0; i < 13; i++)
        soma += int.Parse(tempCnpj[i].ToString()) * multiplicador2[i];

    resto = (soma % 11);
    if (resto < 2)
        resto = 0;
    else
        resto = 11 - resto;

    digito = digito + resto.ToString();

    return cnpj.EndsWith(digito);
}
    