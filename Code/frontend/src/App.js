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
import ViewItem from "./pages/ProcurementCommitee/ViewItem/ViewItem";
import ApprovalForMasterProcurementPlan from "./pages/TEC Committee/ApprovalForMasterProcurementPlan/ApprovalForMasterProcurementPlan";
import ViewItemN from "./pages/ViewItem/ViewItem";
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
import CreateMasterProcurementPlan from "./pages/CreateMasterProcurementPlan/CreateMasterProcurementPlan";
import InvoicestobePaid from "./pages/FinanceDivisionHOD/InvoicestobePaid/InvoicestobePaidFin";
import ReviseVendorSelection from "./pages/TEC Committee/Revise Vendor Selection/ReviseVendorSelection";
import {Route , Routes} from "react-router-dom";
import TenderDetails from "./pages/Vendor/Tender Details/TenderDetails";
import BidHistory from "./pages/Vendor/BidHistory/BidHistory";
import SideNavBar from "./components/SideNavigationBar/SideNavBar";
import { user, list1, list2 } from './pages/Usermanage';
import Invoicesvendorside from "./pages/Vendor/Invoices(vendorside)/Invoices(vendorside)";
import InvoicesneedtobePaid from "./pages/FinanceDivisionAccountant/InvoicesneedtobePaid/InvoicesneedtobePaid";
import ViewMasterProcurementPlanProc from "./pages/Procurement Officer/ViewMasterProcurementPlanProc/ViewMasterProcurementPlanProc";
import PurchaseOrder from "./pages/Procurement Officer/PurchaseOrder/PurchaseOrder";
import Signup from "./pages/SignUp/SignUp";

function App() {
  return (


<div className="app-container">
  
      <SideNavBar list1={list1} list2={list2} user={user} />
      <div className="app-content">
       <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/view-notification' element={<NotificationPage/>}/>

        {/* Division HOD */}
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/item-rejected' element={<AddItemtoSubProcurementPlan/>}/>
        <Route path='/add-new-item' element={<AddNewItemtoSubProcurementPlan/>}/>
        <Route path='/add-item-to-subprocurement-Plan' element={<AddItemtoSubProcurementPlan/>}/>
        <Route path='/SubProcurmentPlan' element={<CreateSubProcurementPlan/>}/>

        {/* Purchase Division HOD */}
        <Route path='/NewSubProcurmentPlan' element={<CreateMasterProcurementPlan/>}/>
        <Route path='/RequesttoInitiateMasterProcurementPlan' element={<RequesttoInitiateSubProcurementPlan/>}/>

        {/* ProcurementOfficer */}
        <Route path='/ViewSubProcurementPlan' element={<ViewSubProcurementPlan/>}/>
        {/* <Route path='/MasterProcurmentPlan' element={</>}/> */}
        {/* <Route path='/PurchaseOrder' element={</>}/> */}
        <Route path='/GoodReceiveNote' element={<AddItemstoGRN/>}/>
                <Route path='/grn-view' element={<GoodsReceivedNote/>}/>
        <Route path='/PaymentVouchar' element={<InvoicestobePaid/>}/>
        {/* <Route path='/set-prebid-meeting-date' element={<Done Popup should be added/>}/> */}
        <Route path='/appoint-bidopening-committee' element={<CreateModifyBidOpeningCommittee/>}/>        
        <Route path='/evaluate-master-procurementplan' element={<MasterProcurementPlanStatus/>}/>
        {/* <Route path='/create-purchase-order' element={</>}/> */}
        <Route path='/create-grn' element={<AddItemstoGRN/>}/>
        {/* <Route path='/evaluate-vendor-fianace-status' element={</>}/> */}
        <Route path='/view-masterprocurement-plan' element={<ViewMasterProcurementPlan/>}/>
                <Route path='/create-modify-teccommittee' element={<CreateModifyTECCommittee/>}/>
        {/* <Route path='/new-master-procurement-plan-for-evaluate' element={</>}/> */}
        <Route path='/auctions-end' element={<BidDetails/>}/>
                <Route path='/bid-details-view' element={<BidDetailsView/>}/>
        {/* <Route path='/internal-auditor-report-availble' element={</>}/> */}
        {/* <Route path='/approved-items-from-dg' element={</>}/> */}
        <Route path='/item-rejected-by-vendors' element={<AddItemstoGRN/>}/>
        <Route path='/new-invoices-available' element={<InvoicestobePaid/>}/>


        {/*Tec Committee Member */}
        <Route path='/view-master-procurement-plan' element={<MasterProcurementPlanEvalate/>}/>
        <Route path='/vendor-selection' element={<VendorSelection/>}/>
        <Route path='/revise-vendor-selection' element={<ReviseVendorSelection/>}/>
        <Route path='/new-master-procurement-plan-for-evaluate' element={<MasterProcurementPlanEvalate/>}/>
        <Route path='/rejected-item-modified' element={<CreateMasterProcurementPlan/>}/>
        <Route path='/auction-end' element={<Dashboard/>}/>
        <Route path='/vendor-rejected' element={<ViewItemN/>}/>
        <Route path="*" element={<p>NotFound</p>}></Route> 


      {/* Procurement Committee */}
      <Route path='/PCMasterProcurmentPlan' element={<MasterProcurementPlan/>}/>
        <Route path='/PCApprovalforMasterProcurmentPlan' element={<ApprovalForMasterProcurementPlan/>}/>
          <Route path='/PCviewitem' element={<ViewItem/>}/>
            <Route path='/ApprovedItemList' element={<ApprovedItemList/>}/>
      <Route path='/FinalizedMasterProcurementPlan' element={<FinalizedMasterProcurementPlan/>}/>
      <Route path='/evaluate-master-procurement-plan' element={<MasterProcurementPlan/>}/>
      <Route path='/view-tec-report' element={<TecReport/>}/>
                <Route path='/tec-report-view' element={<TecReportView/>}/>
      <Route path='/new-master-procurement-plan-for-evaluate' element={<MasterProcurementPlan/>}/>
      <Route path='/new-finalized-master-procurement-plan' element={<FinalizedMasterProcurementPlan/>}/>


      {/* CoparateCommunicationDivision */}
      <Route path='/publish-papaer-ad' element={<PublishPaperAd/>}/>
      <Route path='/publish-papaer-ad-view-item' element={<ItemDetails/>}/>


      {/* Vendor */}
      <Route path='/BidTender' element={<BidTender/>}/>
                <Route path='/tender-details' element={<TenderDetails/>}/>
      <Route path='/BidHistory' element={<BidHistory/>}/>
                {/* <Route path='/bid-verification-submit' element={</>}/> */}
      {/* <Route path='/PurchaseOrder' element={</>}/> */}
      <Route path='/VGoodReceiveNote' element={<ViewGRN/>}/>
                <Route path='/grn' element={<GRN/>}/>
                    <Route path='/create-invoice' element={<CreateInvoice2/>}/>
                        <Route path='/send-invoice' element={<SendInvoice/>}/>
      <Route path='/bid-tender' element={<BidTender/>}/>
      <Route path='/bid-history' element={<BidHistory/>}/>
      <Route path='/view-invoice' element={<ViewInvoices/>}/>
                <Route path='/invoice' element={<Invoicesvendorside/>}/>
      <Route path='/items-to-be-shipped' element={<ItemstobeShipped/>}/>
      <Route path='/bid-approved' element={<BidHistory/>}/>
      <Route path='/verification-statuses-evaluated' element={<BidHistory/>}/>
      {/* <Route path='/new-purchase-order' element={</>}/> */}
      <Route path='/new-grn' element={<ViewGRN/>}/>
      <Route path='/payment-received' element={<ViewInvoices/>}/>


      {/* BidOpeningCommitee */}
      <Route path='/manage-auction' element={<ManageAuction/>}/>

      {/* InternalAuditor */}
      <Route path='/IAFinalizedMasterProcurementPlan' element={<ViewFinalizedMasterProcurementPlans/>}/>
                <Route path='/audit-finalized-master-procurementplan' element={<AuditFinalizedMasterProcurementPlan/>}/>
      <Route path='/ia-new-master-procurement-plan-for-evaluate' element={<ViewFinalizedMasterProcurementPlans/>}/>


      {/* DirectorGeneral */}
      <Route path='/DGMasterProcurementPlan' element={<DGViewFinalizedMasterProcurementPlans/>}/>
      <Route path='/view-finalized-master-procurement-plan' element={<DGViewFinalizedMasterProcurementPlans/>}/>
      <Route path='/new-items-to-evaluate' element={<DGViewFinalizedMasterProcurementPlans/>}/>
      <Route path='/evaluate-f-master-procurement-plan' element={<EvaluateFinalizedMasterProcurementPlan/>}/>

      
      {/* FinanceDivisionAccountant */}
      <Route path='/view-invoices' element={<InvoicesneedtobePaid/>}/>
      <Route path='/invoice-need-to-pay' element={<InvoicesneedtobePaid/>}/>
      <Route path='/upload-payment-vouchar' element={<UploadPaymentVoucher/>}/>


      {/* InventoryManager */}
      <Route path='/view-stock' element={<Stock/>}/>
                <Route path='/add-new-item' element={<AddNewItem/>}/>
                {/* <Route path='/issue-item' element={</>}/> */}
      {/* <Route path='/view-assets-registry' element={<Stock/>}/> */}



      <Route path="*" element={<p>NotFound</p>}></Route> 


      </Routes>

      </div>
    </div>
    )
  }
  export default App;
  