import axios from "axios";

//  Option to view Master Procurement Plan

export const GetMasterProcurementPlans = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_HOST}/api/ProcurementCommittee/GetMasterProcurementPlans`);
      
      console.log(response);
      return response.data;
    } catch (error) {
      console.log('Axios error:', error);
      throw error;
    }
  };



  
  export const GetMasterProcurementPlanmppid = async (mppId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}/api/ProcurementCommittee/GetMasterProcurementPlans/${mppId}`
      );
      console.log(response);
      return response.data;  
    } catch (error) {
      console.log(error);
      throw error;
    }
  }; 

  export const GetMasterProcurementPlanmppidPC = async (mppId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}/api/ProcurementCommittee/GetMasterProcurementPlans${mppId}`
      );
      console.log(response);
      return response.data;  
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  export const GetItemListmppid = async (mppId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}/api/ProcurementCommittee/GetItemList/${mppId}`
      );
      console.log(response);
      return response.data;  
    } catch (error) {
      console.log(error);
      throw error;
    }
  }; 

  export const GetItemDetails = async (itemId,mppId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}/api/ProcurementCommittee/GetItemDetails/${itemId}/${mppId}`
      );
      // console.log(response);
      return response.data;  
    } catch (error) {
      console.log(error);
      throw error;
    }
  }; 

  export const approve = async (sppId,itemId) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_HOST}/api/ProcurementCommittee/UpdateProcurementCommitteeStatus?sppId=${sppId}&itemId=${itemId}&procurementCommitteeStatus=approve&procurementCommitteeComment=null`
      );
      console.log(response);
      return response;  
    } catch (error) {
      console.log(error);
      throw error;
    }
  }; 

  export const GetApprovedItems = async (mppId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}/api/ProcurementCommittee/GetApprovedItems/${mppId}`
      );
      console.log(response);
      return response.data;  
    } catch (error) {
      console.log(error);
      throw error;
    }
  }; 

  export const GetBidDetails = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_HOST}/api/ProcurementCommittee/GetBidDetails`);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log('Axios error:', error);
      throw error;
    }
  };

  export const GetBidDetailsitemId = async (itemId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}/api/ProcurementCommittee/GetItemBidDetails/${itemId}`
      );
      console.log(response);
      return response.data;  
    } catch (error) {
      console.log(error);
      throw error;
    }
  }; 

  export const GetMasterProcurementPlansIDList = async () => {
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

  export const GetFinalizedMasterProcurementPlan = async (selectedmppId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}/api/ProcurementCommittee/GetFinalizedMasterProcurementPlan/${selectedmppId}`
      );
      console.log(response.data);
      return response.data;
      
    } catch (error) {
      console.log(error);
    }
  };