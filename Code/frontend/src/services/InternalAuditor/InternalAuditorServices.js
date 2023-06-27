import axios from "axios";

// view finalized master procurement plan

export const GetFinalizedMasterProcurementPlan = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}/api/InternalAuditor/GetFinalizedMasterProcurementPlan`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  // Audit Finalized Master Procurement Plan

  export const GetFinalizedMasterProcurementPlan2 = async (mppId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}/api/InternalAuditor/GetFinalizedMasterProcurementPlan/${mppId}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  export const GetIdListForAuditFinalizedMPP = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}/api/ProcurementOfficer/GetMasterProcurementPlansIDList`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  export const approve = async (mppId,itemId) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_HOST}/api/InternalAuditor/UpdateInternalAuditorStatus?mppId=${mppId}&itemId=${itemId}&internalAuditorStatus=approve&internalAuditorComment=null`
      );
      console.log(response);
      return response;  
    } catch (error) {
      console.log(error);
      throw error;
    }
  }; 