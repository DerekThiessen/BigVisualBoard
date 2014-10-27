using System;

namespace BigVisualBoard.SelfHost
{
	class Program
	{
		static void Main(string[] args)
		{
			using (Microsoft.Owin.Hosting.WebApp.Start<Startup>("http://localhost"))
			{
				Console.WriteLine("Press [enter] to quit...");
				Console.ReadLine();
			}
		}
	}
}
