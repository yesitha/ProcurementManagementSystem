import axios from "axios";


export const GetApprovedItemsDetailsvendorId = async (vendorId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}/api/Vendor/GetApprovedItemsDetails/${vendorId}`
      );
      console.log(response);
      return response.data;  
    } catch (error) {
      console.log(error);
      throw error;
    }
  }; 

  export const GetApprovedItemDetailsitemId = async (itemId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}/api/Vendor/GetApprovedItemDetails/${itemId}`
      );
      return response.data;  
    } catch (error) {
      console.log(error);
      throw error;
    }
  }; 

  export const CreateVendorPlaceBidItem = async (vendorId, itemId, bidValue) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_HOST}/api/Vendor/CreateVendorPlaceBidItem?vendorId=${vendorId}&itemId=${itemId}&bidValue=${bidValue}`
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  
  export const GetBidHistory = async (vendorId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}/api/Vendor/GetBidHistory/${vendorId}`
      );
      console.log(response);
      return response.data;  
    } catch (error) {
      console.log(error);
      throw error;
    }
  }; 

  export const GetPODetailsbyId = async (poId) => {
    try {
      
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}/api/Vendor/GetPOVendorDetails/${poId}`
      );
      console.log(response);
      return response.data;  
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  export const fetchAlreadyUploadedPDf= async (poId) => {
    try {
      console.log("reached");
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}/api/Vendor/GetUploadedPdf/${poId}`
      );
      console.log(response);
      return response.data;  
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  export const sendFilesToDB = async (poId,selectedAgreement,selectedBankGuarantee,selectedBond) => {
    try {
      const data = new FormData();
      data.append('agreement', selectedAgreement);
      data.append('BankGuarantee', selectedBankGuarantee);
      data.append('bond', selectedBond);
      
      const response = await fetch(`${process.env.REACT_APP_API_HOST}/api/Vendor/uploadRequiredDocuments/${poId}`, {
        method: 'POST',
        body: data,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
