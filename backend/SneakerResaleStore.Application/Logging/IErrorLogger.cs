using System;

namespace SneakerResaleStore.Application.Logging.ErrorLogging
{
    public interface IErrorLogger
    {
        void Log(AppError error);
    }

    public class AppError
    {
        public Exception Exception { get; set; }
        public string UserEmail { get; set; }
        public Guid ErrorId { get; set; }
    }
}
