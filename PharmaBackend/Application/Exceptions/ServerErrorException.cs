

namespace Application.Exceptions
{
    public class ServerErrorException : ApplicationException
    {
        public ServerErrorException(string message) : base(message)
        {
        }
    }
}
