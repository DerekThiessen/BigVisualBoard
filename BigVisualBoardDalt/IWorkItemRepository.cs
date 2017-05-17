using System.Collections.Generic;
using BigVisualBoard.Dal.Entities;

namespace BigVisualBoard.Dal
{
    public interface IWorkItemRepository
    {
        IEnumerable<WorkItem> GetBugs();
    }
}
