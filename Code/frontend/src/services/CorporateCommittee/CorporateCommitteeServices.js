import axios from "axios";

// Publish paper ad

export const ClosestPreBidMeetingDate = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_HOST}/api/CoOperativeCommittee/ClosestPreBidMeetingDate`);
      
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  export const fetchDatatoTable = async (preBidMeetingDate) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}/api/CoOperativeCommittee/${preBidMeetingDate}`
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  // Display details of item to be published

  export const GetApprovedItemDetails = async (itemId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}/api/CoOperativeCommittee/GetApprovedItemDetails/${itemId}`
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };