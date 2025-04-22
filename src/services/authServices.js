import API from "../api/axios";

export const login = async (userData) => {
    const response = await API.post('/users/login', userData);
    if (response.status === 201) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        return response.data;
    }
    throw new Error('Login failed');
};


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