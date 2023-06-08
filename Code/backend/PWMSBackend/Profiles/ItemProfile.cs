using AutoMapper;
using PWMSBackend.DTOs.Outgoing;
using PWMSBackend.Models;

namespace PWMSBackend.Profiles
{
    public class ItemProfile:Profile

    {
        public ItemProfile()
        {
            CreateMap<Item, ItemSpecificationDTO>()
                .ForMember(dest => dest.ItemName,
                    opt => opt.MapFrom(src => src.ItemName))
                .ForMember(dest => dest.Specification,
                    opt=> opt.MapFrom(src=>src.Specification));
        }
    }
}
