import axios from "axios";

const URL_LOGIN = `https://fams-management.tech/auth/login`

export const loginApi = (email, password) => {
    return axios.post(URL_LOGIN, {
        email: email,
        password: password,
    });
};

export const getUserDataFromToken = () => {
    const token = localStorage.getItem('token');

    try {
        if (token) {
            const payload = token.split('.')[1];
            const decodedPayload = atob(payload);
            const data = JSON.parse(decodedPayload);

            
            if (data && data.RoleName) {
                return data.RoleName;
            }
        }
    } catch (error) {
        console.error('Error decoding or parsing token:', error.message);
    }

    return null;
};

export const getEmailFromToken = () => {
    const token = localStorage.getItem('token');

    try {
        if (token) {
            const payload = token.split('.')[1];
            const decodedPayload = atob(payload);
            const data = JSON.parse(decodedPayload);

            
            if (data && data.sub) {
                return data.sub;
            }
        }
    } catch (error) {
        console.error('Error decoding or parsing token:', error.message);
    }

    return null;
};

export const getUserNameFromToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const data = JSON.parse(atob(token.split('.')[1]));
      console.log("Data: ", data)
      return data;
    }
    return null;
  };
