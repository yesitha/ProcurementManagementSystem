import axios from "axios";

// get stock details

export const GetStockDetails = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_HOST}/api/InventoryManager/GetStockDetails`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// get Registry details

export const GetAssetsDetails = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_HOST}/api/InventoryManager/GetAssetsDetails`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Add new item page

export const CategoryNameList = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_HOST}/api/DivisionHOD/CategoryNameList`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const PostNewItemData = async (inputName,
    inputSpec,
    categoryId,
    selectedOption) => {

    console.log(`${process.env.REACT_APP_API_HOST}/api/InventoryManager/AddItem?itemName=${inputName}&specification=${inputSpec}&categoryId=${categoryId}&itemType=${selectedOption}`)
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_HOST}/api/InventoryManager/AddItem?itemName=${inputName}&specification=${inputSpec}&categoryId=${categoryId}&itemType=${selectedOption}`
    );


    console.log(response.data); // Handle the response data here
  } catch (error) {
    console.error(error); // Handle error here
  }
};


//   const data = Object.keys(input).map((key) => ({
//     shippedQuantity: Number(input),
//   }));

//  Issue Item Page

export const GetItemList = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}/api/InventoryManager/GetItemList`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

//   export const editQuantity = async (itemId,inputQuantity) => {

    
//   try {
//     const response = await axios.put(
//       `${process.env.REACT_APP_API_HOST}/api/InventoryManager/IssueItem?itemId=${itemId}&quantityIssued=${inputQuantity}`
//     );


//     console.log(response.data); // Handle the response data here
//   } catch (error) {
//     console.error(error); // Handle error here
//   }
// };

export const editQuantity = async (itemId,inputQuantity) => {
   
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_HOST}/api/InventoryManager/IssueItem?itemId=${itemId}&quantityIssued=${inputQuantity}` );
  
      console.log(response.data); // Handle the response data here
    } catch (error) {
      console.error(error); // Handle error here
    }
  };