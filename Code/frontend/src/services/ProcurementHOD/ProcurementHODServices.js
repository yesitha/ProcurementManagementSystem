import axios from "axios";

// 

export const fetchDataFromDb = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_HOST}/api/ProcurementOfficer/GetMasterProcurementPlans`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getMasterProcurementPlanFromDB = async () => {
  try {
    const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}/api/ProcurementOfficer/GetMasterProcurementPlans`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getMasterProcurementPlanContentFromDB = async (selectedMppId) => {
  try {
    const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}/api/ProcurementOfficer/GetFinalizedMasterProcurementPlan/${selectedMppId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


export const MoneyFormat = (amount) => {
  if (typeof amount === "number") {
    const moneyValue = amount.toLocaleString("en-LK", {
      style: "currency",
      currency: "LKR",
    });
    return moneyValue;
  } else {
    amount = "Invalid number";
  }
};


export const checkNeworNot = async (mppId) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_HOST}/api/ProcurementOfficer/GetEmployeesInTECCommittee/${mppId}`
    );
    
    if (response.status === 200) {
      return false; // Return false if the response is successful (status 200 OK)
    } else {
      console.log('Unexpected response status:', response.status);
      throw new Error('Unexpected response status');
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response && error.response.status === 404) {
      return true; // Return true if the response is a 404 error
    } else {
      console.log(error);
      throw error;
    }
  }
};

//View Master Procurement Plan Item List
export const fetchMasterProcurmentItemListDetails = async (mppId) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_HOST}/api/ProcurementOfficer/GetSubProcurementPlanItemsByMppId/${mppId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchDataToTable = async (selectedSppId) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_HOST}/api/ProcurementOfficer/GetSubProcurementPlanItemsByMppId/${selectedSppId}`);
    
    console.log(response);
    return response.data;
  } catch (error) {
    console.log('Axios error:', error);
    throw error;
  }
};


//CreateModifyTecCommittee


export const fetchAlreadyMembersInTecCommittee = async (mppId) => {
  try{
    const response = await axios.post(
      `${process.env.REACT_APP_API_HOST}/api/ProcurementOfficer/CreateNewTECCommitteeID?mppId=${mppId}`
    );
    console.log(response);
    
  }catch(error){
    console.log(error); 
  }

  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_HOST}/api/ProcurementOfficer/GetEmployeesInTECCommittee/${mppId}`
    );
    console.log(response.data);
    return response.data;

  } catch (error) {
    console.log(error);
  }
}


export const submitTECCommitteeToDb = async (mppId,data) => {
  console.log(data);
  
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_HOST}/api/ProcurementOfficer/AppointTECCommitteeMembers?mppId=${mppId}`,data
    );
   
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//Create/Modify BidOpeningCommittee

export const fetchAlreadyMembersInBidOpCommittee = async (mppId) => {
  try{
    const response = await axios.post(
      `${process.env.REACT_APP_API_HOST}/api/ProcurementOfficer/CreateNewBidOpeningCommitteeID?mppId=${mppId}`
      
    );
    
    console.log(response);
    
  }catch(error){
    console.log(error); 
  
  }

  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_HOST}/api/ProcurementOfficer/GetEmployeesInBidOpeningCommittee/${mppId}`
    );
    console.log(response.data);
    return response.data;

  } catch (error) {
    console.log(error);
  }
}


export const submitBidOpCommitteeToDb = async (mppId,data) => {
  console.log(data);
  
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_HOST}/api/ProcurementOfficer/AppointBidOpeningCommitteeMembers?mppId${mppId}`,data
    );
   
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};