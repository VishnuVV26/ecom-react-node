// LoginModal.js
import React, { useState } from 'react';
import useFormData from '../../hooks/useFormData';
import { login } from '../../services/authServices';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import FullPageLoader from '../common/Loader';

const LoginModal = ({ isOpen, onClose, onSwitchToSignup }) => {
    const { formData, handleChange, resetFormData } = useFormData({
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');
        try {
            const response = await login(formData);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            if (response.token) {
                resetFormData();
                onClose();
                const decodedToken = jwtDecode(response.token);

                if (decodedToken.role === 'admin') {
                    navigate('admin/dashboard');
                } else {
                    navigate('/');
                }
            }
        } catch (err) {
            console.error(err);
            if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError(err.message || 'Something went wrong');
            }
        } finally {
            setIsSubmitting(false);
        }
    }

    if (!isOpen) return null;

    return (
        <>
            {isSubmitting && <FullPageLoader />}
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4 sm:px-6">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-300 hover:text-white transition z-50"
                    disabled={isSubmitting}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                    </svg>
                </button>
                <div className="bg-primary-5 rounded-xl shadow-xl w-full max-w-md sm:max-w-lg lg:max-w-[500px] 2xl:max-w-[500px] p-6 sm:p-8">
                    <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center uppercase text-primary-4">Login</h2>

                    {error && <p className="text-red-500 mb-3 text-sm text-center">{error}</p>}

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <input
                            name="email"
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-primary-4"
                            required
                            disabled={isSubmitting}
                        />
                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-primary-4"
                            required
                            disabled={isSubmitting}
                        />
                        <button
                            type="submit"
                            className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-2 transition text-sm sm:text-base"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Logging in...' : 'Login'}
                        </button>
                    </form>

                    <div className='mt-4 pb-3 text-center'>
                        <p className='text-xs sm:text-sm font-medium text-gray-500'>
                            Don't have an account?{' '}
                            <button
                                onClick={onSwitchToSignup}
                                className='hover:underline hover:text-primary-4 cursor-pointer'
                                disabled={isSubmitting}
                            >
                                Signup
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginModal;