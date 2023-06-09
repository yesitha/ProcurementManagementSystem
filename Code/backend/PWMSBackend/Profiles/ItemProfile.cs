using AutoMapper;
using PWMSBackend.DTOs.Outgoing;
using PWMSBackend.Models;

namespace PWMSBackend.Profiles
{
    public class ItemProfile : Profile

    {
        public ItemProfile()
        {
            CreateMap<Item, TenderItemDetailsDTO>()
                .ForMember(dest => dest.ItemName,
                    opt => opt.MapFrom(src => src.ItemName))
                .ForMember(dest => dest.Specification,
                    opt => opt.MapFrom(src => src.Specification));

            CreateMap<SubProcurementPlanItem, TenderItemDetailsDTO>()
                .ForMember(dest => dest.expectedDeliveryDate,
                    opt => opt.MapFrom(src => src.ExpectedDeliveryDate))
                .ForMember(dest => dest.Quantity,
                                   opt => opt.MapFrom(src => src.Quantity));
        }
    }
}