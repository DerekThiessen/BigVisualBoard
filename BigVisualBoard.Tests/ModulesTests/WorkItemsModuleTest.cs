using System;
using Nancy.Testing;
using Nancy;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using BigVisualBoard.Modules;

namespace BigVisualBoard.Tests.ModulesTests
{
    [TestClass]
    public class WorkItemsModuleTest
    {
        [TestMethod]
        public void Should_return_status_ok_when_route_exists()
        {
            var browser = new Browser(with => with.Module<WorkItemsModule>());

            var result = browser.Get("/", with =>
            {
                with.HttpRequest();
            });

            Assert.AreEqual(HttpStatusCode.OK, result.StatusCode);
        }

        [TestMethod]
        public void Should_return_status_ok_when_work_items_route_exists()
        {
            var browser = new Browser(with => with.Module<WorkItemsModule>());

            var result = browser.Get("/workitems", with => {
                with.HttpRequest();
            });
            
            Assert.AreEqual(HttpStatusCode.OK, result.StatusCode);
        }
    }
}
