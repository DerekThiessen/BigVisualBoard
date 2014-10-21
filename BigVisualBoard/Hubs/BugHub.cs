using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace BigVisualBoard.Hubs
{
    [HubName("bugs")]
    public class BugHub : Hub
    { }
}