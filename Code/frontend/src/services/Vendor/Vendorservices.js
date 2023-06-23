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
        `${process.env.REACT_APP_API_HOST}/api/Vendor/GetApprovedItemsDetails/${itemId}`
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
