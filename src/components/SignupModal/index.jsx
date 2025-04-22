// SignupModal.js
import React, { useState } from 'react'
import useFormData from '../../hooks/useFormData';
import { register } from '../../services/authServices';
import FullPageLoader from '../common/Loader';

const SignupModal = ({ isOpen, onClose, onSwitchToLogin }) => {
    const { formData, handleChange, resetFormData } = useFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'user'
    });
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);
        try {
            const response = await register(formData);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            if (response.status === 201) {
                console.log('Registration successful:', response.data);
                resetFormData();
                onClose();
                onSwitchToLogin();
            }
        } catch (err) {
            if (err.response) {
                setError(err.response.data.message || 'Registration failed');
            } else {
                setError('Something went wrong');
            }
        } finally {
            setIsSubmitting(false);
            resetFormData();
        }
    }

    if (!isOpen) return null;

    return (
        <>
            {isSubmitting && <FullPageLoader />}
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-300 hover:text-white transition z-50"
                    disabled={isSubmitting}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                    </svg>
                </button>
                <div className="bg-primary-5 rounded-xl shadow-xl p-6 w-full max-w-[500px] sm:max-w-md md:max-w-lg lg:max-w-[500px] 2xl:max-w-[500px]">
                    <h2 className="text-2xl font-semibold mb-4 text-center uppercase text-primary-4">Register</h2>
                    {error && <p className="text-red-500 mb-2 text-center">{error}</p>}
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <input
                            name="name"
                            type="text"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-primary-4"
                            required
                            disabled={isSubmitting}
                        />
                        <input
                            name="email"
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-primary-4"
                            required
                            disabled={isSubmitting}
                        />
                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-primary-4"
                            required
                            disabled={isSubmitting}
                        />
                        <input
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-primary-4"
                            required
                            disabled={isSubmitting}
                        />
                        <div className="flex items-center space-x-4">
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    name="role"
                                    value="user"
                                    checked={formData.role === 'user'}
                                    onChange={handleChange}
                                    className="form-radio h-4 w-4 text-primary-4 accent-primary border border-primary-2"
                                    disabled={isSubmitting}
                                />
                                <span className="ml-2">User</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    name="role"
                                    value="admin"
                                    checked={formData.role === 'admin'}
                                    onChange={handleChange}
                                    className="form-radio h-4 w-4 text-primary-4 accent-primary border border-primary-2"
                                    disabled={isSubmitting}
                                />
                                <span className="ml-2">Admin</span>
                            </label>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-2 transition"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Signing up...' : 'Signup'}
                        </button>
                    </form>
                    <div className="mt-2 pb-3 text-center">
                        <p className="text-sm font-medium text-gray-500">
                            Already have an account?{' '}
                            <button
                                onClick={onSwitchToLogin}
                                className="text-primary hover:underline cursor-pointer"
                                disabled={isSubmitting}
                            >
                                Login
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignupModal