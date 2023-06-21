import axios from "axios";

export const GetMasterProcurementPlan = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}/api/TECCommittee/GetMasterProcurementPlans`
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  export const GetMasterProcurementPlanmppid = async (mppId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}/api/TECCommittee/GetMasterProcurementPlans${mppId}`
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
        `${process.env.REACT_APP_API_HOST}/api/TECCommittee/GetItemList/${mppId}`
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
        `${process.env.REACT_APP_API_HOST}/api/TECCommittee/GetItemDetails/${itemId}/${mppId}`
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
        `${process.env.REACT_APP_API_HOST}/api/TECCommittee/UpdateTecCommitteeStatus?sppId=${sppId}&itemId=${itemId}&tecCommitteeStatus=approve&tecCommitteeComment=null`
      );
      console.log(response);
      return response.data;  
    } catch (error) {
      console.log(error);
      throw error;
    }
  }; 

  export const fetchPdf = async (sppId,itemId) =>{
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}/api/TECCommittee/GetEvidencePdf/${itemId}/${sppId}`
      );
      console.log(response.data);
      return response.data;  
    } catch (error) {
      console.log(error);
      throw error;
    }

  }


