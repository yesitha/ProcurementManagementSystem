import axios from "axios";


// Getting invoice details -page where invoice status is shown
export const GetInvoicesList = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}/api/FinanceDivisionAccountant/InvoicesList`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  // Page where upload payment voucher option is available

  export const GetInvoiceDetails = async (invoiceId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}/api/FinanceDivisionAccountant/GetInvoiceDetails/${invoiceId}`
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
        
        `${process.env.REACT_APP_API_HOST}/api/FinanceDivisionAccountant/UpdateInvoicePaymentStatus?invoiceId=${invoiceId}`
      );
      
      console.log(response);
      return response;  
    } catch (error) {
      console.log(error);
      throw error;
    }
  }; 