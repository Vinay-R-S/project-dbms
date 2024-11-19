import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(formData.email, formData.password);
            navigate('/deck'); // Redirect to deck after successful login
        } catch (err) {
            setError(err.message || 'Login failed');
        }
    };

    return (
        <div className="mt-32">
            <div className="w-full h-full flex justify-center align-center">
                <div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Log in to ProDeck</h2>
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                            {error}
                        </div>
                    )}
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <input 
                                type="email" 
                                name="email" 
                                value={formData.email}
                                onChange={handleChange}
                                className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                placeholder="Enter your email" 
                                required 
                            />
                            
                            <input 
                                type="password" 
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password" 
                                className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                required 
                            />
                        </div>
                        
                        <div className="flex flex-col justify-center align-center">
                            <button 
                                type="submit" 
                                className="mb-4 w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Login
                            </button>
                            <div className="flex justify-center align-center text-sm font-medium text-gray-900 dark:text-white">
                                <h5 className='mr-2'>Not registered yet?{' '}</h5>
                                <button 
                                    onClick={() => navigate('/signin')}
                                    className="text-blue-600 hover:underline dark:text-blue-500"
                                >
                                    Create account
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;