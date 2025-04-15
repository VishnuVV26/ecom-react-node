import React, { useState } from 'react'
import useFormData from '../../hooks/useFormData';
import { register } from '../../services/authServices';

const SignupModal = ({ isOpen, onClose, onSwitchToLogin }) => {
    const { formData, handleChange, resetFormData } = useFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const response = await register(formData);
            if (response.status === 201) {
                console.log('Registration successful:', response.data);
                resetFormData();
                onClose();
            }
        }
        catch (err) {
            if (err.response) {
                setError(err.response.data.message || 'Registration failed');
            } else {
                setError('Something went wrong');
            }
        }
        finally {
            setLoading(false);
        }
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-300 hover:text-white transition z-50"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                </svg>
            </button>
            <div className="bg-primary-5 rounded-xl shadow-xl p-6 w-full max-w-[500px] sm:max-w-md md:max-w-lg lg:max-w-lg 2xl:max-w-2xl">
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
                    />
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-primary-4"
                        required
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-primary-4"
                        required
                    />
                    <input
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-primary-4"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-2 transition"
                        disabled={loading}
                    >
                        {loading ? 'Sign in...' : 'Signup'}
                    </button>
                </form>
                <div className="mt-2 pb-3 text-center">
                    <p className="text-sm font-medium text-gray-500">
                        Already have an account?{' '}
                        <button
                            onClick={onSwitchToLogin}
                            className="text-primary hover:underline cursor-pointer"
                        >
                            Login
                        </button>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignupModal