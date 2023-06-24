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
      console.log();
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

  export const GetPurchaseOrdersByVendorId = async (vendorId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}/api/Vendor/GetPurchaseOrdersByVendorId/LAH23201`
      );
      return response.data;  
    } catch (error) {
      console.log(error);
      throw error;
    }
  }; 

  export const GetPOVendorDetails = async (poId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}/api/Vendor/GetPOVendorDetails/${poId}`
      );
      return response.data;  
    } catch (error) {
      console.log(error);
      throw error;
    }
  }; 


  export const GetPOItemDetailspoIdvendorId = async (poId,vendorId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}/api/Vendor/GetPOItemDetails/${poId}/LAH23201`
      );
      return response.data;  
    } catch (error) {
      console.log(error);
      throw error;
    }
  }; 