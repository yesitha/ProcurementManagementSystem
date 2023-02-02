import './App.css';

import ManageAuction from './pages/BidOpeningCommitee/ManageAuction/ManageAuction';
import Dashboard from './pages/Dashboard/Dashboard';
import NotificationPage from './pages/NotificationPage/NotificationPage';
import CreateSubProcurementPlan from './pages/Create SubProcurement Plan Division HOD/CreateSubProcurementPlan'
import SignUp from './pages/SignUp/SignUp';
import FinalizedMasterProcurementPlan from './pages/ProcurementCommitee/FinalizedMasterProcurementPlan/FinalizedMasterProcurementPlan';
import MasterProcurementPlanStatus from './pages/MasterProcurementPlanStatus/MasterProcurementPlanStatus';
import ViewMasterProcurementPlan from './pages/ViewMasterProcurementPlan/ViewMasterProcurementPlan';
import Login from './pages/Login/Login'
import CreateModifyTECCommittee from './pages/CreateModifyTECCommittee/CreateModifyTECCommittee';
import ViewFinalizedMasterProcurementPlans from './pages/Internal Auditor/ViewFinalizedMasterProcurementPlans/ViewFinalizedMasterProcurementPlans';
import AuditFinalizedMasterProcurementPlan from './pages/Internal Auditor/AuditFinalizedMasterProcurementPlan/AuditFinalizedMasterProcurementPlan';
import ItemstobeShipped from './pages/Items to be Shipped/ItemstobeShipped';

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
    <CreateModifyTECCommittee/>
    {/* <ViewFinalizedMasterProcurementPlans/> */}
    {/* <AuditFinalizedMasterProcurementPlan/> */}
    {/* <ItemstobeShipped/> */}
    </div>
  );
}
export default App;
