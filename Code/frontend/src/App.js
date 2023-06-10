import "./App.css";
import ManageAuction from "./pages/BidOpeningCommitee/ManageAuction/ManageAuction";
import Dashboard from "./pages/Dashboard/Dashboard";
import NotificationPage from "./pages/NotificationPage/NotificationPage";
import CreateSubProcurementPlan from "./pages/Create SubProcurement Plan Division HOD/CreateSubProcurementPlan";
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
import MasterProcurementPlanEvalate from "./pages/TEC Committee/MasterProcurementPlanEvalate/MasterProcurementPlanEvalate";
import Stock from "./pages/Stock/Stock";
import DGViewFinalizedMasterProcurementPlans from "./pages/Director General/DGViewFinalizedMasterProcurementPlans/DGViewFinalizedMasterProcurementPlans";
import EvaluateFinalizedMasterProcurementPlan from "./pages/Director General/EvaluateFinalizedMasterProcurementPlan/EvaluateFinalizedMasterProcurementPlan";
import ApprovalForMasterProcurementPlan from "./pages/TEC Committee/ApprovalForMasterProcurementPlan/ApprovalForMasterProcurementPlan";
import ViewItem from "./pages/ProcurementCommitee/ViewItem/ViewItem";
import CreateModifyBidOpeningCommittee from "./pages/Procurement Officer/CreateModifyBidOpeningCommittee/CreateModifyBidOpeningCommittee";
import MasterProcurementPlan from "./pages/ProcurementCommitee/MasterProcurementPlan/MasterProcurementPlan";
import BidTender from "./pages/Vendor/BidTender/BidTender";
import RequesttoInitiateSubProcurementPlan from "./pages/RequesttoInitiateSubProcurementPlan/RequesttoInitiateSubProcurementPlan";
import ViewSubProcurementPlan from "./pages/ViewSubProcurementPlan/ViewSubProcurementPlan";
import ApprovedItemList from "./pages/ProcurementCommitee/ApprovedItemList/ApprovedItemList";
import PublishPaperAd from "./pages/CoparateCommunicationDivision/PublishPaperAd/PublishPaperAd";
import BidDetails from "./pages/Procurement Officer/BidDetails/BidDetails";
import ItemDetails from "./pages/CoparateCommunicationDivision/ItemDetails/ItemDetails";
import BidDetailsView from "./pages/Procurement Officer/BidDetails/BidDetails";
import VendorSelection from "./pages/TEC Committee/Vendor Selection/VendorSelection";
import TecReport from "./pages/ProcurementCommitee/TecReport/TecReport";
import TecReportView from "./pages/ProcurementCommitee/TecReportView/TecReportView";
import AddNewItem from "./pages/InventoryManager/AddNewItem/AddNewItem";
import GoodsReceivedNote from "./pages/GoodsReceivedNote/GoodsReceivedNote";
import ViewGRN from "./pages/ViewGRN/ViewGRN";
import Invoice from "./pages/Procurement Officer/Invoice(companyside)/Invoice";
import CreateInvoice from "./pages/Vendor/CreateInvoice/CreateInvoice";
import CreateInvoice2 from "./pages/Vendor/CreateInvoice2/CreateInvoice2";
import SendInvoice from "./pages/Vendor/SendInvoice/SendInvoice";
import InvoicestobePaid from "./pages/FinanceDivisionAccountant/InvoicestobePaid/InvoicestobePaid";
import UploadPaymentVoucher from "./pages/FinanceDivisionAccountant/UploadPaymentVouncher/UploadPaymentVoucher";
import AddItemstoGRN from "./pages/FinanceDivisionHOD/AddItemstoGRN/AddItemstoGRN";
import InvoicestobePaidFin from "./pages/FinanceDivisionHOD/InvoicestobePaid/InvoicestobePaidFin";
import ReviseVendorSelection from "./pages/TEC Committee/Revise Vendor Selection/ReviseVendorSelection";
import {Route , Routes} from "react-router-dom";

const USER_TYPES = {
  Procurement_Officer:"Procurement Officer"
}

const CURRENT_USER_TYPE=USER_TYPES.Procurement_Officer;

function App() {
  return (
    <div>
    <Routes>
      <Route path="/procurement%20officer%20login" element={<Login/>}></Route>
      <Route path="/procurement%20officer%20dashboard" element={<Dashboard/>}></Route>
      <Route path="/Sub%20Procurment%20Plan" element={<CreateSubProcurementPlan/>}></Route>
      <Route path="/Master%20Procurement%20Plan" element={<MasterProcurementPlan/>}></Route>
      {/* purchase order page */}
      <Route path="/Good%20Receive%20Note" element={<GoodsReceivedNote/>}></Route>
      <Route path="/Notification%Page" element={<NotificationPage/>}></Route>
      <Route path="/Appoint%20Bid%20Opening%20Committee" element={<CreateModifyBidOpeningCommittee/>}></Route>
      <Route Path="/Evaluate%20Master%20Procurement%20Plan" element={<MasterProcurementPlanStatus/>}></Route>

      <Route path="*" element={<div>Page Not Found!</div>}></Route>
    </Routes>
    </div>
  );
}
export default App;

      {/* <Login/> */}
      {/* <SignUp/> */}
      {/* <Dashboard/> */}
      {/* <ManageAuction/> */}
      {/* <NotificationPage/> */}
      {/* <CreateSubProcurementPlan/> */}
      {/* <PublishPaperAd/> */}
      {/* <FinalizedMasterProcurementPlan/> */}
      {/* <MasterProcurementPlanStatus/> */}
      {/* <ViewMasterProcurementPlan/> */}
      {/* <ApprovedItemList/> */}
      {/* <CreateModifyTECCommittee/> */}
      {/* <MasterProcurementPlanEvalate/> */}
      {/* <AddItemtoSubProcurementPlan/>  */}
      {/* <ItemDetails/> */}
      {/* <ApprovalForMasterProcurementPlan/> */}
      {/*ViewItem*/}
      {/* <CreateModifyBidOpeningCommittee/> */}
      {/* <ViewFinalizedMasterProcurementPlans/> */}
      {/* <AuditFinalizedMasterProcurementPlan/> */}
      {/* <BidTender/> */}
      {/* <BidDetails/> */}
      {/* <BidDetailsView/> */}
      {/* <VendorSelection/> */}
      {/* <MasterProcurementPlan/> */}
      {/* <Stock/> */}
      {/* <DGViewFinalizedMasterProcurementPlans/> */}
      {/* <EvaluateFinalizedMasterProcurementPlan/> */}
      {/*EvaluateFinalizedMasterProcurementPlan*/}
      {/*AddNewItem*/}
      {/* <CreateInvoice/> */}
      {/* <GoodsReceivedNote/> */}
      {/* <ViewGRN/> */}
      {/* <Invoice/> */}
      {/* <CreateInvoice2/> */}
      {/* <SendInvoice/> */}
      {/* <InvoicestobePaid/> */}
      {/* <UploadPaymentVoucher/> */}
      {/* <AddItemstoGRN/> */}
      {/* <InvoicestobePaidFin/> */}
      {/* <ReviseVendorSelection/> */}
      {/* <Stock/> */}
      {/* <AddNewItem /> */}