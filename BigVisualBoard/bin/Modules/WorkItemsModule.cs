using Microsoft.Owin;
using Nancy;
using System.Collections.Generic;
using BigVisualBoard.Model;

namespace BigVisualBoard.Modules
{
    public class WorkItemsModule : NancyModule
    {
        public WorkItemsModule()
        {
            Get["/"] = _ =>
            {
                var model = new { title = "Dashboard" };
                return View["dashboard", model];
            };

            Get["/workitems"] = _ =>
            {
                var model = new { title = "Work Items" };
                return View["workItems", model];
            };
        }
    }
}