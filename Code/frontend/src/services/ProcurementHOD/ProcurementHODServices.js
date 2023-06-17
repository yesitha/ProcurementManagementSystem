import axios from "axios";

//

export const fetchDataFromDb = async () => {
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