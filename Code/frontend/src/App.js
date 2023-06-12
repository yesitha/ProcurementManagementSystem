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
import ViewItem from "./pages/ViewItem/ViewItem";
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
import CreateMasterProcurementPlan from "./pages/CreateMasterProcurementPlan/CreateMasterProcurementPlan";
import InvoicestobePaidFin from "./pages/FinanceDivisionHOD/InvoicestobePaid/InvoicestobePaidFin";
import ReviseVendorSelection from "./pages/TEC Committee/Revise Vendor Selection/ReviseVendorSelection";
import {Route , Routes} from "react-router-dom";
import TenderDetails from "./pages/Vendor/Tender Details/TenderDetails";
import SideNavBar from "./components/SideNavigationBar/SideNavBar";
import { user, list1, list2 } from './pages/Usermanage';
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


        {/*Tec Committee Member */}
        <Route path='/view-master-procurement-plan' element={<MasterProcurementPlanEvalate/>}/>
        <Route path='/vendor-selection' element={<VendorSelection/>}/>
        <Route path='/revise-vendor-selection' element={<ReviseVendorSelection/>}/>
        <Route path='/new-master-procurement-plan-for-evaluate' element={<MasterProcurementPlanEvalate/>}/>
        <Route path='/rejected-item-modified' element={<CreateMasterProcurementPlan/>}/>
        <Route path='/auction-end' element={<Dashboard/>}/>
        <Route path='/vendor-rejected' element={<ViewItem/>}/>


        <Route path="*" element={<p>NotFound</p>}></Route> 
        </Routes>
      </div>
    </div>

    
    )
  }
  export default App;
  