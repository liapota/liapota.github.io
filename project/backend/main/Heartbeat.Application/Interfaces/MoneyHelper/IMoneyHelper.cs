using Heartbeat.Application.Common.Behaviors;

namespace Heartbeat.Application.Interfaces.MoneyHelper;

public interface IMoneyHelper
{
    public Task<OperationResult> UpdateUserMoneyAsync(int userId, int reward);
}