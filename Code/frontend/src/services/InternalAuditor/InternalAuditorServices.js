import axios from "axios";

// view finalized master procurement plan

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