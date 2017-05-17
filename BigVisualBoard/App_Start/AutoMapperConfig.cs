using BigVisualBoard.Model;
using AutoMapper;

namespace BigVisualBoard.App_Start
{
    public static class AutoMapperConfig
    {
        public static void RegisterMappings()
        {
            Mapper.Initialize(cfg =>
            {
                cfg.CreateMap<Dal.Entities.WorkItem, WorkItem>();
            });
        }
    }
}