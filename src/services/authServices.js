import API from "../api/axios";

export const login = async (userData) => {
    try {
        const response = await API.post('/users/login', userData);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        if (error.response) {
            return error.response.data;
        }
        return { message: 'Something went wrong' };
    }
}

export const register = async (userData) => {
    try {
        const response = await API.post('/users/signup', userData);
        if (response.status === 201) {
            return response.data;
        }
    } catch (error) {
        if (error.response) {
            return error.response.data;
        }
        return { message: 'Something went wrong' };
    }
}