using System.Data;
using System.Data.SqlClient;

namespace PushAPI.Helpers
{
    public class ExecuteSQLForWeb
    {
        public static async Task ExecuteSQL(HttpResponse response, string connectionString, string sql)
        {
            response.Headers.Add("Content-Type", "text/event-stream");
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                await connection.OpenAsync();
                connection.InfoMessage += async (object sender, SqlInfoMessageEventArgs args) =>
                {
                    Console.WriteLine("{0}", args.Message);
                    await response.WriteAsync(args.Message);
                    await response.Body.FlushAsync();
                };

                connection.StateChange += async (object sender, StateChangeEventArgs args) =>
                {
                    Console.WriteLine("{0}", args.CurrentState.ToString());
                    await response.WriteAsync(args.CurrentState.ToString());
                    await response.Body.FlushAsync();
                };

                using (SqlCommand command = new SqlCommand(sql, connection))
                {
                    command.StatementCompleted += (object sender, StatementCompletedEventArgs args) => Console.WriteLine("({0} row(s) affected)", args.RecordCount); ;
                    await command.ExecuteNonQueryAsync();
                }
                await connection.CloseAsync();
            }

        }
    }
}
