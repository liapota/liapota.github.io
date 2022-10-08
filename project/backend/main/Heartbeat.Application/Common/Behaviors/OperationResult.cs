namespace Heartbeat.Application.Common.Behaviors;

public class OperationResult
{
    public bool Success { get; protected set; }
    public Exception? Exception { get; protected set; }
    
    protected OperationResult()
    {
        Success = true;
        Exception = null;
    }

    protected OperationResult(Exception exception)
    {
        Success = false;
        Exception = exception;
    }

    public bool IsException()
    {
        return Exception != null;
    }

    public static OperationResult SuccessResult()
    {
        return new OperationResult();
    }

    public static OperationResult ExceptionResult(Exception exception)
    {
        return new OperationResult(exception);
    }
}

public class OperationResult<T> : OperationResult
{
    public T? Result { get; protected set; }
    
    private OperationResult(T result) : base()
    {
        Result = result;
    }
    
    private OperationResult(Exception exception) : base(exception)
    {
        Result = default;
    }

    public static OperationResult<T> SuccessResult(T result)
    {
        return new OperationResult<T>(result);
    }

    public new static OperationResult<T> ExceptionResult(Exception exception)
    {
        return new OperationResult<T>(exception);
    }
}