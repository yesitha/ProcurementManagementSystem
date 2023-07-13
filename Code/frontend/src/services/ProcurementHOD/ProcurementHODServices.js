import axios from "axios";

// 

export const fetchDataFromDb = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_HOST}/api/ProcurementOfficer/GetMasterProcurementPlans`
    );
    console.log(response.data);
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

export const getItemDetailsForPo = async (selectedMppId,vendorId) => {
  try {
    const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}/api/ProcurementOfficer/GetApprovedItemDetailsforPO/${selectedMppId}/${vendorId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


export const getSelectedVendorDetailsForEachMppId = async (selectedMppId) => {
  try {
    const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}/api/ProcurementOfficer/GetSelectedvendorListWithvendorDetails/${selectedMppId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getVendorDetails = async (selectedMppId) => {
  try {
    const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}/api/api/ProcurementOfficer/GetVendorDetails/Roland%20Hayes`
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
export const modifyTECCommitteeToDb = async (mppId,data) => {
  console.log(data);
  
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_HOST}/api/ProcurementOfficer/ModifyTECCommitteeMembers/${mppId}`,data
    );
   
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchSppDataFromDb = async () => {
  try {
    const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}/api/PurchasingDivisionHOD/GetSubProcurementPlans`
    );
    console.log(response.data);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


export const fetchSubProcurementPlanDetails = async (id) => {
  return await axios.get(
      `${process.env.REACT_APP_API_HOST}/api/DivisionHOD/SubProcurementPlanItems/${id}`
  );
};

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

export const modifyBIDCommitteeToDb = async (mppId,data) => {
  console.log(data);
  
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_HOST}/api/ProcurementOfficer/ModifyBidOpeningCommitteeMembers/${mppId}`,data
    );
   
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const GetBidDetails = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_HOST}/api/ProcurementOfficer/GetBidDetails`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const GetItemBidDetailsitemId = async (itemId) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_HOST}/api/ProcurementOfficer/GetItemBidDetails/${itemId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


export const fetchPreviewFromDB = async (selectedMppId,vendorId) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_HOST}/api/ProcurementOfficer/CreatePO/${selectedMppId}/${vendorId}`
    );
   
    console.log(response.data);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const specialComment = async (poId, comment) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_API_HOST}/api/ProcurementOfficer/AddComment?poId=${poId}&comment=${comment}`
    );
    console.log(response);
    return response;  
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Evaluate Vendor Finance Status

export const GetVendorFinanceStatedetails = async () => {
  try {
    const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}/api/ProcurementOfficer/GetVendorFinanceStatedetails`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const GetPoIdList = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_HOST}/api/ProcurementOfficer/GetPoIdList`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


export const approve = async (vendorId,poId) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_API_HOST}/api/ProcurementOfficer/UpdateProcurementOfficerStatus/${vendorId}/${poId}?status=approve`
    );
    console.log(response);
    return response;
    } catch (error) {
    console.log(error);
    throw error;
  }
};

export const GetPOItemDetailsForGRN = async (poId) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_HOST}/api/ProcurementOfficer/GetPOItemDetailsForGRN/${poId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const CreateGRN = async (poId,data) => {

  console.log(data);
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_HOST}/api/ProcurementOfficer/CreateGRN?poId=${poId}`,
      data
    );
    console.log(response);
    sessionStorage.clear();
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const GetGRNItemDetails = async (poId,grnId) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_HOST}/api/ProcurementOfficer/GetGRNItemDetails/${poId}/${grnId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const UpdateGRNItemCommentAndCheckedBy = async (grnId,checkedBy,commentsWithItemId) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_API_HOST}/api/ProcurementOfficer/UpdateGRNItemCommentAndCheckedBy/${grnId}?checkedBy=${checkedBy}`,
      commentsWithItemId
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const InvoicesToBePay = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_HOST}/api/ProcurementOfficer/InvoicesToBePay`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const InvoicesPaid = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_HOST}/api/ProcurementOfficer/InvoicesPaid`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const GetInvoiceDetails = async (invoiceId) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_HOST}/api/ProcurementOfficer/GetInvoiceDetails/${invoiceId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const UpdateInvoicePaymentStatus = async (invoiceId) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_API_HOST}/api/ProcurementOfficer/UpdateInvoicePaymentStatus?invoiceId=${invoiceId}`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const GetMasterProcurementPlanStatus = async (mppId) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_HOST}/api/ProcurementOfficer/GetMasterProcurementPlanStatus?mppId=${mppId}`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const SetPreBidMeetingDatePO = async (selectedDate) => {
  console.log(selectedDate);
  try {
    const response = await fetch('https://localhost:7102/api/ProcurementOfficer/SetPreBidMeetingDate', {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(selectedDate)
    });

    if (response.ok) {
      console.log('Date successfully posted!');
    } else {
      console.error('Failed to post date:', response.status);
    } }catch (error) {
    throw error;
  }
};
