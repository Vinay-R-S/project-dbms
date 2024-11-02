import React from 'react';

const Login = () => {
    return (
        <div className="mt-32">
            <div className="w-full h-full flex justify-center align-center">
                <div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Log in to ProDeck</h2>
                    <form className="mt-8 space-y-6" action="#" mehtod="POST">
                        <div>
                            {/* Email */}
                            <input type="email" name="email" id="email" className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your email" required />
                            
                            {/* Password */}
                            <input type="password" name="password" id="password" placeholder="Enter your password" className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        </div>
                        
                        <div className="flex flex-col justify-center align-center">
                            <button type="submit" className="mb-4 w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Login
                            </button>
                            <div className="flex justify-center align-center text-sm font-medium text-gray-900 dark:text-white">
                                <h5 className='mr-2'>Not registered yet?{' '}</h5>
                                <a className="text-blue-600 hover:underline dark:text-blue-500">Create account</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
