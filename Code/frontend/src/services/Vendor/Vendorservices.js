import { Password } from "@mui/icons-material";
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
      const response = await axios.post(
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
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  export const GetPurchaseOrdersByVendorId = async (vendorId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}/api/Vendor/GetPurchaseOrdersByVendorId/${vendorId}`
      );
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


  
  export const GetLetterAcceptenceData= async (itemId,venderId) => {
    try {
      
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}/api/Vendor/GetLetterOfAcceptanceItemAndVendorDetails/${venderId}/${itemId}`
      );
      console.log(response);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

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
  }


  export const updateLetterOfAcceptance = async (itemId, venderId, selectedFile) => {
    try {
      const data = new FormData();
      data.append('letterOfAcceptance', selectedFile);
      ;
      
      const response = await fetch(`${process.env.REACT_APP_API_HOST}api/Vendor/UpdateLetterOfAcceptance/${venderId}/${itemId}`, {
        method: 'POST',
        body: data,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  


  export const GetPOItemDetails = async (poId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}/api/Vendor/GetPOItemDetails/${poId}`
      );
      return response.data;  
    } catch (error) {
      console.log(error);
      throw error;
    }
  }; 


  export const  registerVenderToSystem = async (Formdata, businessRegistrationFile, taxIdentificationFile, insuranceCertificateFile, otherDocumentsFile) => {
    try {
      const data = new FormData();
      data.append('businessRegistrationFile', businessRegistrationFile);
      data.append('taxIdentificationFile', taxIdentificationFile);
      data.append('insuranceCertificateFile', insuranceCertificateFile);
      data.append('otherDocumentsFile', otherDocumentsFile);
      

      ;
      
      const response = await fetch(`${process.env.REACT_APP_API_HOST}/api/Vendor/RegisterVenderToSystem?address1=${Formdata.address1}&address2=${Formdata.address2}&address3=${Formdata.address3}&businessRegNo=${Formdata.businessRegNo}&city=${Formdata.city}&companyName=${Formdata.companyName}&email=${Formdata.email}&fName=${Formdata.fName}&jobTitle=${Formdata.jobTitle}&lName=${Formdata.lName}&noofEmployes=${Formdata.noofEmployes}&postalCode=${Formdata.postalCode}&registrationType=${Formdata.registrationType}&state=${Formdata.state}&telNo=${Formdata.telNo}&userName=${Formdata.userName}&password=${Formdata.password}&salutation=${Formdata.salutation}`, {
        method: 'POST',
        body: data,
      });
      
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };


  export const getVendorVerifyPdfs = async (vendorId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}/api/Vendor/GetVendorVerifyPdf/${vendorId}`
      );
      console.log(response);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  
  
  export const GetGRNIdListByVendorId = async (vendorId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}/api/Vendor/GetGRNIdListByVendorId/${vendorId}`
      );
      return response.data;  
    } catch (error) {
      console.log(error);
      throw error;
    }
  }; 

  export const GetGRNItemDetails = async (poId,grnId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}/api/Vendor/GetGRNItemDetails/${poId}/${grnId}`
      );
      return response.data;  
    } catch (error) {
      console.log(error);
      throw error;
    }
  }; 

  export const  getPOVenderDetails = async (poId) => {
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
  }; 
  export const GetInvoiceItemDetails = async (poId,grnId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}/api/Vendor/GetInvoiceItemDetails/${poId}/${grnId}`
      );
      return response.data;  
    } catch (error) {
      console.log(error);
      throw error;
    }
  }; 
export const CreateInvoice = async (grnId) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_HOST}/api/Vendor/CreateInvoice?grnId=${grnId}`
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  export const  getPOItems = async (poId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}/api/Vendor/GetPOItemDetails/${poId}`
      );
      console.log(response);
      return response.data;  
    } catch (error) {
      console.log(error);
      throw error;
    }

  }; 

  //Items to be Shipped

  export const GetItemToBeShippedDetails = async (poId,vendorId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}/api/Vendor/GetItemToBeShippedDetails/${poId}/${vendorId}`
         );

        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

  export const GetInvoiceDetails = async (grnId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}/api/Vendor/GetInvoiceDetails/${grnId}`
      );
      return response.data;  
    } catch (error) {
      console.log(error);
      throw error;
    }
 };

  export const GetPOIdListByVendorId = async (vendorId) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_API_HOST}/api/Vendor/GetPOIdListByVendorId/${vendorId}`
        );

        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const CreatePurchaseOrderItemsToBeShippedRecords = async (poId,input) => {
  const data = Object.keys(input).map((key) => ({
    itemId: key,
    shippedQuantity: Number(input[key])
  }));
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_HOST}/api/Vendor/CreatePurchaseOrderItemsToBeShippedRecords?PoId=${poId}`,data );

    console.log(response.data); // Handle the response data here
  } catch (error) {
    console.error(error); // Handle error here
  }
};

  export const UpdateInvoiceDetails = async (invoiceId,total,tax) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_HOST}/api/Vendor/UpdateInvoiceDetails?invoiceId=${invoiceId}&total=${total}&tax=${tax}`
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  export const GetInvoiceIdsForVendor = async (vendorId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}/api/Vendor/GetInvoiceIdsForVendor/HEL9863`
      );
      return response.data;  
    } catch (error) {
      console.log(error);
      throw error;
    }
  }; 

  export const GetInvoice = async (invoiceId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}/api/Vendor/GetInvoice/${invoiceId}`
      );
      return response.data;  
    } catch (error) {
      console.log(error);
      throw error;
    }
  }; 
