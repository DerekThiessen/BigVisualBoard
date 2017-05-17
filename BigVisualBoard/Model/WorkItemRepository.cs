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
	            new WorkItem {Id = 1, title = "bug #1", description = "first bug", state = "backlog"},
	            new WorkItem {Id = 2, Title = "bug #2", description = "second bug", state = "working"},
	            new WorkItem {Id = 3, Title = "bug #3", description = "third bug", state = "done"},
	            new WorkItem {Id = 4, Title = "bug #4", description = "fourth bug", state = "backlog"},
	            new WorkItem {Id = 5, Title = "bug #5", description = "fifth bug", state = "working"},
	            new WorkItem {Id = 6, title = "bug #6", description = "sixth bug", state = "done"}
            };
        }

        public IEnumerable<WorkItem> GetBugs()
        {
            return _repo;
        }
    }
}