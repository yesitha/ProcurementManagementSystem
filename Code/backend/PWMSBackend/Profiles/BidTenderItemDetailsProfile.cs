using AutoMapper;
using PWMSBackend.DTOs.outgoing;
using PWMSBackend.Models;

namespace PWMSBackend.Profiles
{
    public class BidTenderItemDetailsProfile : Profile
    {
        public BidTenderItemDetailsProfile()
        {
            CreateMap<Item, BidTenderItemDetailsDTO>()
                .ForMember(dest => dest.ItemName,
                    opt => opt.MapFrom(src => src.ItemName))
                .ForMember(dest => dest.Specification,
                    opt => opt.MapFrom(src => src.Specification));

            CreateMap<SubProcurementPlanItem, BidTenderItemDetailsDTO>()
                .ForMember(dest => dest.expectedDeliveryDate,
                    opt => opt.MapFrom(src => src.ExpectedDeliveryDate))
                .ForMember(dest => dest.Quantity,
                                   opt => opt.MapFrom(src => src.Quantity));

            CreateMap<VendorPlaceBidItem, BidTenderItemDetailsDTO>()
                .ForMember(dest => dest.BidStatus,
                    opt => opt.MapFrom(src => src.BidStatus))
                .ForMember(dest => dest.ProofDocument,
                                   opt => opt.MapFrom(src => src.ProofDocument));
        }
    }
}
