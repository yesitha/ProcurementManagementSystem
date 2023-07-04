import "./App.css";
import ManageAuction from "./pages/BidOpeningCommitee/ManageAuction/ManageAuction";
import Dashboard from "./pages/Dashboard/Dashboard";
import NotificationPage from "./pages/NotificationPage/NotificationPage";
import SignUp from "./pages/SignUp/SignUp";
import FinalizedMasterProcurementPlan from "./pages/ProcurementCommitee/FinalizedMasterProcurementPlan/FinalizedMasterProcurementPlan";
import MasterProcurementPlanStatus from "./pages/MasterProcurementPlanStatus/MasterProcurementPlanStatus";
import ViewMasterProcurementPlan from "./pages/ViewMasterProcurementPlan/ViewMasterProcurementPlan";
import AddItemtoSubProcurementPlan from "./pages/AddItemtoSubProcurementPlan/AddItemtoSubProcurementPlan";
import AddNewItemtoSubProcurementPlan from "./pages/AddNewItemtoSubProcurementPlan/AddNewItemToSubProcurementPlan";
import Login from "./pages/Login/Login";
import CreateModifyTECCommittee from "./pages/CreateModifyTECCommittee/CreateModifyTECCommittee";
import ViewFinalizedMasterProcurementPlans from "./pages/Internal Auditor/ViewFinalizedMasterProcurementPlans/ViewFinalizedMasterProcurementPlans";
import AuditFinalizedMasterProcurementPlan from "./pages/Internal Auditor/AuditFinalizedMasterProcurementPlan/AuditFinalizedMasterProcurementPlan";
import ItemstobeShipped from "./pages/Items to be Shipped/ItemstobeShipped";
import Stock from "./pages/Stock/Stock";
import DGViewFinalizedMasterProcurementPlans from "./pages/Director General/DGViewFinalizedMasterProcurementPlans/DGViewFinalizedMasterProcurementPlans";
import EvaluateFinalizedMasterProcurementPlan from "./pages/Director General/EvaluateFinalizedMasterProcurementPlan/EvaluateFinalizedMasterProcurementPlan";
import ApprovalForMasterProcurementPlan from "./pages/TEC Committee/ApprovalForMasterProcurementPlan/ApprovalForMasterProcurementPlan";
import CreateModifyBidOpeningCommittee from "./pages/Procurement Officer/CreateModifyBidOpeningCommittee/CreateModifyBidOpeningCommittee";
import MasterProcurementPlan from "./pages/ProcurementCommitee/MasterProcurementPlan/MasterProcurementPlan";
import BidTender from "./pages/Vendor/BidTender/BidTender";
import RequesttoInitiateSubProcurementPlan from "./pages/RequesttoInitiateSubProcurementPlan/RequesttoInitiateSubProcurementPlan";
import ViewSubProcurementPlan from "./pages/ViewSubProcurementPlan/ViewSubProcurementPlan";
import ApprovedItemList from "./pages/ProcurementCommitee/ApprovedItemList/ApprovedItemList";
import PublishPaperAd from "./pages/CoparateCommunicationDivision/PublishPaperAd/PublishPaperAd";
import BidDetails from "./pages/Procurement Officer/BidDetails/BidDetails";
import ItemDetails from "./pages/CoparateCommunicationDivision/ItemDetails/ItemDetails";
import BidDetailsView from "./pages/Procurement Officer/BidDetailsView/BidDetailsView";
import VendorSelection from "./pages/TEC Committee/Vendor Selection/VendorSelection";
import TecReport from "./pages/ProcurementCommitee/TecReport/TecReport";
import TecReportView from "./pages/ProcurementCommitee/TecReportView/TecReportView";
import AddNewItem from "./pages/InventoryManager/AddNewItem/AddNewItem";
import GoodsReceivedNote from "./pages/GoodsReceivedNote/GoodsReceivedNote";
import ViewGRN from "./pages/ViewGRN/ViewGRN";
import ViewInvoices from "./pages/ViewInvoices/ViewInvoices";
import Invoice from "./pages/Procurement Officer/Invoice(companyside)/Invoice";
import GRN from "./pages/Vendor/GRN/GRN";
import CreateInvoice2 from "./pages/Vendor/CreateInvoice2/CreateInvoice2";
import SendInvoice from "./pages/Vendor/SendInvoice/SendInvoice";
import UploadPaymentVoucher from "./pages/FinanceDivisionAccountant/UploadPaymentVouncher/UploadPaymentVoucher";
import AddItemstoGRN from "./pages/FinanceDivisionHOD/AddItemstoGRN/AddItemstoGRN";
import InvoicestobePaid from "./pages/FinanceDivisionHOD/InvoicestobePaid/InvoicestobePaidFin";
import ReviseVendorSelection from "./pages/TEC Committee/Revise Vendor Selection/ReviseVendorSelection";
import { Route, Routes } from "react-router-dom";
import TenderDetails from "./pages/Vendor/Tender Details/TenderDetails";
import BidHistory from "./pages/Vendor/BidHistory/BidHistory";
import SideNavBar from "./components/SideNavigationBar/SideNavBar";
import { user, list1, list2 } from "./pages/Usermanage";
import InvoicesneedtobePaid from "./pages/FinanceDivisionAccountant/InvoicesneedtobePaid/InvoicesneedtobePaid";
import ViewMasterProcurementPlanProc from "./pages/Procurement Officer/ViewMasterProcurementPlanProc/ViewMasterProcurementPlanProc";
import PurchaseOrder from "./pages/Procurement Officer/PurchaseOrder/PurchaseOrder";
import { useSelector } from "react-redux";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import AddItemstoPO from "./pages/Procurement Officer/AddItemstoPO/AddItemstoPO";
import AuditReport from "./pages/Procurement Officer/AuditReport/AuditReport";
import PurchseOrdersVendor from "./pages/Vendor/PurchaseOrdersVendor/PurchseOrdersVendor";
import PurchaseOrderPreview from "./pages/Vendor/PurchaseOrderPreview/PurchaseOrderPreview";
import SendPurchaseOrder from "./pages/Procurement Officer/SendPurchaseOrder/SendPurchaseOrder";
import InvoiceVendorside from "./pages/Vendor/Invoice(vendorside)/Invoice(vendorside)";
import CreateSubProcurementPlan from "./pages/Create SubProcurement Plan Division HOD/CreateSubProcurementPlan";
import CreateMasterProcurementPlan from "./pages/CreateMasterProcurementPlan/CreateMasterProcurementPlan";
import EvaluateVendorFinanceStatus from "./pages/Procurement Officer/Evaluate Vendor Finance Status/EvaluateVendorFinanceStatus";
import MasterProcurementPlanTEC from "./pages/TEC Committee/MasterProcurementPlanTEC/MasterProcurementPlanTEC";
import ViewItemTEC from "./pages/TEC Committee/ViewItemTEC/ViewItemTEC";
import ViewItemPC from "./pages/ProcurementCommitee/ViewItemPC/ViewItemPC";
import ApprovalForMasterProcurementPlanPC from "./pages/ProcurementCommitee/ApprovalForMasterProcurementPlanPC/ApprovalForMasterProcurementPlanPC";
import POVerificationSubmit from "./pages/Vendor/POVerification Submit/POVerificationSubmit";
import IssueItem from "./pages/InventoryManager/IssueItem/IssueItem";
import AssetRegistry from "./pages/Assets Registry/AssetRegistry";
import LetterofAcceptance from "./pages/Vendor/Letter of Acceptance/LetterofAcceptance";
import PDViewSubProcurementPlan from "./pages/Dicvision HOD/PDViewSubProcurementPlan/PDViewSubProcurementPlan";
import Signup from "./pages/SignUp/SignUp";
import NotFound404 from "./pages/NotFoundPage/NotFound404";
import { Home } from "./pages/Home/Home";
import NoAccess403 from "./pages/No Access Page/NoAccess";

import { Navigate } from "react-router-dom/dist";

const PrivateRoute = ({ authorized, allowedUserTypes, ...props }) => {
  // const userType = sessionStorage.getItem('userType');
  const userType = user.userType;


 
  if (!authorized) {
    return <Navigate to="/sign-in" />;
  }else if( !allowedUserTypes.includes(userType))
  {
    return <Navigate to="/no-access" />;
  }

  return props.component;
};

function App() {
// const isAuthenticated = !!sessionStorage.getItem("user");
const isAuthenticated = true;
  
  

  return (
    <div className="app-container">
      <SideNavBar list1={list1} list2={list2} user={user} />
      <div className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          
          <Route path="/sign-in" element={<Login />} />
          <Route path="*" element={<NotFound404/>}></Route>
          <Route path="/no-access" element={<NoAccess403 />} />
          <Route
            path="/view-notification"
            element={
              <PrivateRoute
                component={<NotificationPage />}
                authorized={isAuthenticated}
                allowedUserTypes={[
                  "Vendor",
                  "HOD",
                  "ProcurementOfficer",
                  "ProcurementCommittee",
                  "InventoryManager",
                  "DirectorGeneral",
                  "FinanceDivisionAccountant",
                  "TecCommitteeMember",
                  "CoparateCommunicationDivision",
                ]}
              />
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute
                component={<Dashboard />}
                authorized={isAuthenticated}
                allowedUserTypes={[
                  "Vendor",
                  "HOD",
                  "ProcurementOfficer",
                  "ProcurementCommittee",
                  "InventoryManager",
                  "DirectorGeneral",
                  "FinanceDivisionAccountant",
                  "TecCommitteeMember",
                  "CoparateCommunicationDivision",
                ]}
              />
            }
          />
          {/* Division HOD */}
          <Route
            path="/add-new-item"
            element={
              <PrivateRoute
                component={<AddNewItemtoSubProcurementPlan />}
                authorized={isAuthenticated}
                allowedUserTypes={["HOD"]}
              />
            }
          />
          <Route
            path="/add-item-to-subprocurement-Plan/:division/:selectedSubId"
            element={
              <PrivateRoute
                component={<AddItemtoSubProcurementPlan />}
                authorized={isAuthenticated}
                allowedUserTypes={["HOD"]}
              />
            }
          />
          <Route
            path="/SubProcurmentPlan/"
            element={
              <PrivateRoute
                component={<CreateSubProcurementPlan />}
                authorized={isAuthenticated}
                allowedUserTypes={["HOD"]}
              />
            }
          />
          <Route
            path="/SubProcurmentPlan/:selectedSubIdfomNextPage"
            element={
              <PrivateRoute
                component={<CreateSubProcurementPlan />}
                authorized={isAuthenticated}
                allowedUserTypes={["HOD"]}
              />
            }
          />
          {/* Purchase Division HOD */}
          <Route
            path="/NewSubProcurmentPlan"
            element={
              <PrivateRoute
                component={<CreateMasterProcurementPlan />}
                authorized={isAuthenticated}
                allowedUserTypes={["PurchaseDivisionHOD"]}
              />
            }
          />
          <Route
            path="/RequesttoInitiateMasterProcurementPlan"
            element={
              <PrivateRoute
                component={<RequesttoInitiateSubProcurementPlan />}
                authorized={isAuthenticated}
                allowedUserTypes={["PurchaseDivisionHOD"]}
              />
            }
          />
          <Route
            path="/pd-view-sub-procurement-plan/:selectedSubId/:divisionName"
            element={
              <PrivateRoute
                component={<PDViewSubProcurementPlan />}
                authorized={isAuthenticated}
                allowedUserTypes={["PurchaseDivisionHOD"]}
              />
            }
          />
          {/* ProcurementOfficer */}
          <Route
            path="/ViewSubProcurementPlan"
            element={
              <PrivateRoute
                component={<ViewSubProcurementPlan />}
                authorized={isAuthenticated}
                allowedUserTypes={["ProcurementOfficer"]}
              />
            }
          />
          <Route
            path="/MasterProcurmentPlan"
            element={
              <PrivateRoute
                component={<ViewMasterProcurementPlanProc />}
                authorized={isAuthenticated}
                allowedUserTypes={["ProcurementOfficer"]}
              />
            }
          />
          <Route
            path="/master-procurement-plan-status/:subId"
            element={
              <PrivateRoute
                component={<MasterProcurementPlanStatus />}
                authorized={isAuthenticated}
                allowedUserTypes={["ProcurementOfficer"]}
              />
            }
          />
          <Route
            path="/view-master-procurement-plan/:mppId"
            element={
              <PrivateRoute
                component={<ViewMasterProcurementPlan />}
                authorized={isAuthenticated}
                allowedUserTypes={["ProcurementOfficer"]}
              />
            }
          />
          <Route
            path="/PurchaseOrder"
            element={
              <PrivateRoute
                component={<PurchaseOrder />}
                authorized={isAuthenticated}
                allowedUserTypes={["ProcurementOfficer"]}
              />
            }
          />
          <Route
            path="/add-item-to-PO"
            element={
              <PrivateRoute
                component={<AddItemstoPO />}
                authorized={isAuthenticated}
                allowedUserTypes={["ProcurementOfficer"]}
              />
            }
          />
          <Route
            path="/send-purchase-order/:poId"
            element={
              <PrivateRoute
                component={<SendPurchaseOrder />}
                authorized={isAuthenticated}
                allowedUserTypes={["ProcurementOfficer"]}
              />
            }
          />
          <Route
            path="/GoodReceiveNote"
            element={
              <PrivateRoute
                component={<AddItemstoGRN />}
                authorized={isAuthenticated}
                allowedUserTypes={["ProcurementOfficer"]}
              />
            }
          />
          <Route
            path="/grn-view/:poId/:grnId"
            element={
              <PrivateRoute
                component={<GoodsReceivedNote />}
                authorized={isAuthenticated}
                allowedUserTypes={["ProcurementOfficer"]}
              />
            }
          />
          <Route
            path="/appoint-bidopening-committee"
            element={
              <PrivateRoute
                component={<ViewMasterProcurementPlanProc />}
                authorized={isAuthenticated}
                allowedUserTypes={["ProcurementOfficer"]}
              />
            }
          />
          <Route
            path="/create-modify-bidopeningC/:mppId"
            element={
              <PrivateRoute
                component={<CreateModifyBidOpeningCommittee />}
                authorized={isAuthenticated}
                allowedUserTypes={["ProcurementOfficer"]}
              />
            }
          />
          <Route
            path="/evaluate-master-procurementplan"
            element={
              <PrivateRoute
                component={<ViewMasterProcurementPlanProc />}
                authorized={isAuthenticated}
                allowedUserTypes={["ProcurementOfficer"]}
              />
            }
          />
          <Route
            path="/create-purchase-order"
            element={
              <PrivateRoute
                component={<PurchaseOrder />}
                authorized={isAuthenticated}
                allowedUserTypes={["ProcurementOfficer"]}
              />
            }
          />
          <Route
            path="/create-grn"
            element={
              <PrivateRoute
                component={<AddItemstoGRN />}
                authorized={isAuthenticated}
                allowedUserTypes={["ProcurementOfficer"]}
              />
            }
          />
          <Route
            path="/evaluate-vendor-fianace-status"
            element={
              <PrivateRoute
                component={<EvaluateVendorFinanceStatus />}
                authorized={isAuthenticated}
                allowedUserTypes={["ProcurementOfficer"]}
              />
            }
          />
          <Route
            path="/view-masterprocurement-plan"
            element={
              <PrivateRoute
                component={<ViewMasterProcurementPlan />}
                authorized={isAuthenticated}
                allowedUserTypes={["ProcurementOfficer"]}
              />
            }
          />
          <Route
            path="/create-modify-teccommittee/:mppId"
            element={
              <PrivateRoute
                component={<CreateModifyTECCommittee />}
                authorized={isAuthenticated}
                allowedUserTypes={["ProcurementOfficer"]}
              />
            }
          />
          <Route
            path="/new-master-procurement-plan-for-evaluate"
            element={
              <PrivateRoute
                component={<ViewMasterProcurementPlanProc />}
                authorized={isAuthenticated}
                allowedUserTypes={["ProcurementOfficer"]}
              />
            }
          />
          <Route
            path="/auctions-end"
            element={
              <PrivateRoute
                component={<BidDetails />}
                authorized={isAuthenticated}
                allowedUserTypes={["ProcurementOfficer"]}
              />
            }
          />
          <Route
            path="/bid-details-view/:itemId"
            element={
              <PrivateRoute
                component={<BidDetailsView />}
                authorized={isAuthenticated}
                allowedUserTypes={["ProcurementOfficer"]}
              />
            }
          />
          <Route
            path="/internal-auditor-report-availble"
            element={
              <PrivateRoute
                component={<AuditReport />}
                authorized={isAuthenticated}
                allowedUserTypes={["ProcurementOfficer"]}
              />
            }
          />
          <Route
            path="/approved-items-from-dg"
            element={
              <PrivateRoute
                component={<AddItemstoPO />}
                authorized={isAuthenticated}
                allowedUserTypes={["ProcurementOfficer"]}
              />
            }
          />
          <Route
            path="/item-rejected-by-vendors"
            element={
              <PrivateRoute
                component={<AddItemstoGRN />}
                authorized={isAuthenticated}
                allowedUserTypes={["ProcurementOfficer"]}
              />
            }
          />
          <Route
            path="/new-invoices-available"
            element={
              <PrivateRoute
                component={<InvoicestobePaid />}
                authorized={isAuthenticated}
                allowedUserTypes={["ProcurementOfficer"]}
              />
            }
          />

          <Route
            path="/view-invoice/:invoiceId"
            element={
              <PrivateRoute
                component={<Invoice />}
                authorized={isAuthenticated}
                allowedUserTypes={["ProcurementOfficer"]}
              />
            }
          />


          {/*Tec Committee Member */}
          <Route
            path="/view-master-procurement-plan-tec"
            element={
              <PrivateRoute
                component={<MasterProcurementPlanTEC />}
                authorized={isAuthenticated}
                allowedUserTypes={["TecCommitteeMember"]}
              />
            }
          />
          <Route
            path="/approval-for-master-procurement-plan-tec/:mppId"
            element={
              <PrivateRoute
                component={<ApprovalForMasterProcurementPlan />}
                authorized={isAuthenticated}
                allowedUserTypes={["TecCommitteeMember"]}
              />
            }
          />
          <Route
            path="/view-item-tec/:itemId/:mppId"
            element={
              <PrivateRoute
                component={<ViewItemTEC />}
                authorized={isAuthenticated}
                allowedUserTypes={["TecCommitteeMember"]}
              />
            }
          />
          <Route
            path="/vendor-selection"
            element={
              <PrivateRoute
                component={<VendorSelection />}
                authorized={isAuthenticated}
                allowedUserTypes={["TecCommitteeMember"]}
              />
            }
          />
          <Route
            path="/revise-vendor-selection"
            element={
              <PrivateRoute
                component={<ReviseVendorSelection />}
                authorized={isAuthenticated}
                allowedUserTypes={["TecCommitteeMember"]}
              />
            }
          />
          <Route
            path="/new-master-procurement-plan-for-evaluate-tec"
            element={
              <PrivateRoute
                component={<MasterProcurementPlanTEC />}
                authorized={isAuthenticated}
                allowedUserTypes={["TecCommitteeMember"]}
              />
            }
          />
          <Route
            path="/rejected-item-modified"
            element={
              <PrivateRoute
                component={<CreateMasterProcurementPlan />}
                authorized={isAuthenticated}
                allowedUserTypes={["TecCommitteeMember"]}
              />
            }
          />
          <Route
            path="/vendor-rejected-tec"
            element={
              <PrivateRoute
                component={<ReviseVendorSelection />}
                authorized={isAuthenticated}
                allowedUserTypes={["TecCommitteeMember"]}
              />
            }
          />
          <Route
            path="/PCMasterProcurmentPlan"
            element={
              <PrivateRoute
                component={<MasterProcurementPlan />}
                authorized={isAuthenticated}
                allowedUserTypes={["ProcurementCommittee"]}
              />
            }
          />
          <Route
            path="/PCApprovalforMasterProcurmentPlan/:mppId"
            element={
              <PrivateRoute
                component={<ApprovalForMasterProcurementPlanPC />}
                authorized={isAuthenticated}
                allowedUserTypes={["ProcurementCommittee"]}
              />
            }
          />
          <Route
            path="/PCviewitem/:itemId/:mppId"
            element={
              <PrivateRoute
                component={<ViewItemPC />}
                authorized={isAuthenticated}
                allowedUserTypes={["ProcurementCommittee"]}
              />
            }
          />
          <Route
            path="/ApprovedItemList/:mppId"
            element={
              <PrivateRoute
                component={<ApprovedItemList />}
                authorized={isAuthenticated}
                allowedUserTypes={["ProcurementCommittee"]}
              />
            }
          />
          <Route
            path="/FinalizedMasterProcurementPlan"
            element={
              <PrivateRoute
                component={<FinalizedMasterProcurementPlan />}
                authorized={isAuthenticated}
                allowedUserTypes={["ProcurementCommittee"]}
              />
            }
          />
          <Route
            path="/evaluate-master-procurement-plan"
            element={
              <PrivateRoute
                component={<MasterProcurementPlan />}
                authorized={isAuthenticated}
                allowedUserTypes={["ProcurementCommittee"]}
              />
            }
          />
          <Route
            path="/view-tec-report"
            element={
              <PrivateRoute
                component={<TecReport />}
                authorized={isAuthenticated}
                allowedUserTypes={["ProcurementCommittee"]}
              />
            }
          />
          <Route
            path="/tec-report-view/:itemId"
            element={
              <PrivateRoute
                component={<TecReportView />}
                authorized={isAuthenticated}
                allowedUserTypes={["ProcurementCommittee"]}
              />
            }
          />
          <Route
            path="/new-master-procurement-plan-for-evaluate-PC"
            element={
              <PrivateRoute
                component={<MasterProcurementPlan />}
                authorized={isAuthenticated}
                allowedUserTypes={["ProcurementCommittee"]}
              />
            }
          />
          <Route
            path="/new-finalized-master-procurement-plan-PC"
            element={
              <PrivateRoute
                component={<FinalizedMasterProcurementPlan />}
                authorized={isAuthenticated}
                allowedUserTypes={["ProcurementCommittee"]}
              />
            }
          />
          <Route
            path="/publish-papaer-ad"
            element={
              <PrivateRoute
                component={<PublishPaperAd />}
                authorized={isAuthenticated}
                allowedUserTypes={["CoparateCommunicationDivision"]}
              />
            }
          />
          <Route
            path="/publish-papaer-ad-view-item/:itemId"
            element={
              <PrivateRoute
                component={<ItemDetails />}
                authorized={isAuthenticated}
                allowedUserTypes={["CoparateCommunicationDivision"]}
              />
            }
          />
          <Route
            path="/bid-tender/:vendorId"
            element={
              <PrivateRoute
                component={<BidTender />}
                authorized={isAuthenticated}
                allowedUserTypes={["Vendor"]}
              />
            }
          />
          <Route
            path="/tender-details/:itemId"
            element={
              <PrivateRoute
                component={<TenderDetails />}
                authorized={isAuthenticated}
                allowedUserTypes={["Vendor"]}
              />
            }
          />
         
          <Route
            path="/sign-up"
            element={
              <PrivateRoute
                component={<Signup/>}
                authorized={isAuthenticated}
                allowedUserTypes={["Vendor"]}
              />
            }
          />
          <Route
            path="/bid-history/:vendorId"
            element={
              <PrivateRoute
                component={<BidHistory />}
                authorized={isAuthenticated}
                allowedUserTypes={["Vendor"]}
              />
            }
          />
          <Route
            path="/po-verification-submit/:poId"
            element={
              <PrivateRoute
                component={<POVerificationSubmit />}
                authorized={isAuthenticated}
                allowedUserTypes={["Vendor"]}
              />
            }
          />
          <Route
            path="/letter-of-acceptance/:itemId"
            element={
              <PrivateRoute
                component={<LetterofAcceptance />}
                authorized={isAuthenticated}
                allowedUserTypes={["Vendor"]}
              />
            }
          />
          <Route
            path="/PurchaseOrder-vendor/:vendorId"
            element={
              <PrivateRoute
                component={<PurchseOrdersVendor />}
                authorized={isAuthenticated}
                allowedUserTypes={["Vendor"]}
              />
            }
          />
          <Route
            path="/PurchaseOrder-vendor-view/:poId"
            element={
              <PrivateRoute
                component={<PurchaseOrderPreview />}
                authorized={isAuthenticated}
                allowedUserTypes={["Vendor"]}
              />
            }
          />
          <Route
            path="/VGoodReceiveNote/:vendorId"
            element={
              <PrivateRoute
                component={<ViewGRN />}
                authorized={isAuthenticated}
                allowedUserTypes={["Vendor"]}
              />
            }
          />
          <Route
            path="/grn/:poId/:grnId"
            element={
              <PrivateRoute
                component={<GRN />}
                authorized={isAuthenticated}
                allowedUserTypes={["Vendor"]}
              />
            }
          />
          <Route
            path="/create-invoice/:poId/:grnId"
            element={
              <PrivateRoute
                component={<CreateInvoice2 />}
                authorized={isAuthenticated}
                allowedUserTypes={["Vendor"]}
              />
            }
          />
          <Route
            path="/send-invoice/:grnId"
            element={
              <PrivateRoute
                component={<SendInvoice />}
                authorized={isAuthenticated}
                allowedUserTypes={["Vendor"]}
              />
            }
          />
          <Route
            path="view-invoice-vendor/:venodrId"
            element={
              <PrivateRoute
                component={<ViewInvoices />}
                authorized={isAuthenticated}
                allowedUserTypes={["Vendor"]}
              />
            }
          />
          <Route
            path="/invoice-view/:invoiceId"
            element={
              <PrivateRoute
                component={<InvoiceVendorside />}
                authorized={isAuthenticated}
                allowedUserTypes={["Vendor"]}
              />
            }
          />
          <Route
            path="/items-to-be-shipped"
            element={
              <PrivateRoute
                component={<ItemstobeShipped />}
                authorized={isAuthenticated}
                allowedUserTypes={["Vendor"]}
              />
            }
          />
          <Route
            path="/bid-approved"
            element={
              <PrivateRoute
                component={<BidHistory />}
                authorized={isAuthenticated}
                allowedUserTypes={["Vendor"]}
              />
            }
          />
          <Route
            path="/verification-statuses-evaluated"
            element={
              <PrivateRoute
                component={<BidHistory />}
                authorized={isAuthenticated}
                allowedUserTypes={["Vendor"]}
              />
            }
          />
          <Route
            path="/new-grn"
            element={
              <PrivateRoute
                component={<ViewGRN />}
                authorized={isAuthenticated}
                allowedUserTypes={["Vendor"]}
              />
            }
          />
          <Route
            path="/payment-received"
            element={
              <PrivateRoute
                component={<ViewInvoices />}
                authorized={isAuthenticated}
                allowedUserTypes={["Vendor"]}
              />
            }
          />
          <Route
            path="/manage-auction"
            element={
              <PrivateRoute
                component={<ManageAuction />}
                authorized={isAuthenticated}
                allowedUserTypes={["BidOpeningCommittee"]}
              />
            }
          />
          <Route
            path="/Auctions-BOC"
            element={
              <PrivateRoute
                component={<ManageAuction />}
                authorized={isAuthenticated}
                allowedUserTypes={["BidOpeningCommittee"]}
              />
            }
          />
          <Route
            path="/IAFinalizedMasterProcurementPlan"
            element={
              <PrivateRoute
                component={<ViewFinalizedMasterProcurementPlans />}
                authorized={isAuthenticated}
                allowedUserTypes={["InternalAuditor"]}
              />
            }
          />
          <Route
            path="/audit-finalized-master-procurementplan/:mppId"
            element={
              <PrivateRoute
                component={<AuditFinalizedMasterProcurementPlan />}
                authorized={isAuthenticated}
                allowedUserTypes={["InternalAuditor"]}
              />
            }
          />
          <Route
            path="/ia-new-master-procurement-plan-for-evaluate"
            element={
              <PrivateRoute
                component={<ViewFinalizedMasterProcurementPlans />}
                authorized={isAuthenticated}
                allowedUserTypes={["InternalAuditor"]}
              />
            }
          />
          <Route
            path="/DGMasterProcurementPlan"
            element={
              <PrivateRoute
                component={<DGViewFinalizedMasterProcurementPlans />}
                authorized={isAuthenticated}
                allowedUserTypes={["DirectorGeneral"]}
              />
            }
          />
          <Route
            path="/view-finalized-master-procurement-plan"
            element={
              <PrivateRoute
                component={<DGViewFinalizedMasterProcurementPlans />}
                authorized={isAuthenticated}
                allowedUserTypes={["DirectorGeneral"]}
              />
            }
          />
          <Route
            path="/new-items-to-evaluate"
            element={
              <PrivateRoute
                component={<DGViewFinalizedMasterProcurementPlans />}
                authorized={isAuthenticated}
                allowedUserTypes={["DirectorGeneral"]}
              />
            }
          />
          <Route
            path="/evaluate-f-master-procurement-plan/:mppId"
            element={
              <PrivateRoute
                component={<EvaluateFinalizedMasterProcurementPlan />}
                authorized={isAuthenticated}
                allowedUserTypes={["DirectorGeneral"]}
              />
            }
          />
          <Route
            path="/view-invoices"
            element={
              <PrivateRoute
                component={<InvoicesneedtobePaid />}
                authorized={isAuthenticated}
                allowedUserTypes={["FinanceDivisionAccountant"]}
              />
            }
          />
          <Route
            path="/invoice-need-to-pay"
            element={
              <PrivateRoute
                component={<InvoicesneedtobePaid />}
                authorized={isAuthenticated}
                allowedUserTypes={["FinanceDivisionAccountant"]}
              />
            }
          />
          <Route
            path="/upload-payment-vouchar/:invoiceId"
            element={
              <PrivateRoute
                component={<UploadPaymentVoucher />}
                authorized={isAuthenticated}
                allowedUserTypes={["FinanceDivisionAccountant"]}
              />
            }
          />
          <Route
            path="/view-stock"
            element={
              <PrivateRoute
                component={<Stock />}
                authorized={isAuthenticated}
                allowedUserTypes={["InventoryManager"]}
              />
            }
          />
          <Route
            path="/add-new-item=im"
            element={
              <PrivateRoute
                component={<AddNewItem />}
                authorized={isAuthenticated}
                allowedUserTypes={["InventoryManager"]}
              />
            }
          />
          <Route
            path="/issue-item"
            element={
              <PrivateRoute
                component={<IssueItem />}
                authorized={isAuthenticated}
                allowedUserTypes={["InventoryManager"]}
              />
            }
          />
          <Route
            path="/view-assets-registry"
            element={
              <PrivateRoute
                component={<AssetRegistry />}
                authorized={isAuthenticated}
                allowedUserTypes={["InventoryManager"]}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
