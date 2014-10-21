using BigVisualBoard.Hubs;
using BigVisualBoard.Model;
using Microsoft.AspNet.SignalR;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace BigVisualBoard.api
{
    public class WorkItemsController : ApiController
    {
        private readonly IWorkItemRepository _bugsRepository;
        private IHubContext _hub;

        public WorkItemsController(IWorkItemRepository bugsRepository)
        {
            _bugsRepository = bugsRepository;
            _hub = GlobalHost.ConnectionManager.GetHubContext<BugHub>();
        }

        public IEnumerable<WorkItem> Get()
        {
            return _bugsRepository.GetBugs();
        }

        [Route("api/workitems/backlog")]
        public WorkItem PostToBacklog([FromBody] int id)
        {
            var bug = _bugsRepository.GetBugs().First(b => b.id == id);
            bug.state = "backlog";

            _hub.Clients.All.moved(bug);

            return bug;
        }

        [Route("api/workitems/working")]
        public WorkItem PostToWorking([FromBody] int id)
        {
            var bug = _bugsRepository.GetBugs().First(b => b.id == id);
            bug.state = "working";

            _hub.Clients.All.moved(bug);

            return bug;
        }

        [Route("api/workitems/done")]
        public WorkItem PostToDone([FromBody] int id)
        {
            var bug = _bugsRepository.GetBugs().First(b => b.id == id);
            bug.state = "done";

            _hub.Clients.All.moved(bug);

            return bug;
        }
    }
}