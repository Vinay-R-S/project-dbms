import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: 'Employee'
    });
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const toggleRole = () => {
        setFormData(prev => ({
            ...prev,
            role: prev.role === 'Employee' ? 'Manager' : 'Employee'
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(formData);
            navigate('/deck');
        } catch (err) {
            setError(err.message || 'Registration failed');
        }
    };

    return (
        <div className="mt-32">
            <div className="w-full h-full flex justify-center align-center">
                <div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Sign up to ProDeck</h2>
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                            {error}
                        </div>
                    )}
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <input 
                                type="text" 
                                name="firstName" 
                                value={formData.firstName}
                                onChange={handleChange}
                                className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                placeholder="First Name" 
                                required 
                            />

                            <input 
                                type="text" 
                                name="lastName" 
                                value={formData.lastName}
                                onChange={handleChange}
                                className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                placeholder="Last Name" 
                                required 
                            />

                            <input 
                                type="email" 
                                name="email" 
                                value={formData.email}
                                onChange={handleChange}
                                className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                placeholder="Email" 
                                required 
                            />

                            <input 
                                type="password" 
                                name="password" 
                                value={formData.password}
                                onChange={handleChange}
                                className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                placeholder="Password" 
                                required 
                            />

                            <div className="mb-4 flex items-center">
                                <span className="text-sm font-medium text-gray-900 dark:text-white mr-4">Role:</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        className="sr-only peer" 
                                        checked={formData.role === "Manager"}
                                        onChange={toggleRole}
                                    />
                                    <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600"></div>
                                    <span className="ml-3 text-sm font-medium text-gray-900 dark:text-white">
                                        {formData.role}
                                    </span>
                                </label>
                            </div>
                        </div>
                        
                        <div className="flex flex-col justify-center align-center">
                            <button 
                                type="submit" 
                                className="mb-4 w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
                            >
                                Sign up
                            </button>
                            <div className="flex justify-center align-center text-sm font-medium text-gray-900 dark:text-white">
                                <h5 className='mr-2'>Already have an account?{' '}</h5>
                                <button 
                                    onClick={() => navigate('/login')}
                                    className="text-blue-600 hover:underline dark:text-blue-500"
                                >
                                    Log in
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signin;