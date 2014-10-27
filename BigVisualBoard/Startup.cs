﻿using BigVisualBoard.Infrastructure;
using BigVisualBoard.Model;
using Microsoft.Owin;
using Microsoft.Owin.Extensions;
using Nancy;
using Nancy.Conventions;
using Nancy.TinyIoc;
using Owin;
using System.Web.Http;

[assembly: OwinStartup(typeof(BigVisualBoard.Startup))]

namespace BigVisualBoard
{
	public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.MapSignalR();

            var config = new HttpConfiguration();
            config.MapHttpAttributeRoutes();
            config.Routes.MapHttpRoute("bugs", "api/{Controller}");
            var container = new TinyIoCContainer();
            container.Register<IWorkItemRepository>(new BugsRepository());
            config.DependencyResolver = new TinyIoCDependencyResolver(container);
            app.UseWebApi(config);
			
	        app.UseNancy(options =>
	        {
		        options.Bootstrapper = new CustomBootstrapper();
	        });
	        app.UseStageMarker(PipelineStage.MapHandler);
        }

        public class CustomBootstrapper : DefaultNancyBootstrapper
        {
            protected override void ConfigureConventions(NancyConventions nancyConventions)
            {
                base.ConfigureConventions(nancyConventions);

                Conventions.StaticContentsConventions.Add(StaticContentConventionBuilder.AddDirectory("scripts", "Scripts"));
				Conventions.StaticContentsConventions.Add(StaticContentConventionBuilder.AddDirectory("/css", @"Content/css"));
				Conventions.StaticContentsConventions.Add(StaticContentConventionBuilder.AddDirectory("/js", @"Content/js"));
                Conventions.StaticContentsConventions.Add(StaticContentConventionBuilder.AddDirectory("viewModels", "ViewModels"));
            }
        }
    }
}
