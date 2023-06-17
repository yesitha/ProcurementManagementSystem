import axios from "axios";

//  Option to view Master Procurement Plan

export const viewMasterProcurementPlanInfo = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_HOST}/api/ProcurementCommittee/GetMasterProcurementPlans`);
      
      console.log(response);
      return response.data;
    } catch (error) {
      console.log('Axios error:', error);
      throw error;
    }
  };
  
