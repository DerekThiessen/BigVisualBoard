using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace BigVisualBoard.Hubs
{
    [HubName("workItems")]
    public class WorkItemHub : Hub
    { }
}