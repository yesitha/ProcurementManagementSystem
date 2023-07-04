import axios from "axios";

// Director General views finalized master procurement plan

export const GetFinalizedMasterProcurementPlan = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}/api/DirectorGeneral/GetFinalizedMasterProcurementPlan`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  // Director General evaluayes finalized master procurement plan

  export const GetFinalizedMasterProcurementPlan2 = async (mppId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}/api/DirectorGeneral/GetFinalizedMasterProcurementPlan/${mppId}`
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
        `${process.env.REACT_APP_API_HOST}/api/DirectorGeneral/UpdateDGStatus?mppId=${mppId}&itemId=${itemId}&DGStatus=approve&DGStatusComment=null`
      );
      console.log(response);
      return response;  
    } catch (error) {
      console.log(error);
      throw error;
    }
  }; 