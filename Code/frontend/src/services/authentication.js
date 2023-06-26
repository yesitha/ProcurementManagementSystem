import axios from "axios";

export const LoginService = async (userName, password) => {
  try {
    const responce = await axios.post("", {
        userName: userName,
        password: password,
    });
    return responce.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
