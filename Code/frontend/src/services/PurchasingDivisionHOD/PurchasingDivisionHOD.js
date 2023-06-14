import axios from "axios";

//Create Sub Procurement Plan

export const fetchDatafromDB = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_HOST}/api/PurchasingDivisionHOD/GetMasterProcurementPlans`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


//Create New Master Procurement Plan