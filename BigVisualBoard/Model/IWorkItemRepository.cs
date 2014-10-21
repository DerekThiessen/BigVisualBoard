using System.Collections.Generic;

namespace BigVisualBoard.Model
{
    public interface IWorkItemRepository
    {
        IEnumerable<WorkItem> GetBugs();
    }
}
