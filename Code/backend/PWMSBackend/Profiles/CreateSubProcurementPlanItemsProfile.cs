using AutoMapper;
using PWMSBackend.DTOs.Incoming;
using PWMSBackend.DTOs.outgoing;
using PWMSBackend.Models;

namespace PWMSBackend.Profiles
{
    public class CreateSubProcurementPlanItemsProfile : Profile
    {
        
            public CreateSubProcurementPlanItemsProfile()
            {
                CreateMap<SubProcurementPlanItem, CreateSubProcurementPlanItemDTO>()
                    .ForMember(dest => dest.SppId,
                        opt => opt.MapFrom(src => src.SppId))
                    .ForMember(dest => dest.ItemId,
                        opt => opt.MapFrom(src => src.ItemId))
                    .ForMember(dest => dest.RecommendedVendor,
                                opt => opt.MapFrom(src => src.RecommendedVendor))
                    .ForMember(dest => dest.Quantity,
                                opt => opt.MapFrom(src => src.Quantity))
                    .ForMember(dest => dest.EvidenceOfAuthorization,
                                opt => opt.MapFrom(src => src.EvidenceOfAuthorization))
                    .ForMember(dest => dest.EstimatedBudget,
                                opt => opt.MapFrom(src => src.EstimatedBudget))
                    .ForMember(dest => dest.ExpectedDeliveryDate,
                                        opt => opt.MapFrom(src => src.ExpectedDeliveryDate));

        }
    }
}
