using System.Collections.Generic;
using BigVisualBoard.Dal.Entities;

namespace BigVisualBoard.Dal
{
    public class WorkItemRepository : IWorkItemRepository
    {
        private static readonly List<WorkItem> _repo;

        static WorkItemRepository()
        {
            _repo = new List<WorkItem>
            {
	            new WorkItem {Id = 1, Title = "bug #1", Description = "first bug", State = "backlog"},
	            new WorkItem {Id = 2, Title = "bug #2", Description = "second bug", State = "working"},
	            new WorkItem {Id = 3, Title = "bug #3", Description = "third bug", State = "done"},
	            new WorkItem {Id = 4, Title = "bug #4", Description = "fourth bug", State = "backlog"},
	            new WorkItem {Id = 5, Title = "bug #5", Description = "fifth bug", State = "working"},
	            new WorkItem {Id = 6, Title = "bug #6", Description = "sixth bug", State = "done"}
            };
        }

        public IEnumerable<WorkItem> GetWorkItems()
        {
            return _repo;
        }
    }
}