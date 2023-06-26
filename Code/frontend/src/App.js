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
import {Route, Routes} from "react-router-dom";
import TenderDetails from "./pages/Vendor/Tender Details/TenderDetails";
import BidHistory from "./pages/Vendor/BidHistory/BidHistory";
import SideNavBar from "./components/SideNavigationBar/SideNavBar";
import {user, list1, list2} from "./pages/Usermanage";
import Invoicesvendorside from "./pages/Vendor/Invoices(vendorside)/Invoices(vendorside)";
import InvoicesneedtobePaid from "./pages/FinanceDivisionAccountant/InvoicesneedtobePaid/InvoicesneedtobePaid";
import ViewMasterProcurementPlanProc from "./pages/Procurement Officer/ViewMasterProcurementPlanProc/ViewMasterProcurementPlanProc";
import PurchaseOrder from "./pages/Procurement Officer/PurchaseOrder/PurchaseOrder";
import {useSelector} from "react-redux";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import AddItemstoPO from "./pages/Procurement Officer/AddItemstoPO/AddItemstoPO";
import AuditReport from "./pages/Procurement Officer/AuditReport/AuditReport";
import PurchseOrdersVendor from "./pages/Vendor/PurchaseOrdersVendor/PurchseOrdersVendor";
import PurchaseOrderPreview from "./pages/Vendor/PurchaseOrderPreview/PurchaseOrderPreview";
import SendPurchaseOrder from "./pages/Procurement Officer/SendPurchaseOrder/SendPurchaseOrder";
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
import PDViewSubProcurementPlan from "./pages/Dicvision HOD/PDViewSubProcurementPlan/PDViewSubProcurementPlan"
import NotFound404 from "./pages/NotFoundPage/NotFound404";
import {Home} from "./pages/Home/Home";
import NoAccess403 from "./pages/No Access Page/NoAccess";

function App() {
    const userType = sessionStorage.getItem("userType"); // Get userType from session storage


    return (
        <div className="app-container">
            {userType && <SideNavBar list1={list1} list2={list2} user={user}/>}
            <div className="app-content">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/sign-up" element={<SignUp/>}/>
                    <Route path="/sign-in" element={<Login/>}/>
                    <Route path="/view-notification" element={<NotificationPage/>}/>

                    {/* Division HOD */}
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route
                        path="/item-rejected"
                        element={<AddItemtoSubProcurementPlan/>}
                    />
                    <Route
                        path="/add-new-item"
                        element={<AddNewItemtoSubProcurementPlan/>}
                    />
                    <Route
                        path="/add-item-to-subprocurement-Plan/:division/:selectedSubId"
                        element={<AddItemtoSubProcurementPlan/>}
                    />
                    <Route
                        path="/SubProcurmentPlan/"
                        element={<CreateSubProcurementPlan/>}
                    />
                    <Route
                        path="/SubProcurmentPlan/:selectedSubIdfomNextPage"
                        element={<CreateSubProcurementPlan/>}
                    />

                    {/* Purchase Division HOD */}
                    <Route
                        path="/NewSubProcurmentPlan"
                        element={<CreateMasterProcurementPlan/>}
                    />
                    <Route
                        path="/RequesttoInitiateMasterProcurementPlan"
                        element={<RequesttoInitiateSubProcurementPlan/>}
                    />
                    <Route
                        path="/pd-view-sub-procurement-plan/:selectedSubId/:divisionName"
                        element={<PDViewSubProcurementPlan/>}
                    />

                    {/* ProcurementOfficer */}
                    <Route
                        path="/ViewSubProcurementPlan"
                        element={<ViewSubProcurementPlan/>}
                    />
                    <Route
                        path="/MasterProcurmentPlan"
                        element={<ViewMasterProcurementPlanProc/>}
                    />
                    <Route
                        path="/master-procurement-plan-status/:subId"
                        element={<MasterProcurementPlanStatus/>}
                    />
                    <Route
                        path="/view-master-procurement-plan/:mppId"
                        element={<ViewMasterProcurementPlan/>}
                    />
                    <Route path="/PurchaseOrder" element={<PurchaseOrder/>}/>
                    <Route path="/add-item-to-PO" element={<AddItemstoPO/>}/>
                    <Route path="/send-purchase-order" element={<SendPurchaseOrder/>}/>
                    <Route path="/GoodReceiveNote" element={<AddItemstoGRN/>}/>
                    <Route path="/grn-view" element={<GoodsReceivedNote/>}/>
                    <Route
                        path="/appoint-bidopening-committee"
                        element={<ViewMasterProcurementPlanProc/>}
                    />
                    <Route
                        path="/create-modify-bidopeningC/:mppId"
                        element={<CreateModifyBidOpeningCommittee/>}
                    />
                    <Route
                        path="/evaluate-master-procurementplan"
                        element={<ViewMasterProcurementPlanProc/>}
                    />
                    <Route path="/create-purchase-order" element={<PurchaseOrder/>}/>

                    <Route path="/create-grn" element={<AddItemstoGRN/>}/>
                    <Route
                        path="/evaluate-vendor-fianace-status"
                        element={<EvaluateVendorFinanceStatus/>}
                    />

                    <Route
                        path="/view-masterprocurement-plan"
                        element={<ViewMasterProcurementPlan/>}
                    />
                    <Route
                        path="/create-modify-teccommittee/:mppId"
                        element={<CreateModifyTECCommittee/>}
                    />
                    <Route
                        path="/new-master-procurement-plan-for-evaluate"
                        element={<ViewMasterProcurementPlanProc/>}
                    />
                    <Route path="/auctions-end" element={<BidDetails/>}/>
                    <Route path="/bid-details-view/:itemId" element={<BidDetailsView/>}/>
                    <Route
                        path="/internal-auditor-report-availble"
                        element={<AuditReport/>}
                    />
                    <Route path="/approved-items-from-dg" element={<AddItemstoPO/>}/>
                    <Route path="/item-rejected-by-vendors" element={<AddItemstoGRN/>}/>
                    <Route
                        path="/new-invoices-available"
                        element={<InvoicestobePaid/>}
                    />

                    {/*Tec Committee Member */}
                    <Route
                        path="/view-master-procurement-plan-tec"
                        element={<MasterProcurementPlanTEC/>}
                    />
                    <Route
                        path="/approval-for-master-procurement-plan-tec/:mppId"
                        element={<ApprovalForMasterProcurementPlan/>}
                    />
                    <Route path="/view-item-tec/:itemId/:mppId" element={<ViewItemTEC/>}/>
                    <Route path="/vendor-selection" element={<VendorSelection/>}/>
                    <Route
                        path="/revise-vendor-selection"
                        element={<ReviseVendorSelection/>}
                    />
                    <Route
                        path="/new-master-procurement-plan-for-evaluate-tec"
                        element={<MasterProcurementPlanTEC/>}
                    />
                    <Route

                        path="/rejected-item-modified"
                        element={<CreateMasterProcurementPlan/>}
                    />
                    <Route

                        path="/vendor-rejected-tec"
                        element={<ReviseVendorSelection/>}

                    />

                    {/* Procurement Committee */}
                    <Route
                        path="/PCMasterProcurmentPlan"
                        element={<MasterProcurementPlan/>}
                    />
                    <Route
                        path="/PCApprovalforMasterProcurmentPlan/:mppId"
                        element={<ApprovalForMasterProcurementPlanPC/>}
                    />
                    <Route path="/PCviewitem/:itemId/:mppId" element={<ViewItemPC/>}/>
                    <Route path="/ApprovedItemList/:mppId" element={<ApprovedItemList/>}/>
                    <Route
                        path="/FinalizedMasterProcurementPlan"
                        element={<FinalizedMasterProcurementPlan/>}
                    />
                    <Route
                        path="/evaluate-master-procurement-plan"
                        element={<MasterProcurementPlan/>}
                    />
                    <Route path="/view-tec-report" element={<TecReport/>}/>
                    <Route path="/tec-report-view/:itemId" element={<TecReportView/>}/>
                    <Route
                        path="/new-master-procurement-plan-for-evaluate-PC"
                        element={<MasterProcurementPlan/>}
                    />
                    <Route
                        path="/new-finalized-master-procurement-plan-PC"
                        element={<FinalizedMasterProcurementPlan/>}
                    />

                    {/* CoparateCommunicationDivision */}
                    <Route path="/publish-papaer-ad" element={<PublishPaperAd/>}/>
                    <Route
                        path="/publish-papaer-ad-view-item/:itemId"
                        element={<ItemDetails/>}
                    />

                    {/* Vendor */}
                    <Route path="/bid-tender/:vendorId" element={<BidTender/>}/>
                    <Route path="/tender-details/:itemId" element={<TenderDetails/>}/>
                    <Route path="/bid-history/:vendorId" element={<BidHistory/>}/>
                    <Route
                        path="/po-verification-submit/:poId"
                        element={<POVerificationSubmit/>}
                    />
                    <Route path="/letter-of-acceptance/:itemId" element={<LetterofAcceptance/>}/>
                    <Route
                        path="/PurchaseOrder-vendor/:vendorId"
                        element={<PurchseOrdersVendor/>}
                    />
                    <Route
                        path="/PurchaseOrder-vendor-view/:poId"
                        element={<PurchaseOrderPreview/>}
                    />
                    <Route path="/VGoodReceiveNote" element={<ViewGRN/>}/>
                    <Route path="/grn" element={<GRN/>}/>
                    <Route path="/create-invoice" element={<CreateInvoice2/>}/>
                    <Route path="/send-invoice" element={<SendInvoice/>}/>
                    <Route path="/view-invoice" element={<ViewInvoices/>}/>
                    <Route path="/invoice" element={<Invoicesvendorside/>}/>
                    <Route path="/items-to-be-shipped" element={<ItemstobeShipped/>}/>
                    <Route path="/bid-approved" element={<BidHistory/>}/>
                    <Route
                        path="/verification-statuses-evaluated"
                        element={<BidHistory/>}
                    />
                    <Route path="/new-grn" element={<ViewGRN/>}/>
                    <Route path="/payment-received" element={<ViewInvoices/>}/>

                    {/* BidOpeningCommitee */}
                    <Route path="/manage-auction" element={<ManageAuction/>}/>
                    <Route path="/Auctions-BOC" element={<ManageAuction/>}/>

                    {/* InternalAuditor */}
                    <Route
                        path="/IAFinalizedMasterProcurementPlan"
                        element={<ViewFinalizedMasterProcurementPlans/>}
                    />
                    <Route
                        path="/audit-finalized-master-procurementplan"
                        element={<AuditFinalizedMasterProcurementPlan/>}
                    />
                    <Route
                        path="/ia-new-master-procurement-plan-for-evaluate"
                        element={<ViewFinalizedMasterProcurementPlans/>}
                    />

                    {/* DirectorGeneral */}
                    <Route
                        path="/DGMasterProcurementPlan"
                        element={<DGViewFinalizedMasterProcurementPlans/>}
                    />
                    <Route
                        path="/view-finalized-master-procurement-plan"
                        element={<DGViewFinalizedMasterProcurementPlans/>}
                    />
                    <Route
                        path="/new-items-to-evaluate"
                        element={<DGViewFinalizedMasterProcurementPlans/>}
                    />
                    <Route
                        path="/evaluate-f-master-procurement-plan"
                        element={<EvaluateFinalizedMasterProcurementPlan/>}
                    />

                    {/* FinanceDivisionAccountant */}
                    <Route path="/view-invoices" element={<InvoicesneedtobePaid/>}/>
                    <Route
                        path="/invoice-need-to-pay"
                        element={<InvoicesneedtobePaid/>}
                    />
                    <Route
                        path="/upload-payment-vouchar"
                        element={<UploadPaymentVoucher/>}
                    />

                    {/* InventoryManager */}
                    <Route path="/view-stock" element={<Stock/>}/>
                    <Route path="/add-new-item=im" element={<AddNewItem/>}/>
                    <Route path="/issue-item" element={<IssueItem/>}/>
                    <Route path="/view-assets-registry" element={<AssetRegistry/>}/>
                    <Route path="*" element={<NotFound404/>}/>
                </Routes>


            </div>
        </div>
    );
}

export default App;
