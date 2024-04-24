using Microsoft.Extensions.Logging.Abstractions;
using Newtonsoft.Json;
using SneakerResaleStore.Application.Logging;
using SneakerResaleStore.DataAccess;
using SneakerResaleStore.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SneakerResaleStore.Implementation.Logging
{
    public class EfUseCaseLogger : IUseCaseLogger
    {
        private readonly SneakerResaleStoreContext _context;

        public EfUseCaseLogger(SneakerResaleStoreContext context)
        {
            _context = context;
        }

        public void Add(UseCaseLogEntry entry)
        {
            _context.LogEntries.Add(new LogEntry
            {
                Actor = entry.Actor,
                ActorId = entry.ActorId,
                UseCaseData = JsonConvert.SerializeObject(entry.Data),
                UseCaseName = entry.UseCaseName,
                CreatedAt = DateTime.UtcNow
            });

            _context.SaveChanges();           
        }
    }
}
