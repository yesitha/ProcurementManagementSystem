using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PWMSBackend.Migrations
{
    public partial class fix3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ApprovedItemPurchaseOrders_Items_ItemId",
                table: "ApprovedItemPurchaseOrders");

            migrationBuilder.DropForeignKey(
                name: "FK_ApprovedItemPurchaseOrders_PurchaseOrders_PoId",
                table: "ApprovedItemPurchaseOrders");

            migrationBuilder.DropForeignKey(
                name: "FK_CommitteeMemberCommittees_Committees_CommitteeId",
                table: "CommitteeMemberCommittees");

            migrationBuilder.DropForeignKey(
                name: "FK_CommitteeMemberCommittees_ProcurementEmployees_EmployeeId",
                table: "CommitteeMemberCommittees");

            migrationBuilder.DropForeignKey(
                name: "FK_FinalizedMasterProcurementPlans_MasterProcurementPlans_MppId",
                table: "FinalizedMasterProcurementPlans");

            migrationBuilder.DropForeignKey(
                name: "FK_GRNItemsToBeShipped_GRNs_GrnId",
                table: "GRNItemsToBeShipped");

            migrationBuilder.DropForeignKey(
                name: "FK_GRNItemsToBeShipped_Items_ItemId",
                table: "GRNItemsToBeShipped");

            migrationBuilder.DropForeignKey(
                name: "FK_Invoices_GRNs_GrnId",
                table: "Invoices");

            migrationBuilder.DropForeignKey(
                name: "FK_Items_Categories_ItemInStock_CategoryId",
                table: "Items");

            migrationBuilder.DropForeignKey(
                name: "FK_Items_Categories_ItemTobeShipped_CategoryId",
                table: "Items");

            migrationBuilder.DropForeignKey(
                name: "FK_Items_FinalizedMasterProcurementPlans_FinalizedMasterProcurementPlanFmppId",
                table: "Items");

            migrationBuilder.DropForeignKey(
                name: "FK_MasterProcurementPlans_Committees_BidOpeningCommitteeId",
                table: "MasterProcurementPlans");

            migrationBuilder.DropForeignKey(
                name: "FK_MasterProcurementPlans_Committees_TecCommitteeId",
                table: "MasterProcurementPlans");

            migrationBuilder.DropForeignKey(
                name: "FK_MasterProcurementPlanStatuses_MasterProcurementPlans_MppId",
                table: "MasterProcurementPlanStatuses");

            migrationBuilder.DropForeignKey(
                name: "FK_MasterProcurementPlanStatuses_Statuses_StatusId",
                table: "MasterProcurementPlanStatuses");

            migrationBuilder.DropForeignKey(
                name: "FK_PaymentVouchers_Invoices_InvoiceTobePayId",
                table: "PaymentVouchers");

            migrationBuilder.DropForeignKey(
                name: "FK_ProcurementEmployees_Divisions_DivisionId",
                table: "ProcurementEmployees");

            migrationBuilder.DropForeignKey(
                name: "FK_ProcurementEmployees_Divisions_DivisionId1",
                table: "ProcurementEmployees");

            migrationBuilder.DropForeignKey(
                name: "FK_PurchaseOrder_ItemTobeShippeds_Items_ItemId",
                table: "PurchaseOrder_ItemTobeShippeds");

            migrationBuilder.DropForeignKey(
                name: "FK_PurchaseOrder_ItemTobeShippeds_PurchaseOrders_PoId",
                table: "PurchaseOrder_ItemTobeShippeds");

            migrationBuilder.DropForeignKey(
                name: "FK_SubProcurementApprovedItems_Items_ItemId",
                table: "SubProcurementApprovedItems");

            migrationBuilder.DropForeignKey(
                name: "FK_SubProcurementApprovedItems_SubProcurementPlans_SppId",
                table: "SubProcurementApprovedItems");

            migrationBuilder.DropForeignKey(
                name: "FK_SubProcurementPlanItems_Items_ItemId",
                table: "SubProcurementPlanItems");

            migrationBuilder.DropForeignKey(
                name: "FK_SubProcurementPlanItems_SubProcurementPlans_SppId",
                table: "SubProcurementPlanItems");

            migrationBuilder.DropForeignKey(
                name: "FK_SubProcurementPlans_FinalizedMasterProcurementPlans_FinalizedMasterProcuementPlanFmppId",
                table: "SubProcurementPlans");

            migrationBuilder.DropForeignKey(
                name: "FK_SubProcurementPlans_MasterProcurementPlans_MasterProcurementPlanMppId",
                table: "SubProcurementPlans");

            migrationBuilder.DropForeignKey(
                name: "FK_SubProcurementPlans_ProcurementEmployees_HODEmployeeId",
                table: "SubProcurementPlans");

            migrationBuilder.DropForeignKey(
                name: "FK_UserNotifications_Users_UserId",
                table: "UserNotifications");

            migrationBuilder.DropForeignKey(
                name: "FK_VendorhasItems_Items_ItemId",
                table: "VendorhasItems");

            migrationBuilder.DropForeignKey(
                name: "FK_VendorhasItems_Vendors_VendorId",
                table: "VendorhasItems");

            migrationBuilder.DropForeignKey(
                name: "FK_VendorPlaceBidItems_Items_ItemId",
                table: "VendorPlaceBidItems");

            migrationBuilder.DropForeignKey(
                name: "FK_VendorPlaceBidItems_Vendors_VendorId",
                table: "VendorPlaceBidItems");

            migrationBuilder.AddForeignKey(
                name: "FK_ApprovedItemPurchaseOrders_Items_ItemId",
                table: "ApprovedItemPurchaseOrders",
                column: "ItemId",
                principalTable: "Items",
                principalColumn: "ItemId",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_ApprovedItemPurchaseOrders_PurchaseOrders_PoId",
                table: "ApprovedItemPurchaseOrders",
                column: "PoId",
                principalTable: "PurchaseOrders",
                principalColumn: "PoId",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_CommitteeMemberCommittees_Committees_CommitteeId",
                table: "CommitteeMemberCommittees",
                column: "CommitteeId",
                principalTable: "Committees",
                principalColumn: "CommitteeId",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_CommitteeMemberCommittees_ProcurementEmployees_EmployeeId",
                table: "CommitteeMemberCommittees",
                column: "EmployeeId",
                principalTable: "ProcurementEmployees",
                principalColumn: "EmployeeId",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_FinalizedMasterProcurementPlans_MasterProcurementPlans_MppId",
                table: "FinalizedMasterProcurementPlans",
                column: "MppId",
                principalTable: "MasterProcurementPlans",
                principalColumn: "MppId",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_GRNItemsToBeShipped_GRNs_GrnId",
                table: "GRNItemsToBeShipped",
                column: "GrnId",
                principalTable: "GRNs",
                principalColumn: "GrnId",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_GRNItemsToBeShipped_Items_ItemId",
                table: "GRNItemsToBeShipped",
                column: "ItemId",
                principalTable: "Items",
                principalColumn: "ItemId",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_Invoices_GRNs_GrnId",
                table: "Invoices",
                column: "GrnId",
                principalTable: "GRNs",
                principalColumn: "GrnId",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_Items_Categories_ItemInStock_CategoryId",
                table: "Items",
                column: "ItemInStock_CategoryId",
                principalTable: "Categories",
                principalColumn: "CategoryId",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_Items_Categories_ItemTobeShipped_CategoryId",
                table: "Items",
                column: "ItemTobeShipped_CategoryId",
                principalTable: "Categories",
                principalColumn: "CategoryId",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_Items_FinalizedMasterProcurementPlans_FinalizedMasterProcurementPlanFmppId",
                table: "Items",
                column: "FinalizedMasterProcurementPlanFmppId",
                principalTable: "FinalizedMasterProcurementPlans",
                principalColumn: "FmppId",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_MasterProcurementPlans_Committees_BidOpeningCommitteeId",
                table: "MasterProcurementPlans",
                column: "BidOpeningCommitteeId",
                principalTable: "Committees",
                principalColumn: "CommitteeId",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_MasterProcurementPlans_Committees_TecCommitteeId",
                table: "MasterProcurementPlans",
                column: "TecCommitteeId",
                principalTable: "Committees",
                principalColumn: "CommitteeId",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_MasterProcurementPlanStatuses_MasterProcurementPlans_MppId",
                table: "MasterProcurementPlanStatuses",
                column: "MppId",
                principalTable: "MasterProcurementPlans",
                principalColumn: "MppId",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_MasterProcurementPlanStatuses_Statuses_StatusId",
                table: "MasterProcurementPlanStatuses",
                column: "StatusId",
                principalTable: "Statuses",
                principalColumn: "StatusId",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_PaymentVouchers_Invoices_InvoiceTobePayId",
                table: "PaymentVouchers",
                column: "InvoiceTobePayId",
                principalTable: "Invoices",
                principalColumn: "InvoiceId",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_ProcurementEmployees_Divisions_DivisionId",
                table: "ProcurementEmployees",
                column: "DivisionId",
                principalTable: "Divisions",
                principalColumn: "DivisionId",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_ProcurementEmployees_Divisions_DivisionId1",
                table: "ProcurementEmployees",
                column: "DivisionId1",
                principalTable: "Divisions",
                principalColumn: "DivisionId",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_PurchaseOrder_ItemTobeShippeds_Items_ItemId",
                table: "PurchaseOrder_ItemTobeShippeds",
                column: "ItemId",
                principalTable: "Items",
                principalColumn: "ItemId",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_PurchaseOrder_ItemTobeShippeds_PurchaseOrders_PoId",
                table: "PurchaseOrder_ItemTobeShippeds",
                column: "PoId",
                principalTable: "PurchaseOrders",
                principalColumn: "PoId",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_SubProcurementApprovedItems_Items_ItemId",
                table: "SubProcurementApprovedItems",
                column: "ItemId",
                principalTable: "Items",
                principalColumn: "ItemId",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_SubProcurementApprovedItems_SubProcurementPlans_SppId",
                table: "SubProcurementApprovedItems",
                column: "SppId",
                principalTable: "SubProcurementPlans",
                principalColumn: "SppId",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_SubProcurementPlanItems_Items_ItemId",
                table: "SubProcurementPlanItems",
                column: "ItemId",
                principalTable: "Items",
                principalColumn: "ItemId",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_SubProcurementPlanItems_SubProcurementPlans_SppId",
                table: "SubProcurementPlanItems",
                column: "SppId",
                principalTable: "SubProcurementPlans",
                principalColumn: "SppId",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_SubProcurementPlans_FinalizedMasterProcurementPlans_FinalizedMasterProcuementPlanFmppId",
                table: "SubProcurementPlans",
                column: "FinalizedMasterProcuementPlanFmppId",
                principalTable: "FinalizedMasterProcurementPlans",
                principalColumn: "FmppId",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_SubProcurementPlans_MasterProcurementPlans_MasterProcurementPlanMppId",
                table: "SubProcurementPlans",
                column: "MasterProcurementPlanMppId",
                principalTable: "MasterProcurementPlans",
                principalColumn: "MppId",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_SubProcurementPlans_ProcurementEmployees_HODEmployeeId",
                table: "SubProcurementPlans",
                column: "HODEmployeeId",
                principalTable: "ProcurementEmployees",
                principalColumn: "EmployeeId",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_UserNotifications_Users_UserId",
                table: "UserNotifications",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_VendorhasItems_Items_ItemId",
                table: "VendorhasItems",
                column: "ItemId",
                principalTable: "Items",
                principalColumn: "ItemId",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_VendorhasItems_Vendors_VendorId",
                table: "VendorhasItems",
                column: "VendorId",
                principalTable: "Vendors",
                principalColumn: "VendorId",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_VendorPlaceBidItems_Items_ItemId",
                table: "VendorPlaceBidItems",
                column: "ItemId",
                principalTable: "Items",
                principalColumn: "ItemId",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_VendorPlaceBidItems_Vendors_VendorId",
                table: "VendorPlaceBidItems",
                column: "VendorId",
                principalTable: "Vendors",
                principalColumn: "VendorId",
                onDelete: ReferentialAction.NoAction);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ApprovedItemPurchaseOrders_Items_ItemId",
                table: "ApprovedItemPurchaseOrders");

            migrationBuilder.DropForeignKey(
                name: "FK_ApprovedItemPurchaseOrders_PurchaseOrders_PoId",
                table: "ApprovedItemPurchaseOrders");

            migrationBuilder.DropForeignKey(
                name: "FK_CommitteeMemberCommittees_Committees_CommitteeId",
                table: "CommitteeMemberCommittees");

            migrationBuilder.DropForeignKey(
                name: "FK_CommitteeMemberCommittees_ProcurementEmployees_EmployeeId",
                table: "CommitteeMemberCommittees");

            migrationBuilder.DropForeignKey(
                name: "FK_FinalizedMasterProcurementPlans_MasterProcurementPlans_MppId",
                table: "FinalizedMasterProcurementPlans");

            migrationBuilder.DropForeignKey(
                name: "FK_GRNItemsToBeShipped_GRNs_GrnId",
                table: "GRNItemsToBeShipped");

            migrationBuilder.DropForeignKey(
                name: "FK_GRNItemsToBeShipped_Items_ItemId",
                table: "GRNItemsToBeShipped");

            migrationBuilder.DropForeignKey(
                name: "FK_Invoices_GRNs_GrnId",
                table: "Invoices");

            migrationBuilder.DropForeignKey(
                name: "FK_Items_Categories_ItemInStock_CategoryId",
                table: "Items");

            migrationBuilder.DropForeignKey(
                name: "FK_Items_Categories_ItemTobeShipped_CategoryId",
                table: "Items");

            migrationBuilder.DropForeignKey(
                name: "FK_Items_FinalizedMasterProcurementPlans_FinalizedMasterProcurementPlanFmppId",
                table: "Items");

            migrationBuilder.DropForeignKey(
                name: "FK_MasterProcurementPlans_Committees_BidOpeningCommitteeId",
                table: "MasterProcurementPlans");

            migrationBuilder.DropForeignKey(
                name: "FK_MasterProcurementPlans_Committees_TecCommitteeId",
                table: "MasterProcurementPlans");

            migrationBuilder.DropForeignKey(
                name: "FK_MasterProcurementPlanStatuses_MasterProcurementPlans_MppId",
                table: "MasterProcurementPlanStatuses");

            migrationBuilder.DropForeignKey(
                name: "FK_MasterProcurementPlanStatuses_Statuses_StatusId",
                table: "MasterProcurementPlanStatuses");

            migrationBuilder.DropForeignKey(
                name: "FK_PaymentVouchers_Invoices_InvoiceTobePayId",
                table: "PaymentVouchers");

            migrationBuilder.DropForeignKey(
                name: "FK_ProcurementEmployees_Divisions_DivisionId",
                table: "ProcurementEmployees");

            migrationBuilder.DropForeignKey(
                name: "FK_ProcurementEmployees_Divisions_DivisionId1",
                table: "ProcurementEmployees");

            migrationBuilder.DropForeignKey(
                name: "FK_PurchaseOrder_ItemTobeShippeds_Items_ItemId",
                table: "PurchaseOrder_ItemTobeShippeds");

            migrationBuilder.DropForeignKey(
                name: "FK_PurchaseOrder_ItemTobeShippeds_PurchaseOrders_PoId",
                table: "PurchaseOrder_ItemTobeShippeds");

            migrationBuilder.DropForeignKey(
                name: "FK_SubProcurementApprovedItems_Items_ItemId",
                table: "SubProcurementApprovedItems");

            migrationBuilder.DropForeignKey(
                name: "FK_SubProcurementApprovedItems_SubProcurementPlans_SppId",
                table: "SubProcurementApprovedItems");

            migrationBuilder.DropForeignKey(
                name: "FK_SubProcurementPlanItems_Items_ItemId",
                table: "SubProcurementPlanItems");

            migrationBuilder.DropForeignKey(
                name: "FK_SubProcurementPlanItems_SubProcurementPlans_SppId",
                table: "SubProcurementPlanItems");

            migrationBuilder.DropForeignKey(
                name: "FK_SubProcurementPlans_FinalizedMasterProcurementPlans_FinalizedMasterProcuementPlanFmppId",
                table: "SubProcurementPlans");

            migrationBuilder.DropForeignKey(
                name: "FK_SubProcurementPlans_MasterProcurementPlans_MasterProcurementPlanMppId",
                table: "SubProcurementPlans");

            migrationBuilder.DropForeignKey(
                name: "FK_SubProcurementPlans_ProcurementEmployees_HODEmployeeId",
                table: "SubProcurementPlans");

            migrationBuilder.DropForeignKey(
                name: "FK_UserNotifications_Users_UserId",
                table: "UserNotifications");

            migrationBuilder.DropForeignKey(
                name: "FK_VendorhasItems_Items_ItemId",
                table: "VendorhasItems");

            migrationBuilder.DropForeignKey(
                name: "FK_VendorhasItems_Vendors_VendorId",
                table: "VendorhasItems");

            migrationBuilder.DropForeignKey(
                name: "FK_VendorPlaceBidItems_Items_ItemId",
                table: "VendorPlaceBidItems");

            migrationBuilder.DropForeignKey(
                name: "FK_VendorPlaceBidItems_Vendors_VendorId",
                table: "VendorPlaceBidItems");

            migrationBuilder.AddForeignKey(
                name: "FK_ApprovedItemPurchaseOrders_Items_ItemId",
                table: "ApprovedItemPurchaseOrders",
                column: "ItemId",
                principalTable: "Items",
                principalColumn: "ItemId");

            migrationBuilder.AddForeignKey(
                name: "FK_ApprovedItemPurchaseOrders_PurchaseOrders_PoId",
                table: "ApprovedItemPurchaseOrders",
                column: "PoId",
                principalTable: "PurchaseOrders",
                principalColumn: "PoId");

            migrationBuilder.AddForeignKey(
                name: "FK_CommitteeMemberCommittees_Committees_CommitteeId",
                table: "CommitteeMemberCommittees",
                column: "CommitteeId",
                principalTable: "Committees",
                principalColumn: "CommitteeId");

            migrationBuilder.AddForeignKey(
                name: "FK_CommitteeMemberCommittees_ProcurementEmployees_EmployeeId",
                table: "CommitteeMemberCommittees",
                column: "EmployeeId",
                principalTable: "ProcurementEmployees",
                principalColumn: "EmployeeId");

            migrationBuilder.AddForeignKey(
                name: "FK_FinalizedMasterProcurementPlans_MasterProcurementPlans_MppId",
                table: "FinalizedMasterProcurementPlans",
                column: "MppId",
                principalTable: "MasterProcurementPlans",
                principalColumn: "MppId");

            migrationBuilder.AddForeignKey(
                name: "FK_GRNItemsToBeShipped_GRNs_GrnId",
                table: "GRNItemsToBeShipped",
                column: "GrnId",
                principalTable: "GRNs",
                principalColumn: "GrnId");

            migrationBuilder.AddForeignKey(
                name: "FK_GRNItemsToBeShipped_Items_ItemId",
                table: "GRNItemsToBeShipped",
                column: "ItemId",
                principalTable: "Items",
                principalColumn: "ItemId");

            migrationBuilder.AddForeignKey(
                name: "FK_Invoices_GRNs_GrnId",
                table: "Invoices",
                column: "GrnId",
                principalTable: "GRNs",
                principalColumn: "GrnId");

            migrationBuilder.AddForeignKey(
                name: "FK_Items_Categories_ItemInStock_CategoryId",
                table: "Items",
                column: "ItemInStock_CategoryId",
                principalTable: "Categories",
                principalColumn: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Items_Categories_ItemTobeShipped_CategoryId",
                table: "Items",
                column: "ItemTobeShipped_CategoryId",
                principalTable: "Categories",
                principalColumn: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Items_FinalizedMasterProcurementPlans_FinalizedMasterProcurementPlanFmppId",
                table: "Items",
                column: "FinalizedMasterProcurementPlanFmppId",
                principalTable: "FinalizedMasterProcurementPlans",
                principalColumn: "FmppId");

            migrationBuilder.AddForeignKey(
                name: "FK_MasterProcurementPlans_Committees_BidOpeningCommitteeId",
                table: "MasterProcurementPlans",
                column: "BidOpeningCommitteeId",
                principalTable: "Committees",
                principalColumn: "CommitteeId");

            migrationBuilder.AddForeignKey(
                name: "FK_MasterProcurementPlans_Committees_TecCommitteeId",
                table: "MasterProcurementPlans",
                column: "TecCommitteeId",
                principalTable: "Committees",
                principalColumn: "CommitteeId");

            migrationBuilder.AddForeignKey(
                name: "FK_MasterProcurementPlanStatuses_MasterProcurementPlans_MppId",
                table: "MasterProcurementPlanStatuses",
                column: "MppId",
                principalTable: "MasterProcurementPlans",
                principalColumn: "MppId");

            migrationBuilder.AddForeignKey(
                name: "FK_MasterProcurementPlanStatuses_Statuses_StatusId",
                table: "MasterProcurementPlanStatuses",
                column: "StatusId",
                principalTable: "Statuses",
                principalColumn: "StatusId");

            migrationBuilder.AddForeignKey(
                name: "FK_PaymentVouchers_Invoices_InvoiceTobePayId",
                table: "PaymentVouchers",
                column: "InvoiceTobePayId",
                principalTable: "Invoices",
                principalColumn: "InvoiceId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProcurementEmployees_Divisions_DivisionId",
                table: "ProcurementEmployees",
                column: "DivisionId",
                principalTable: "Divisions",
                principalColumn: "DivisionId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProcurementEmployees_Divisions_DivisionId1",
                table: "ProcurementEmployees",
                column: "DivisionId1",
                principalTable: "Divisions",
                principalColumn: "DivisionId");

            migrationBuilder.AddForeignKey(
                name: "FK_PurchaseOrder_ItemTobeShippeds_Items_ItemId",
                table: "PurchaseOrder_ItemTobeShippeds",
                column: "ItemId",
                principalTable: "Items",
                principalColumn: "ItemId");

            migrationBuilder.AddForeignKey(
                name: "FK_PurchaseOrder_ItemTobeShippeds_PurchaseOrders_PoId",
                table: "PurchaseOrder_ItemTobeShippeds",
                column: "PoId",
                principalTable: "PurchaseOrders",
                principalColumn: "PoId");

            migrationBuilder.AddForeignKey(
                name: "FK_SubProcurementApprovedItems_Items_ItemId",
                table: "SubProcurementApprovedItems",
                column: "ItemId",
                principalTable: "Items",
                principalColumn: "ItemId");

            migrationBuilder.AddForeignKey(
                name: "FK_SubProcurementApprovedItems_SubProcurementPlans_SppId",
                table: "SubProcurementApprovedItems",
                column: "SppId",
                principalTable: "SubProcurementPlans",
                principalColumn: "SppId");

            migrationBuilder.AddForeignKey(
                name: "FK_SubProcurementPlanItems_Items_ItemId",
                table: "SubProcurementPlanItems",
                column: "ItemId",
                principalTable: "Items",
                principalColumn: "ItemId");

            migrationBuilder.AddForeignKey(
                name: "FK_SubProcurementPlanItems_SubProcurementPlans_SppId",
                table: "SubProcurementPlanItems",
                column: "SppId",
                principalTable: "SubProcurementPlans",
                principalColumn: "SppId");

            migrationBuilder.AddForeignKey(
                name: "FK_SubProcurementPlans_FinalizedMasterProcurementPlans_FinalizedMasterProcuementPlanFmppId",
                table: "SubProcurementPlans",
                column: "FinalizedMasterProcuementPlanFmppId",
                principalTable: "FinalizedMasterProcurementPlans",
                principalColumn: "FmppId");

            migrationBuilder.AddForeignKey(
                name: "FK_SubProcurementPlans_MasterProcurementPlans_MasterProcurementPlanMppId",
                table: "SubProcurementPlans",
                column: "MasterProcurementPlanMppId",
                principalTable: "MasterProcurementPlans",
                principalColumn: "MppId");

            migrationBuilder.AddForeignKey(
                name: "FK_SubProcurementPlans_ProcurementEmployees_HODEmployeeId",
                table: "SubProcurementPlans",
                column: "HODEmployeeId",
                principalTable: "ProcurementEmployees",
                principalColumn: "EmployeeId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserNotifications_Users_UserId",
                table: "UserNotifications",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_VendorhasItems_Items_ItemId",
                table: "VendorhasItems",
                column: "ItemId",
                principalTable: "Items",
                principalColumn: "ItemId");

            migrationBuilder.AddForeignKey(
                name: "FK_VendorhasItems_Vendors_VendorId",
                table: "VendorhasItems",
                column: "VendorId",
                principalTable: "Vendors",
                principalColumn: "VendorId");

            migrationBuilder.AddForeignKey(
                name: "FK_VendorPlaceBidItems_Items_ItemId",
                table: "VendorPlaceBidItems",
                column: "ItemId",
                principalTable: "Items",
                principalColumn: "ItemId");

            migrationBuilder.AddForeignKey(
                name: "FK_VendorPlaceBidItems_Vendors_VendorId",
                table: "VendorPlaceBidItems",
                column: "VendorId",
                principalTable: "Vendors",
                principalColumn: "VendorId");
        }
    }
}
