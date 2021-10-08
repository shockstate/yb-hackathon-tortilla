using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tortilla.Hackathon.Data.Repositories
{
    using System.Collections.Generic;
    namespace GR.Data
    {
        public interface IBaseRepository<T>
        {
            IEnumerable<T> GetAll();
            T Get(Guid id);
            void Insert(T entity);
            void Update(T entity);
            void Delete(T entity);
        }
    }
}