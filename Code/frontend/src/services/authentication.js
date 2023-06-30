import axios from "axios";

export const LoginService = async (userName, password) => {
    try {
        const response = await axios.post(
            `https://localhost:7102/api/login`,
            {
                email:userName,
                password:password,
            }
        );
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

