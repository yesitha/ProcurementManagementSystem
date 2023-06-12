let list1 = [];
let list2 = [];
let actions = [];
let actionButtons = [];

const user = {
  firstname: "John",
  lastname: "Doe",
  email: "johndoe@gmail.com",
  designation: "Tec Committee Member",
  userType: 'TecCommitteeMember',
  department: "Finance",
  phone: "1234567890",
  address: "123, ABC Street, XYZ City, 123456",
  gender: "Male",
  profilePic: "https://www.w3schools.com/howto/img_avatar.png",
};

const currentUser=user.userType;
switch (currentUser) {
  case 'Admin':
    break;
  case 'ProcurementOfficer':
    list1 = [
      "Sub Procurment Plan",
      "Master Procurement Plan",
      "Purchase Orders",
      "Good Receive Note",
      "Payment Voucher",
    ];
    list2 = ["Vendors and Items", "Budgets", "Inventory", "Settings"];
    actions = [
      "Set Pre Bid Meeting Date",
      "Appoint Bid Opening Committee",
      "Evaluate Master Procurement Plan",
      "Create Purchase Order",
      "Create GRN",
      "Evaluate Vendor Fianace Status",
      "View Master Procurement Plan",
    ];

    actionButtons = [
      { name: "New Master Procurement plan for Evaluate", number: "2" },
      { name: "Rejected Item Modified", number: "1" },
      { name: "Auctions End", number: "1/30" },
      { name: "Vendor Rejected", number: "1" },
      { name: "Set Pre Bid Meeting Date" },
      { name: "Internal Auditor Report Availble" },
      { name: "Approved Items from DG", number: "10" },
      { name: "New Invoices Available", number: "10" },
    ];
    break;

  case 'HOD':
    list1 = [{
      displayName: "Sub Procurment Plan",
      path: "SubProcurmentPlan"
    }];

    list2 = ["Vendors and Items", "Budgets", "Inventory", "Settings"];
    actions = [];
    actionButtons = [
      { displayName: "Item Rejected",path:'item-rejected', number: "1" },
    ];
    break;

    case 'PurchaseDivisionHOD':
    list1 = [
        {
        displayName:"Sub Procurment Plan",
        path:"NewSubProcurmentPlan"},
        {
        displayName:"Master Procurement Plan",
        path:"RequesttoInitiateMasterProcurementPlan"}
    ];
    list2 = ["Vendors and Items", "Budgets", "Inventory", "Settings"];

    actions = [];

    actionButtons = [
      { displayName: "New Sub Procurement Plans",path:"NewSubProcurmentPlan", number: "2" },
    ];
    break;

    case 'TecCommitteeMember':
        list1 = [
            {
                displayName:"Master Procurement Plan",
                path:"view-master-procurement-plan"
            }
        ];
        list2 = ["Vendors and Items", "Committee Members", "Inventory", "Settings"];
    
        actions = [
            {displayName:"View Master Procurement Plan",
            path:"view-master-procurement-plan"},
            {displayName:"Vendor Selection",
            path:"vendor-selection"}, 
            {displayName:"Revise Vendor Selection",
            path:"revise-vendor-selection"}
        ];
    
        actionButtons = [
          { displayName: "New Master Procurement plan for Evaluate",path:"new-master-procurement-plan-for-evaluate", number: "2" },
          { displayName: "Rejected Item Modified",path:"rejected-item-modified", number: "2" },
          { displayName: "Auction End",path:"auction-end", number: "2" },
          { displayName: "Vendor Rejected",path:"vendor-rejected", number: "2" }
        ];
        break;
        default:
}

export { user, list1, list2, actions, actionButtons };
