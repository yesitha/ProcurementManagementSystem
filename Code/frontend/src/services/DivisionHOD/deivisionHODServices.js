import axios from "axios";

//Create Sub Procurement Plan

export const getDivision = async (hodId) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_HOST}/api/DivisionHOD/divisionName/${hodId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getSubProcurmentPlanPerDivision = async (hodId) => {
  try {
    const response2 = await axios.get(
      `${process.env.REACT_APP_API_HOST}/api/DivisionHOD/sppIds/${hodId}`
    );
    return response2.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchDataForSubId = async (selectedSubId) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_HOST}/api/DivisionHOD/SubProcurementPlanItems/${selectedSubId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const createNewSubProcurementPlan = async (hodId) => {
  try {
    console.log(hodId);
    const response = await axios.post(
      `${process.env.REACT_APP_API_HOST}/api/DivisionHOD/CreateNewSubProcurementPlan?HODId=${hodId}`
    );
    return response.data;
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

export const deleteItemFromdb = (itemId, sppId) => {
  try {
    axios.delete(
      `${process.env.REACT_APP_API_HOST}/api/DivisionHOD/${itemId}?sppId=${sppId}`
    );
  } catch (error) {
    console.log(error);
  }
};

//Add New Item to Sub Procurement Plan Page

export const getCategoryList = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_HOST}/api/DivisionHOD/CategoryNameList`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const addNewItemDb = async (
  itemName,
  itemSpecification,
  selectedCategoryId
) => {
  try {
    await axios.post(
      `${process.env.REACT_APP_API_HOST}/api/DivisionHOD/AddItem?itemName=${itemName}&specification=${itemSpecification}&categoryId=${selectedCategoryId}`
    );
    console.log("item Added");
    return;
  } catch (error) {
    console.log(error);
  }
};

//Add New Item to Sub Procurement Plan Page

export const pushNewItemSubProcurementPlan = async (formData,file) => {
  try {
    const data = new FormData();
    data.append('file', file);
    
    const response = await fetch(`${process.env.REACT_APP_API_HOST}/api/DivisionHOD/AddItemToSubProcurementPlan?SppId=${formData.SppId}&ItemId=${formData.ItemId}&RecomendedVendor=${formData.RecomendedVendor}&ExpectedDate=${formData.expectedDeliveryDate}&Estimated_budget=${formData.estimatedBudget}&Quantity=${formData.quantity}`, {
      method: 'POST',
      body: data,
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

export const getItemNameList = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_HOST}/api/DivisionHOD/ItemNameList`
    );

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getVendorList = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_HOST}/api/DivisionHOD/VendorNameList`
    );

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
