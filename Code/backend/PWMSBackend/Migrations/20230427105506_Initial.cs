using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PWMSBackend.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    CategoryId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    CategoryName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.CategoryId);
                });

            migrationBuilder.CreateTable(
                name: "Committees",
                columns: table => new
                {
                    CommitteeId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Discriminator = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Committees", x => x.CommitteeId);
                });

            migrationBuilder.CreateTable(
                name: "Divisions",
                columns: table => new
                {
                    DivisionId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    DivisionName = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Divisions", x => x.DivisionId);
                });

            migrationBuilder.CreateTable(
                name: "GRNs",
                columns: table => new
                {
                    GrnId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Checkedby = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GRNs", x => x.GrnId);
                });

            migrationBuilder.CreateTable(
                name: "Statuses",
                columns: table => new
                {
                    StatusId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    StatusName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Statuses", x => x.StatusId);
                });

            migrationBuilder.CreateTable(
                name: "Vendors",
                columns: table => new
                {
                    VendorId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EmailAddress = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Address1 = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Address2 = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Address3 = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    State = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PostalCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Salutation = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CompanyFullName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BusinessRegistrationDoc = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    TaxIdentificationDoc = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    InsuaranceCertificate = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    OtherDocs = table.Column<byte[]>(type: "varbinary(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vendors", x => x.VendorId);
                });

            migrationBuilder.CreateTable(
                name: "MasterProcurementPlans",
                columns: table => new
                {
                    MppId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    CreationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EstimatedGrandTotal = table.Column<int>(type: "int", nullable: false),
                    TecCommitteeId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    BidOpeningCommitteeId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MasterProcurementPlans", x => x.MppId);
                    table.ForeignKey(
                        name: "FK_MasterProcurementPlans_Committees_BidOpeningCommitteeId",
                        column: x => x.BidOpeningCommitteeId,
                        principalTable: "Committees",
                        principalColumn: "CommitteeId",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_MasterProcurementPlans_Committees_MppId",
                        column: x => x.MppId,
                        principalTable: "Committees",
                        principalColumn: "CommitteeId",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_MasterProcurementPlans_Committees_TecCommitteeId",
                        column: x => x.TecCommitteeId,
                        principalTable: "Committees",
                        principalColumn: "CommitteeId",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "ProcurementEmployees",
                columns: table => new
                {
                    EmployeeId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    EmployeeName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Salutation = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DivisionId1 = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Discriminator = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DivisionId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProcurementEmployees", x => x.EmployeeId);
                    table.ForeignKey(
                        name: "FK_ProcurementEmployees_Divisions_DivisionId",
                        column: x => x.DivisionId,
                        principalTable: "Divisions",
                        principalColumn: "DivisionId",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_ProcurementEmployees_Divisions_DivisionId1",
                        column: x => x.DivisionId1,
                        principalTable: "Divisions",
                        principalColumn: "DivisionId",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "Invoices",
                columns: table => new
                {
                    InvoiceId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Tax = table.Column<double>(type: "float", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    GrnId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Discriminator = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PaymentStatus = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Invoices", x => x.InvoiceId);
                    table.ForeignKey(
                        name: "FK_Invoices_GRNs_GrnId",
                        column: x => x.GrnId,
                        principalTable: "GRNs",
                        principalColumn: "GrnId",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "PurchaseOrders",
                columns: table => new
                {
                    PoId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TotalAmount = table.Column<double>(type: "float", nullable: false),
                    Agreement = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    Bond = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    BankGuarantee = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    CommentsForSpecialInstruction = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    LetterOfAcceptance = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    ProcumentOfficerStatus = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    VendorId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PurchaseOrders", x => x.PoId);
                    table.ForeignKey(
                        name: "FK_PurchaseOrders_Vendors_VendorId",
                        column: x => x.VendorId,
                        principalTable: "Vendors",
                        principalColumn: "VendorId");
                });

            migrationBuilder.CreateTable(
                name: "FinalizedMasterProcurementPlans",
                columns: table => new
                {
                    FmppId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    GrandTotal = table.Column<double>(type: "float", nullable: false),
                    MppId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FinalizedMasterProcurementPlans", x => x.FmppId);
                    table.ForeignKey(
                        name: "FK_FinalizedMasterProcurementPlans_MasterProcurementPlans_MppId",
                        column: x => x.MppId,
                        principalTable: "MasterProcurementPlans",
                        principalColumn: "MppId",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "MasterProcurementPlanStatuses",
                columns: table => new
                {
                    MppId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    StatusId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MasterProcurementPlanStatuses", x => new { x.MppId, x.StatusId });
                    table.ForeignKey(
                        name: "FK_MasterProcurementPlanStatuses_MasterProcurementPlans_StatusId",
                        column: x => x.StatusId,
                        principalTable: "MasterProcurementPlans",
                        principalColumn: "MppId",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_MasterProcurementPlanStatuses_Statuses_MppId",
                        column: x => x.MppId,
                        principalTable: "Statuses",
                        principalColumn: "StatusId",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "CommitteeMemberCommittees",
                columns: table => new
                {
                    EmployeeId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    CommitteeId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CommitteeMemberCommittees", x => new { x.EmployeeId, x.CommitteeId });
                    table.ForeignKey(
                        name: "FK_CommitteeMemberCommittees_Committees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Committees",
                        principalColumn: "CommitteeId",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_CommitteeMemberCommittees_ProcurementEmployees_CommitteeId",
                        column: x => x.CommitteeId,
                        principalTable: "ProcurementEmployees",
                        principalColumn: "EmployeeId",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "PaymentVouchers",
                columns: table => new
                {
                    PvId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Evidence = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    InvoiceTobePayId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PaymentVouchers", x => x.PvId);
                    table.ForeignKey(
                        name: "FK_PaymentVouchers_Invoices_InvoiceTobePayId",
                        column: x => x.InvoiceTobePayId,
                        principalTable: "Invoices",
                        principalColumn: "InvoiceId",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "Items",
                columns: table => new
                {
                    ItemId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ItemName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Specification = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Discriminator = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FinalizedMasterProcurementPlanFmppId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    CategoryId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UnitPrice = table.Column<double>(type: "float", nullable: true),
                    QuantityAvailable = table.Column<int>(type: "int", nullable: true),
                    ItemInStock_CategoryId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    ShippingDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ItemTobeShipped_CategoryId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Items", x => x.ItemId);
                    table.ForeignKey(
                        name: "FK_Items_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "CategoryId");
                    table.ForeignKey(
                        name: "FK_Items_Categories_ItemInStock_CategoryId",
                        column: x => x.ItemInStock_CategoryId,
                        principalTable: "Categories",
                        principalColumn: "CategoryId",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_Items_Categories_ItemTobeShipped_CategoryId",
                        column: x => x.ItemTobeShipped_CategoryId,
                        principalTable: "Categories",
                        principalColumn: "CategoryId",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_Items_FinalizedMasterProcurementPlans_FinalizedMasterProcurementPlanFmppId",
                        column: x => x.FinalizedMasterProcurementPlanFmppId,
                        principalTable: "FinalizedMasterProcurementPlans",
                        principalColumn: "FmppId",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "SubProcurementPlans",
                columns: table => new
                {
                    SppId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    EstimatedTotal = table.Column<double>(type: "float", nullable: false),
                    MasterProcurementPlanMppId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    FinalizedMasterProcuementPlanFmppId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    HODEmployeeId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubProcurementPlans", x => x.SppId);
                    table.ForeignKey(
                        name: "FK_SubProcurementPlans_FinalizedMasterProcurementPlans_FinalizedMasterProcuementPlanFmppId",
                        column: x => x.FinalizedMasterProcuementPlanFmppId,
                        principalTable: "FinalizedMasterProcurementPlans",
                        principalColumn: "FmppId",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_SubProcurementPlans_MasterProcurementPlans_MasterProcurementPlanMppId",
                        column: x => x.MasterProcurementPlanMppId,
                        principalTable: "MasterProcurementPlans",
                        principalColumn: "MppId",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_SubProcurementPlans_ProcurementEmployees_HODEmployeeId",
                        column: x => x.HODEmployeeId,
                        principalTable: "ProcurementEmployees",
                        principalColumn: "EmployeeId",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "ApprovedItemPurchaseOrders",
                columns: table => new
                {
                    ItemId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    PoId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApprovedItemPurchaseOrders", x => new { x.ItemId, x.PoId });
                    table.ForeignKey(
                        name: "FK_ApprovedItemPurchaseOrders_Items_PoId",
                        column: x => x.PoId,
                        principalTable: "Items",
                        principalColumn: "ItemId",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_ApprovedItemPurchaseOrders_PurchaseOrders_ItemId",
                        column: x => x.ItemId,
                        principalTable: "PurchaseOrders",
                        principalColumn: "PoId",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "GRNItemsToBeShipped",
                columns: table => new
                {
                    GrnId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ItemId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ShippingDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    GRNComment = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Received_Qty = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GRNItemsToBeShipped", x => new { x.GrnId, x.ItemId });
                    table.ForeignKey(
                        name: "FK_GRNItemsToBeShipped_GRNs_ItemId",
                        column: x => x.ItemId,
                        principalTable: "GRNs",
                        principalColumn: "GrnId",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_GRNItemsToBeShipped_Items_GrnId",
                        column: x => x.GrnId,
                        principalTable: "Items",
                        principalColumn: "ItemId",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "PurchaseOrder_ItemTobeShippeds",
                columns: table => new
                {
                    PoId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ItemId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Shipped_Qty = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PurchaseOrder_ItemTobeShippeds", x => new { x.PoId, x.ItemId });
                    table.ForeignKey(
                        name: "FK_PurchaseOrder_ItemTobeShippeds_Items_PoId",
                        column: x => x.PoId,
                        principalTable: "Items",
                        principalColumn: "ItemId",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_PurchaseOrder_ItemTobeShippeds_PurchaseOrders_ItemId",
                        column: x => x.ItemId,
                        principalTable: "PurchaseOrders",
                        principalColumn: "PoId",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "VendorhasItems",
                columns: table => new
                {
                    VendorId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ItemId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VendorhasItems", x => new { x.VendorId, x.ItemId });
                    table.ForeignKey(
                        name: "FK_VendorhasItems_Items_VendorId",
                        column: x => x.VendorId,
                        principalTable: "Items",
                        principalColumn: "ItemId",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_VendorhasItems_Vendors_ItemId",
                        column: x => x.ItemId,
                        principalTable: "Vendors",
                        principalColumn: "VendorId",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "VendorPlaceBidItems",
                columns: table => new
                {
                    VendorId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ItemId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    BidStatus = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BidValue = table.Column<double>(type: "float", nullable: false),
                    DateAndTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ProofDocument = table.Column<byte[]>(type: "varbinary(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VendorPlaceBidItems", x => new { x.VendorId, x.ItemId });
                    table.ForeignKey(
                        name: "FK_VendorPlaceBidItems_Items_VendorId",
                        column: x => x.VendorId,
                        principalTable: "Items",
                        principalColumn: "ItemId",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_VendorPlaceBidItems_Vendors_ItemId",
                        column: x => x.ItemId,
                        principalTable: "Vendors",
                        principalColumn: "VendorId",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "SubProcurementApprovedItems",
                columns: table => new
                {
                    SppId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ItemId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    AuctionClosingDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    AuctionOpeningDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PreBidMeetingDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubProcurementApprovedItems", x => new { x.SppId, x.ItemId });
                    table.ForeignKey(
                        name: "FK_SubProcurementApprovedItems_Items_SppId",
                        column: x => x.SppId,
                        principalTable: "Items",
                        principalColumn: "ItemId",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_SubProcurementApprovedItems_SubProcurementPlans_ItemId",
                        column: x => x.ItemId,
                        principalTable: "SubProcurementPlans",
                        principalColumn: "SppId",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "SubProcurementPlanItems",
                columns: table => new
                {
                    SppId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ItemId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    RecommendedVendor = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EvidenceOfAuthorization = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    ProcuremnetCommitteeStatus = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProcurementCommitteeComment = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    ExpectedDeliveryDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TecCommitteeStatus = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TecCommitteeComment = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DGStatus = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DGComment = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RejectedVendor = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EstimatedBudget = table.Column<double>(type: "float", nullable: false),
                    SelectedVendor = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    InternalAuditorComment = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    InternalAuditorStatus = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubProcurementPlanItems", x => new { x.SppId, x.ItemId });
                    table.ForeignKey(
                        name: "FK_SubProcurementPlanItems_Items_SppId",
                        column: x => x.SppId,
                        principalTable: "Items",
                        principalColumn: "ItemId",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_SubProcurementPlanItems_SubProcurementPlans_ItemId",
                        column: x => x.ItemId,
                        principalTable: "SubProcurementPlans",
                        principalColumn: "SppId",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ApprovedItemPurchaseOrders_PoId",
                table: "ApprovedItemPurchaseOrders",
                column: "PoId");

            migrationBuilder.CreateIndex(
                name: "IX_CommitteeMemberCommittees_CommitteeId",
                table: "CommitteeMemberCommittees",
                column: "CommitteeId");

            migrationBuilder.CreateIndex(
                name: "IX_FinalizedMasterProcurementPlans_MppId",
                table: "FinalizedMasterProcurementPlans",
                column: "MppId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_GRNItemsToBeShipped_ItemId",
                table: "GRNItemsToBeShipped",
                column: "ItemId");

            migrationBuilder.CreateIndex(
                name: "IX_Invoices_GrnId",
                table: "Invoices",
                column: "GrnId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Items_CategoryId",
                table: "Items",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Items_FinalizedMasterProcurementPlanFmppId",
                table: "Items",
                column: "FinalizedMasterProcurementPlanFmppId");

            migrationBuilder.CreateIndex(
                name: "IX_Items_ItemInStock_CategoryId",
                table: "Items",
                column: "ItemInStock_CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Items_ItemTobeShipped_CategoryId",
                table: "Items",
                column: "ItemTobeShipped_CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_MasterProcurementPlans_BidOpeningCommitteeId",
                table: "MasterProcurementPlans",
                column: "BidOpeningCommitteeId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_MasterProcurementPlans_TecCommitteeId",
                table: "MasterProcurementPlans",
                column: "TecCommitteeId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_MasterProcurementPlanStatuses_StatusId",
                table: "MasterProcurementPlanStatuses",
                column: "StatusId");

            migrationBuilder.CreateIndex(
                name: "IX_PaymentVouchers_InvoiceTobePayId",
                table: "PaymentVouchers",
                column: "InvoiceTobePayId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ProcurementEmployees_DivisionId",
                table: "ProcurementEmployees",
                column: "DivisionId",
                unique: true,
                filter: "[DivisionId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_ProcurementEmployees_DivisionId1",
                table: "ProcurementEmployees",
                column: "DivisionId1");

            migrationBuilder.CreateIndex(
                name: "IX_PurchaseOrder_ItemTobeShippeds_ItemId",
                table: "PurchaseOrder_ItemTobeShippeds",
                column: "ItemId");

            migrationBuilder.CreateIndex(
                name: "IX_PurchaseOrders_VendorId",
                table: "PurchaseOrders",
                column: "VendorId");

            migrationBuilder.CreateIndex(
                name: "IX_SubProcurementApprovedItems_ItemId",
                table: "SubProcurementApprovedItems",
                column: "ItemId");

            migrationBuilder.CreateIndex(
                name: "IX_SubProcurementPlanItems_ItemId",
                table: "SubProcurementPlanItems",
                column: "ItemId");

            migrationBuilder.CreateIndex(
                name: "IX_SubProcurementPlans_FinalizedMasterProcuementPlanFmppId",
                table: "SubProcurementPlans",
                column: "FinalizedMasterProcuementPlanFmppId");

            migrationBuilder.CreateIndex(
                name: "IX_SubProcurementPlans_HODEmployeeId",
                table: "SubProcurementPlans",
                column: "HODEmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_SubProcurementPlans_MasterProcurementPlanMppId",
                table: "SubProcurementPlans",
                column: "MasterProcurementPlanMppId");

            migrationBuilder.CreateIndex(
                name: "IX_VendorhasItems_ItemId",
                table: "VendorhasItems",
                column: "ItemId");

            migrationBuilder.CreateIndex(
                name: "IX_VendorPlaceBidItems_ItemId",
                table: "VendorPlaceBidItems",
                column: "ItemId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ApprovedItemPurchaseOrders");

            migrationBuilder.DropTable(
                name: "CommitteeMemberCommittees");

            migrationBuilder.DropTable(
                name: "GRNItemsToBeShipped");

            migrationBuilder.DropTable(
                name: "MasterProcurementPlanStatuses");

            migrationBuilder.DropTable(
                name: "PaymentVouchers");

            migrationBuilder.DropTable(
                name: "PurchaseOrder_ItemTobeShippeds");

            migrationBuilder.DropTable(
                name: "SubProcurementApprovedItems");

            migrationBuilder.DropTable(
                name: "SubProcurementPlanItems");

            migrationBuilder.DropTable(
                name: "VendorhasItems");

            migrationBuilder.DropTable(
                name: "VendorPlaceBidItems");

            migrationBuilder.DropTable(
                name: "Statuses");

            migrationBuilder.DropTable(
                name: "Invoices");

            migrationBuilder.DropTable(
                name: "PurchaseOrders");

            migrationBuilder.DropTable(
                name: "SubProcurementPlans");

            migrationBuilder.DropTable(
                name: "Items");

            migrationBuilder.DropTable(
                name: "GRNs");

            migrationBuilder.DropTable(
                name: "Vendors");

            migrationBuilder.DropTable(
                name: "ProcurementEmployees");

            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropTable(
                name: "FinalizedMasterProcurementPlans");

            migrationBuilder.DropTable(
                name: "Divisions");

            migrationBuilder.DropTable(
                name: "MasterProcurementPlans");

            migrationBuilder.DropTable(
                name: "Committees");
        }
    }
}
