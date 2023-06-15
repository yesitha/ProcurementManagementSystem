import axios from "axios";

//Create Sub Procurement Plan

export const fetchDatafromDB = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_HOST}/api/PurchasingDivisionHOD/GetMasterProcurementPlans`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//Create New Master Procurement Plan

export const fetchSppDataFromDb = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_HOST}/api/PurchasingDivisionHOD/GetSubProcurementPlans`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createNewMPP = async (data) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_HOST}/api/PurchasingDivisionHOD/CreateNewMPP`,
      data
    );
    console.log(response);
    sessionStorage.clear();
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

//view sub procurement details

export const fetchSubProcurementPlanDetails = async (id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_HOST}/api/DivisionHOD/SubProcurementPlanItems/${id}`
  );
};
