using System.Collections.Generic;

namespace BigVisualBoard.Model
{
    public class BugsRepository : IWorkItemRepository
    {
        private static readonly List<WorkItem> _repo;

        static BugsRepository()
        {
            _repo = new List<WorkItem>
            {
	            new WorkItem {id = 1, title = "bug #1", description = "first bug", state = "backlog"},
	            new WorkItem {id = 2, title = "bug #2", description = "second bug", state = "working"},
	            new WorkItem {id = 3, title = "bug #3", description = "third bug", state = "done"},
	            new WorkItem {id = 4, title = "bug #4", description = "fourth bug", state = "backlog"},
	            new WorkItem {id = 5, title = "bug #5", description = "fifth bug", state = "working"},
	            new WorkItem {id = 6, title = "bug #6", description = "sixth bug", state = "done"}
            };
        }

        public IEnumerable<WorkItem> GetBugs()
        {
            return _repo;
        }
    }
}