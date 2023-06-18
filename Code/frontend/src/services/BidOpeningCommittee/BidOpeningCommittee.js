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
