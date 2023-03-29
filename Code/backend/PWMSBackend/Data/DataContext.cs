using Microsoft.EntityFrameworkCore;
using PWMSBackend.Models;

namespace PWMSBackend.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DbSet<ApprovedItem> ApprovedItems { get; set; } = null!;
        public DbSet<ApprovedItemPurchaseOrder> ApprovedItemPurchaseOrders { get; set; } = null!;
        public DbSet<BidOpeningCommittee> BidOpeningCommittees { get; set; } = null!;
        public DbSet<Committee> Committees { get; set; } = null!;
        public DbSet<CommitteeMember> CommitteeMembers { get; set; } = null!;
        public DbSet<Category> Categories { get; set; } = null!;
        public DbSet<CommitteeMemberCommittee> CommitteeMemberCommittees { get; set; } = null!;
        public DbSet<CoOperativeCommittee> CoOperativeCommittees { get; set; } = null!;
        public DbSet<DirectorGeneral> DirectorGenerals { get; set; } = null!;
        public DbSet<Division> Divisions { get; set; } = null!;
        public DbSet<FinalizedMasterProcurementPlan> FinalizedMasterProcurementPlans { get; set; } = null!;
        public DbSet<GRN> GRNs { get; set; } = null!;
        public DbSet<GRNItemTobeShipped> GRNItemsToBeShipped { get; set; } = null!;
        public DbSet<HOD> HODs { get; set; } = null!;
        public DbSet<InternalAuditor> InternalAuditors { get; set; } = null!;
        public DbSet<Invoice> Invoices { get; set; } = null!;
        public DbSet<InvoiceTobePay> InvoiceTobePays { get; set; } = null!;
        public DbSet<Item> Items { get; set; } = null!;
        public DbSet<ItemInStock> ItemInStocks { get; set; } = null!;
        public DbSet<ItemTobeShipped> ItemTobeShippeds { get; set; } = null!;
        public DbSet<MasterProcurementPlan> MasterProcurementPlans { get; set; } = null!;
        public DbSet<MasterProcurementPlanStatus> MasterProcurementPlanStatuses { get; set; } = null!;
        public DbSet<PaymentVoucher> PaymentVouchers { get; set; } = null!;
        public DbSet<ProcurementCommittee> ProcurementCommittees { get; set; } = null!;
        public DbSet<ProcurementEmployee> ProcurementEmployees { get; set; } = null!;
        public DbSet<PurchaseOrder> PurchaseOrders { get; set; } = null!;
        public DbSet<PurchaseOrder_ItemTobeShipped> PurchaseOrder_ItemTobeShippeds { get; set; } = null!;
        public DbSet<Status> Statuses { get; set; } = null!;
        public DbSet<SubProcurementPlan> SubProcurementPlans { get; set; } = null!;
        public DbSet<SubProcurementApprovedItems> SubProcurementApprovedItems { get; set; } = null!;
        public DbSet<SubProcurementPlanItem> SubProcurementPlanItems { get; set; } = null!;
        public DbSet<TecCommittee> TecCommittees { get; set; } = null!;
        public DbSet<Vendor> Vendors { get; set; } = null!;
        public DbSet<VendorhasItem> VendorhasItems { get; set; } = null!;
        public DbSet<VendorPlaceBidItem> VendorPlaceBidItems { get; set; } = null!;
    }
}