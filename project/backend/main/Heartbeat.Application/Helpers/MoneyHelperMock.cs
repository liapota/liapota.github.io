using Heartbeat.Application.Common.Behaviors;
using Heartbeat.Application.Interfaces.MoneyHelper;

namespace Heartbeat.Application.Helpers;

public class MoneyHelperMock : IMoneyHelper
{
    public Task<OperationResult> UpdateUserMoneyAsync(int userId, int reward)
    {
        return Task.FromResult(OperationResult.SuccessResult());
    }
}