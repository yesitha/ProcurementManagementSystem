using Microsoft.AspNetCore.Components.Server.ProtectedBrowserStorage;
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

        public DbSet<UserNotification> UserNotifications { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            
            modelBuilder.Entity<ApprovedItemPurchaseOrder>()
                .HasKey(ab => new { ab.ItemId, ab.PoId });
            modelBuilder.Entity<ApprovedItemPurchaseOrder>()
                .HasOne(a => a.ApprovedItem)
                .WithMany(ab => ab.ApprovedItemPurchaseOrders)
                .HasForeignKey(a => a.ItemId);
            modelBuilder.Entity<ApprovedItemPurchaseOrder>()
                .HasOne(b => b.PurchaseOrder)
                .WithMany(ab => ab.ApprovedItemPurchaseOrders)
                .HasForeignKey(b => b.PoId);

            modelBuilder.Entity<CommitteeMemberCommittee>()
                .HasKey(cd => new { cd.EmployeeId, cd.CommitteeId });
            modelBuilder.Entity<CommitteeMemberCommittee>()
                .HasOne(c => c.CommitteeMember)
                .WithMany(cd => cd.CommitteeMembersCommittees)
                .HasForeignKey(c => c.EmployeeId);
            modelBuilder.Entity<CommitteeMemberCommittee>()
                .HasOne(d => d.Committee)
                .WithMany(cd => cd.CommitteeMembersCommittees)
                .HasForeignKey(d => d.CommitteeId);

            modelBuilder.Entity<GRNItemTobeShipped>()
               .HasKey(ea => new { ea.GrnId, ea.ItemId });
            modelBuilder.Entity<GRNItemTobeShipped>()
                .HasOne(e => e.GRN)
                .WithMany(ea => ea.GRNItemTobeShippeds)
                .HasForeignKey(e => e.GrnId);
            modelBuilder.Entity<GRNItemTobeShipped>()
                .HasOne(a => a.ItemTobeShipped)
                .WithMany(ea => ea.GRNItemTobeShippeds)
                .HasForeignKey(a => a.ItemId);

            modelBuilder.Entity<MasterProcurementPlanStatus>()
               .HasKey(fg => new { fg.MppId, fg.StatusId });
            modelBuilder.Entity<MasterProcurementPlanStatus>()
                .HasOne(f => f.MasterProcurementPlan)
                .WithMany(fg => fg.MasterProcurementPlanStatuses)
                .HasForeignKey(f => f.MppId);
            modelBuilder.Entity<MasterProcurementPlanStatus>()
                .HasOne(g => g.Status)
                .WithMany(fg => fg.MasterProcurementPlanStatuses)
                .HasForeignKey(g => g.StatusId);
                

            modelBuilder.Entity<PurchaseOrder_ItemTobeShipped>()
               .HasKey(ba => new { ba.PoId, ba.ItemId });
            modelBuilder.Entity<PurchaseOrder_ItemTobeShipped>()
                .HasOne(b => b.PurchaseOrder)
                .WithMany(ba => ba.purchaseOrder_ItemTobeShippeds)
                .HasForeignKey(b => b.PoId);
            modelBuilder.Entity<PurchaseOrder_ItemTobeShipped>()
                .HasOne(a => a.ItemTobeShipped)
                .WithMany(ba => ba.PurchaseOrder_ItemTobeShippeds)
                .HasForeignKey(a => a.ItemId);
                

            modelBuilder.Entity<SubProcurementApprovedItems>()
                .HasKey(ha => new { ha.SppId, ha.ItemId });
            modelBuilder.Entity<SubProcurementApprovedItems>()
                .HasOne(h => h.SubProcurementPlan)
                .WithMany(ha => ha.SubProcurementApprovedItems)
                .HasForeignKey(h => h.SppId);
            modelBuilder.Entity<SubProcurementApprovedItems>()
                .HasOne(a => a.ApprovedItem)
                .WithMany(ha => ha.SubProcurementApprovedItems)
                .HasForeignKey(a => a.ItemId);
                

            modelBuilder.Entity<SubProcurementPlanItem>()
                .HasKey(ha => new { ha.SppId, ha.ItemId });
            modelBuilder.Entity<SubProcurementPlanItem>()
                .HasOne(h => h.SubProcurementPlan)
                .WithMany(ha => ha.subProcurementPlanItems)
                .HasForeignKey(h => h.SppId);
            modelBuilder.Entity<SubProcurementPlanItem>()
                .HasOne(a => a.Item)
                .WithMany(ha => ha.subProcurementPlanItems)
                .HasForeignKey(a => a.ItemId);
                

            modelBuilder.Entity<VendorhasItem>()
                .HasKey(ia => new { ia.VendorId, ia.ItemId });
            modelBuilder.Entity<VendorhasItem>()
                .HasOne(i => i.Vendor)
                .WithMany(ia => ia.VendorhasItems)
                .HasForeignKey(i => i.VendorId);
            modelBuilder.Entity<VendorhasItem>()
                .HasOne(a => a.Item)
                .WithMany(ia => ia.VendorhasItems)
                .HasForeignKey(a => a.ItemId);
                

            modelBuilder.Entity<VendorPlaceBidItem>()
                .HasKey(ia => new { ia.VendorId, ia.ItemId });
            modelBuilder.Entity<VendorPlaceBidItem>()
                .HasOne(i => i.Vendor)
                .WithMany(ia => ia.VendorPlaceBidItems)
                .HasForeignKey(i => i.VendorId);
            modelBuilder.Entity<VendorPlaceBidItem>()
                .HasOne(a => a.ApprovedItem)
                .WithMany(ia => ia.VendorPlaceBidItems)
                .HasForeignKey(a => a.ItemId);
                

            //modelBuilder.Entity<MasterProcurementPlan>()
            //    .HasOne(ia => ia.ProcurementCommittee)
            //    .WithMany(ia => ia.MasterProcurementPlans)
            //    .HasForeignKey(i => i.MppId);

            //modelBuilder.Entity<MasterProcurementPlan>()
            //    .HasKey(ia => new { ia.MppId, ia.CommitteeId });
            //modelBuilder.Entity<MasterProcurementPlanhasCommittee>()
            //    .HasOne(i => i.CommitteeId)
            //    .WithMany(ia => ia.VendorhasItems)
            //    .HasForeignKey(a => a.ItemId);
            //modelBuilder.Entity<VendorhasItem>()
            //    .HasOne(a => a.Item)
            //    .WithMany(ia => ia.VendorhasItems)
            //    .HasForeignKey(i => i.VendorId);

            //modelBuilder.Entity<ProcurementCommittee>()
            //    .HasMany(e => e.MasterProcurementPlans)
            //    .WithOne(e => e.ProcurementCommittee)
            //    .HasForeignKey(e => e.MppId)
            //    .IsRequired();
            //===============================================================
            //modelBuilder.Entity<ApprovedItem>()
            //    .HasKey(a => a.ItemId);
            //modelBuilder.Entity<BidOpeningCommittee>()
            //    .HasKey(b => b.CommitteeId);
            modelBuilder.Entity<Category>()
                .HasKey(c => c.CategoryId);
            modelBuilder.Entity<Committee>()
                .HasKey(c => c.CommitteeId);
            //modelBuilder.Entity<CommitteeMember>()
            //    .HasKey(c => c.EmployeeId);
            //modelBuilder.Entity<CoOperativeCommittee>()
            //    .HasKey(c => c.CommitteeId);
            //modelBuilder.Entity<DirectorGeneral>()
            //    .HasKey(d => d.EmployeeId);
            modelBuilder.Entity<Division>()
                .HasKey(d => d.DivisionId);
            modelBuilder.Entity<FinalizedMasterProcurementPlan>()
                .HasKey(a => a.FmppId);
            modelBuilder.Entity<GRN>()
                .HasKey(g => g.GrnId);
            //modelBuilder.Entity<HOD>()
            //    .HasKey(h => h.EmployeeId);
            //modelBuilder.Entity<InternalAuditor>()
            //    .HasKey(i => i.EmployeeId);
            modelBuilder.Entity<Invoice>()
                .HasKey(i => i.InvoiceId);
            //modelBuilder.Entity<InvoiceTobePay>()
            //    .HasKey(i => i.InvoiceId);
            modelBuilder.Entity<Item>()
                .HasKey(i => i.ItemId);
            //modelBuilder.Entity<ItemInStock>()
            //    .HasKey(i => i.ItemId);
            //modelBuilder.Entity<ItemTobeShipped>()
            //    .HasKey(i => i.ItemId);
            modelBuilder.Entity<MasterProcurementPlan>()
                .HasKey(m => m.MppId);
            modelBuilder.Entity<PaymentVoucher>()
                .HasKey(p => p.PvId);
            //modelBuilder.Entity<ProcurementCommittee>()
            //    .HasKey(p => p.CommitteeId);
            modelBuilder.Entity<ProcurementEmployee>()
                .HasKey(p => p.EmployeeId);
            modelBuilder.Entity<Division>()
                .HasKey(d => d.DivisionId);
            modelBuilder.Entity<PurchaseOrder>()
                .HasKey(p => p.PoId);
            modelBuilder.Entity<Status>()
                .HasKey(s => s.StatusId);
            modelBuilder.Entity<SubProcurementPlan>()
                .HasKey(s => s.SppId);
            //modelBuilder.Entity<TecCommittee>()
            //    .HasKey(t => t.CommitteeId);
            modelBuilder.Entity<Vendor>()
                .HasKey(v => v.VendorId);
            modelBuilder.Entity<UserNotification>()
                .HasKey(v => v.notificationId);
        }
    }
}