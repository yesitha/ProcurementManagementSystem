import axios from "axios";

export const GetSubProcurementApprovedItems = async (employeeId) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_HOST}/api/BidOpeningCommittee/GetSubProcurementApprovedItems/${employeeId}`
    );
     console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const UpdateAuctionDates = async (itemId, openingDate, closingDate) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_API_HOST}/api/BidOpeningCommittee/UpdateAuctionDates?itemId=${itemId}&auctionOpeningDate=${openingDate}&auctionClosingDate=${closingDate}`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
