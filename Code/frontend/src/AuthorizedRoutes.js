import {Route} from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import AddItemtoSubProcurementPlan from "./pages/AddItemtoSubProcurementPlan/AddItemtoSubProcurementPlan";
import AddNewItemtoSubProcurementPlan from "./pages/AddNewItemtoSubProcurementPlan/AddNewItemToSubProcurementPlan";
import CreateSubProcurementPlan from "./pages/Create SubProcurement Plan Division HOD/CreateSubProcurementPlan";

const authorizedRoutes = [
    {path:"/dashboard",element:<Dashboard />},
    {path:"/item-rejected",element:<AddItemtoSubProcurementPlan />},
    {path:"/add-new-item",element:<AddNewItemtoSubProcurementPlan />},
    {path:"/add-item-to-subprocurement-Plan/:division/:selectedSubId",element:<AddItemtoSubProcurementPlan />},
    {path:"/SubProcurmentPlan",element:<CreateSubProcurementPlan />},
    {path:"/SubProcurmentPlan/:selectedSubIdfomNextPage",element:<CreateSubProcurementPlan />},

    // { path: "/manage-auction", element: <ManageAuction /> },
];




