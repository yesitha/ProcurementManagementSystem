import './App.css';

import ManageAuction from './pages/BidOpeningCommitee/ManageAuction/ManageAuction';
import Dashboard from './pages/Dashboard/Dashboard';
import NotificationPage from './pages/NotificationPage/NotificationPage';
import CreateSubProcurementPlan from './pages/Create SubProcurement Plan Division HOD/CreateSubProcurementPlan'
import SignUp from './pages/SignUp/SignUp';
import FinalizedMasterProcurementPlan from './pages/ProcurementCommitee/FinalizedMasterProcurementPlan/FinalizedMasterProcurementPlan';
import MasterProcurementPlanStatus from './pages/MasterProcurementPlanStatus/MasterProcurementPlanStatus';
import ViewMasterProcurementPlan from './pages/ViewMasterProcurementPlan/ViewMasterProcurementPlan';
import AddItemtoSubProcurementPlan from './pages/AddItemtoSubProcurementPlan/AddItemtoSubProcurementPlan';
import AddNewItemtoSubProcurementPlan from './pages/AddNewItemtoSubProcurementPlan/AddNewItemToSubProcurementPlan'
import Login from './pages/Login/Login'
import CreateModifyTECCommittee from './pages/CreateModifyTECCommittee/CreateModifyTECCommittee';
import ViewFinalizedMasterProcurementPlans from './pages/Internal Auditor/ViewFinalizedMasterProcurementPlans/ViewFinalizedMasterProcurementPlans';
import AuditFinalizedMasterProcurementPlan from './pages/Internal Auditor/AuditFinalizedMasterProcurementPlan/AuditFinalizedMasterProcurementPlan';
import ItemstobeShipped from './pages/Items to be Shipped/ItemstobeShipped';
import MasterProcurementPlanEvalate from './pages/TEC Committee/MasterProcurementPlanEvalate/MasterProcurementPlanEvalate';
import Stock from './pages/Stock/Stock';
import DGViewFinalizedMasterProcurementPlans from './pages/Director General/DGViewFinalizedMasterProcurementPlans/DGViewFinalizedMasterProcurementPlans';
import EvaluateFinalizedMasterProcurementPlan from './pages/Director General/EvaluateFinalizedMasterProcurementPlan/EvaluateFinalizedMasterProcurementPlan';
import ApprovalForMasterProcurementPlan from './pages/TEC Committee/ApprovalForMasterProcurementPlan/ApprovalForMasterProcurementPlan';

function App() {
  return (
    <div>
    {/* <Login/> */}
    {/* <SignUp/> */}
    {/* <Dashboard/> */}
    {/* <ManageAuction/> */}
    {/* <NotificationPage/> */}
    {/* <CreateSubProcurementPlan/> */}
    {/* <FinalizedMasterProcurementPlan/> */}
    {/* <MasterProcurementPlanStatus/> */}
    {/* <ViewMasterProcurementPlan/> */}
    {/* <CreateModifyTECCommittee/> */}
    {/* <MasterProcurementPlanEvalate/> */}
    {/* <AddItemtoSubProcurementPlan/>  */}
    <ApprovalForMasterProcurementPlan/>
    {/* <ViewFinalizedMasterProcurementPlans/> */}
    {/* <AuditFinalizedMasterProcurementPlan/> */}
    {/* <ItemstobeShipped/> */}
    {/* <Stock/> */}
    {/* <DGViewFinalizedMasterProcurementPlans/> */}
    {/*<EvaluateFinalizedMasterProcurementPlan/>*/}
     </div>
  );
}
export default App;
