using SneakerResaleStore.Application.Logging.ErrorLogging;
using System;
using System.Text;

namespace SneakerResaleStore.API.ErrorLogging
{
    public class ConsoleErrorLogger : IErrorLogger
    {
        public void Log(AppError error)
        {
            var erTime = DateTime.UtcNow;
            StringBuilder builder = new StringBuilder();
            builder.AppendLine("Error code: " + error.ErrorId.ToString());
            builder.AppendLine("User email: " + error.UserEmail != null ? error.UserEmail : "/");
            builder.AppendLine("Error time: " + erTime.ToLongDateString());
            builder.AppendLine("Exception message: " + error.Exception.Message);
            builder.AppendLine("Exception stack trace: \n" + error.Exception.StackTrace);

            Console.WriteLine(builder.ToString());
        }
    }
}
