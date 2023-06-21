let list1 = [];
let list2 = [];
let actions = [];
let actionButtons = [];

const user = {
  firstname: "John",
  lastname: "Doe",
  email: "johndoe@gmail.com",
  designation: "Procurement Officer",
  userType: "Vendor",
  department: "Finance",
  phone: "1234567890",
  address: "123, ABC Street, XYZ City, 123456",
  gender: "Male",
  profilePic: "https://www.w3schools.com/howto/img_avatar.png",
};

const currentUser = user.userType;
switch (currentUser) {
  case "Admin":
    break;
  case "ProcurementOfficer":
    list1 = [
      { displayName: "Sub Procurment Plan", path: "ViewSubProcurementPlan" },
      { displayName: "Master Procurement Plan", path: "MasterProcurmentPlan" },
      { displayName: "Purchase Orders", path: "PurchaseOrder" },
      { displayName: "Good Receive Note", path: "GoodReceiveNote" },
      { displayName: "Payment Voucher", path: "PaymentVouchar" },
    ];

    list2 = ["Vendors and Items", "Budgets", "Inventory", "Settings"];
    actions = [
      {
        displayName: "Set Pre Bid Meeting Date",
      },
      {
        displayName: "Appoint Bid Opening Committee",
        path: "appoint-bidopening-committee",
      },
      {
        displayName: "Evaluate Master Procurement Plan",
        path: "evaluate-master-procurementplan",
      },
      { displayName: "Create Purchase Order", path: "create-purchase-order" },
      { displayName: "Create GRN", path: "create-grn" },
      {
        displayName: "Evaluate Vendor Fianace Status",
        path: "evaluate-vendor-fianace-status",
      },
      {
        displayName: "View Master Procurement Plan",
        path: "view-masterprocurement-plan",
      },
    ];

    actionButtons = [
      {
        displayName: "New Master Procurement plan for Evaluate",
        path: "new-master-procurement-plan-for-evaluate",
        number: "2",
      },
      {
        displayName: "Set Pre Bid Meeting Date"
      },
      { displayName: "Auctions End", path: "auctions-end", number: "1/30" },
      {
        displayName: "Internal Auditor Report Availble",
        path: "internal-auditor-report-availble",
      },
      {
        displayName: "Approved Items from DG",
        path: "approved-items-from-dg",
        number: "10",
      },
      {
        displayName: "Items Shipped By Vendors",
        path: "item-rejected-by-vendors",
        number: "10",
      },
      {
        displayName: "New Invoices Available",
        path: "new-invoices-available",
        number: "10",
      },
    ];
    break;

  case "HOD":
    list1 = [
      {
        displayName: "Sub Procurment Plan",
        path: "SubProcurmentPlan",
      },
    ];

    list2 = ["Vendors and Items", "Budgets", "Inventory", "Settings"];
    actions = [];
    actionButtons = [
      { displayName: "Item Rejected", path: "item-rejected", number: "1" },
    ];
    break;

  case "PurchaseDivisionHOD":
    list1 = [
      {
        displayName: "Sub Procurment Plan",
        path: "NewSubProcurmentPlan",
      },
      {
        displayName: "Master Procurement Plan",
        path: "RequesttoInitiateMasterProcurementPlan",
      },
    ];
    list2 = ["Vendors and Items", "Budgets", "Inventory", "Settings"];

    actions = [];

    actionButtons = [
      {
        displayName: "New Sub Procurement Plans",
        path: "NewSubProcurmentPlan",
        number: "2",
      },
    ];
    break;

  case "ProcurementCommittee":
    list1 = [
      {
        displayName: "Master Procurement Plan",
        path: "PCMasterProcurmentPlan",
      },
      {
        displayName: "Finalized Master Procurement Plan",
        path: "FinalizedMasterProcurementPlan",
      },
    ];

    list2 = [
      "Vendors and Items",
      "Budgets",
      "Committee Members",
      "Inventory",
      "Settings",
    ];
    actions = [
      {
        displayName: "Evaluate Master Procurement Plan",
        path: "evaluate-master-procurement-plan",
      },
      {
        displayName: "Send Letters to Vendors",
        path: "send-lettes-to-vendors",
      },
      { displayName: "View TEC Report", path: "view-tec-report" },
      {
        displayName: "View Minutes of Procurement Committee",
        path: "view-minutes-of-procurement-committee",
      },
    ];

    actionButtons = [
      {
        displayName: "New Master Procurement plan for Evaluate",
        path: "new-master-procurement-plan-for-evaluate-PC",
        number: "2",
      },
      {
        displayName: "New Finalized Master Procurement plan",
        path: "new-finalized-master-procurement-plan-PC",
        number: "3",
      },
    ];
    break;
  case "CoparateCommunicationDivision":
    list1 = [];

    list2 = [
      "Vendors and Items",
      "Budgets",
      "Committee Members",
      "Inventory",
      "Settings",
    ];
    actions = [{ displayName: "Publish Paper Ad", path: "publish-papaer-ad" }];

    actionButtons = [];
    break;
  case "Vendor":
    list1 = [
      { displayName: "Bid Tender", path: "BidTender" },
      { displayName: "Bid History", path: "BidHistory" },
      { displayName: "Purchase Orders", path: "PurchaseOrder-vendor" },
      { displayName: "Good Receive Note", path: "VGoodReceiveNote" },
    ];

    list2 = ["Settings"];
    actions = [
      { displayName: "Bid Tender", path: "bid-tender" },
      { displayName: "Bid History", path: "bid-history" },
      { displayName: "View Invoice", path: "view-invoice" },
      { displayName: "Items to be Shipped", path: "items-to-be-shipped" },
    ];

    actionButtons = [
      { displayName: "Pre Bid Meeting Date -2023/06/14" },
      { displayName: "Bid Approved", path: "bid-approved", number: "2" },
      {
        displayName: "Verification Statuses Evaluated",
        path: "verification-statuses-evaluated",
        number: "1",
      },
      {
        displayName: "New Purchase Order",
        path: "new-purchase-order",
        number: "2",
      },
      { displayName: "New GRN", path: "new-grn", number: "3" },
      {
        displayName: "Payment Received",
        path: "payment-received",
        number: "2",
      },
    ];
    break;
  case "BidOpeningCommittee":
    list1 = [
      { displayName: "Auctions", path: "Auctions-BOC" },
    ];

    list2 = ["Settings"];
    actions = [{ displayName: "Manage Auction", path: "manage-auction" }];

    actionButtons = [{ displayName: "Pre Bid Meeting Date - 2023/06/14" }];
    break;

  case "InternalAuditor":
    list1 = [
      {
        displayName: "Finalized Master Procurement Plan",
        path: "IAFinalizedMasterProcurementPlan",
      },
    ];

    list2 = ["Vendors and Items", "Budgets", "Inventory", "Settings"];
    actions = [];

    actionButtons = [
      {
        displayName: "New Master Procurement plan for Evaluate",
        path: "ia-new-master-procurement-plan-for-evaluate",
        number: "2",
      },
    ];
    break;

  case "DirectorGeneral":
    list1 = [
      {
        displayName: "Master Procurement Plan",
        path: "DGMasterProcurementPlan",
      },
    ];

    list2 = ["Vendors and Items", "Budgets", "Inventory", "Settings"];
    actions = [
      {
        displayName: "View Finalized Master Procurement Plan",
        path: "view-finalized-master-procurement-plan",
      },
    ];

    actionButtons = [
      {
        displayName: "New Items to Evaluate",
        path: "new-items-to-evaluate",
        number: "2",
      },
    ];
    break;

  case "FinanceDivisionAccountant":
    list1 = [];

    list2 = ["Vendors and Items", "Budgets", "Inventory", "Settings"];
    actions = [{ displayName: "View Invoices", path: "view-invoices" }];

    actionButtons = [
      {
        displayName: "Invoice Need to Pay",
        path: "invoice-need-to-pay",
        number: "2",
      },
    ];
    break;

  case "InventoryManager":
    list1 = [];

    list2 = ["Vendors and Items", "Budgets", "Inventory", "Settings"];
    actions = [
      { displayName: "View Stock", path: "view-stock" },
      { displayName: "View Assets Registry", path: "view-assets-registry" },
    ];

    actionButtons = [];
    break;

  case "TecCommitteeMember":
    list1 = [
      {
        displayName: "Master Procurement Plan",
        path: "view-master-procurement-plan-tec",
      },
    ];
    list2 = ["Vendors and Items", "Committee Members", "Inventory", "Settings"];

    actions = [
      {
        displayName: "View Master Procurement Plan",
        path: "view-master-procurement-plan-tec",
      },
      { displayName: "Vendor Selection", path: "vendor-selection" },
      {
        displayName: "Revise Vendor Selection",
        path: "revise-vendor-selection",
      },
    ];

    actionButtons = [
      {
        displayName: "New Master Procurement plan for Evaluate",
        path: "new-master-procurement-plan-for-evaluate-tec",
        number: "2",
      },
      {
        displayName: "Rejected Item Modified",
        path: "rejected-item-modified-tec",
        number: "2",
      },
      { displayName: "Auction End", path: "auction-end=tec", number: "2" },
      { displayName: "Vendor Rejected", path: "vendor-rejected-tec", number: "2" },
    ];
    break;
  default:
}

export { user, list1, list2, actions, actionButtons };
