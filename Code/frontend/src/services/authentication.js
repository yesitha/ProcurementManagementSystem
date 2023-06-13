import axios from "axios";

export const LoginService = async (userName, password) => {
  try {
    const responce = await axios.post("", {});
    return responce.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
