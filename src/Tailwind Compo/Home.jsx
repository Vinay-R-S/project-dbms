import React from 'react';
import Footer from './Footer';

const Home = ({onSectionChange}) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white-100 py-8 mt-16">
            <h1 className="text-4xl font-bold text-gray-200 mb-4">Welcome to <span className='text-blue-500'>ProDeck</span></h1>
            <p className="text-lg text-gray-200 mb-8 text-center">
                Simplify your project management with efficient task tracking and team collaboration.
            </p>

            <div className="flex space-x-4 mt-4 mb-4">
                <button onClick={() => onSectionChange("Deck")} className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">
                    Get Started
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl px-6 mt-8">
                {/* Task Management Card */}
                <div className="bg-gray-300 text-gray-900 shadow-md rounded-lg p-6 flex flex-col items-center">
                    <svg className='w-12 h-12' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.18 8.03933L18.6435 7.57589C19.4113 6.80804 20.6563 6.80804 21.4241 7.57589C22.192 8.34374 22.192 9.58868 21.4241 10.3565L20.9607 10.82M18.18 8.03933C18.18 8.03933 18.238 9.02414 19.1069 9.89309C19.9759 10.762 20.9607 10.82 20.9607 10.82M18.18 8.03933L13.9194 12.2999C13.6308 12.5885 13.4865 12.7328 13.3624 12.8919C13.2161 13.0796 13.0906 13.2827 12.9882 13.4975C12.9014 13.6797 12.8368 13.8732 12.7078 14.2604L12.2946 15.5L12.1609 15.901M20.9607 10.82L16.7001 15.0806C16.4115 15.3692 16.2672 15.5135 16.1081 15.6376C15.9204 15.7839 15.7173 15.9094 15.5025 16.0118C15.3203 16.0986 15.1268 16.1632 14.7396 16.2922L13.5 16.7054L13.099 16.8391M13.099 16.8391L12.6979 16.9728C12.5074 17.0363 12.2973 16.9867 12.1553 16.8447C12.0133 16.7027 11.9637 16.4926 12.0272 16.3021L12.1609 15.901M13.099 16.8391L12.1609 15.901" stroke="#1e88e5" stroke-width="1.5" />
                        <path d="M8 13H10.5" stroke="#1e88e5" stroke-width="1.5" stroke-linecap="round" />
                        <path d="M8 9H14.5" stroke="#1e88e5" stroke-width="1.5" stroke-linecap="round" />
                        <path d="M8 17H9.5" stroke="#1e88e5" stroke-width="1.5" stroke-linecap="round" />
                        <path d="M19.8284 3.17157C18.6569 2 16.7712 2 13 2H11C7.22876 2 5.34315 2 4.17157 3.17157C3 4.34315 3 6.22876 3 10V14C3 17.7712 3 19.6569 4.17157 20.8284C5.34315 22 7.22876 22 11 22H13C16.7712 22 18.6569 22 19.8284 20.8284C20.7715 19.8853 20.9554 18.4796 20.9913 16" stroke="#1e88e5" stroke-width="1.5" stroke-linecap="round" />
                    </svg>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Task Management</h3>
                    <p className="text-gray-900 text-center">Assign tasks, set deadlines, and track progress effortlessly.</p>
                </div>

                {/* Team Collaboration Card */}
                <div className="bg-gray-300 text-gray-900 shadow-md rounded-lg p-6 flex flex-col items-center">
                    <svg className="w-12 h-12" fill="#4caf50" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve">
                        <g>
                            <g>
                                <path d="M256,14.798c-25.327,0-45.932,20.605-45.932,45.932c0,25.327,20.606,45.932,45.932,45.932
                        c25.326,0,45.932-20.605,45.932-45.932C301.932,35.403,281.327,14.798,256,14.798z"/>
                            </g>
                        </g>
                        <g>
                            <g>
                                <path d="M330.311,182.356l-19.491-58.473c-2.273-6.817-8.652-11.416-15.838-11.416h-77.965c-7.187,0-13.565,4.598-15.838,11.416
                        l-19.491,58.473c-3.602,10.806,4.459,21.974,15.838,21.974h116.947C325.865,204.33,333.909,193.151,330.311,182.356z"/>
                            </g>
                        </g>
                        <g>
                            <g>
                                <path d="M75.179,161.234c-25.327,0-45.932,20.605-45.932,45.932c0,25.327,20.606,45.932,45.932,45.932
                        c25.326,0,45.932-20.605,45.932-45.932C121.111,181.839,100.506,161.234,75.179,161.234z"/>
                            </g>
                        </g>
                        <g>
                            <g>
                                <path d="M149.492,328.792L130,270.319c-2.273-6.817-8.652-11.415-15.838-11.415H36.196c-7.187,0-13.565,4.598-15.838,11.416
                        L0.868,328.792c-3.602,10.807,4.46,21.974,15.838,21.974h116.947C145.044,350.766,153.089,339.587,149.492,328.792z"/>
                            </g>
                        </g>
                        <g>
                            <g>
                                <path d="M256.001,307.672c-25.327,0-45.932,20.605-45.932,45.932c0,25.326,20.605,45.932,45.932,45.932
                        c25.327,0,45.932-20.605,45.932-45.932S281.328,307.672,256.001,307.672z"/>
                            </g>
                        </g>
                        <g>
                            <g>
                                <path d="M330.312,475.228l-19.491-58.473c-2.273-6.817-8.652-11.416-15.838-11.416h-77.965c-7.187,0-13.565,4.598-15.838,11.416
                        l-19.491,58.473c-3.602,10.807,4.46,21.974,15.838,21.974h116.947C325.866,497.201,333.91,486.023,330.312,475.228z"/>
                            </g>
                        </g>
                        <g>
                            <g>
                                <path d="M189.704,80.17c-4.012-8.302-13.996-11.779-22.297-7.766c-25.863,12.501-49.308,30.793-67.799,52.897
                        c-5.916,7.073-4.978,17.602,2.094,23.519c7.071,5.916,17.6,4.98,23.518-2.094c15.475-18.499,35.088-33.804,56.719-44.259
                        C190.239,98.454,193.717,88.472,189.704,80.17z"/>
                            </g>
                        </g>
                        <g>
                            <g>
                                <path d="M436.82,161.235c-25.327,0-45.932,20.606-45.932,45.932c0,25.326,20.605,45.932,45.932,45.932
                        s45.932-20.605,45.932-45.932C482.752,181.84,462.147,161.235,436.82,161.235z"/>
                            </g>
                        </g>
                        <g>
                            <g>
                                <path d="M511.133,328.792l-19.491-58.473c-2.273-6.817-8.652-11.416-15.838-11.416H397.84c-7.187,0-13.565,4.598-15.838,11.415
                        l-19.492,58.473c-3.602,10.807,4.46,21.975,15.838,21.975h116.946C506.685,350.766,514.73,339.587,511.133,328.792z"/>
                            </g>
                        </g>
                        <g>
                            <g>
                                <path d="M412.39,125.302c-18.491-22.104-41.935-40.395-67.799-52.897c-8.303-4.011-18.284-0.535-22.297,7.766
                        c-4.011,8.301-0.534,18.283,7.766,22.296c21.631,10.455,41.244,25.76,56.719,44.259c5.918,7.073,16.446,8.008,23.518,2.094
                        C417.369,142.903,418.307,132.374,412.39,125.302z"/>
                            </g>
                        </g>
                        <g>
                            <g>
                                <path d="M410.297,363.182c-7.071-5.916-17.601-4.98-23.518,2.094c-15.475,18.499-35.088,33.804-56.719,44.259
                        c-8.301,4.012-11.779,13.995-7.765,22.297c4.013,8.304,13.997,11.777,22.297,7.766c25.863-12.501,49.308-30.793,67.799-52.897
                        C418.307,379.628,417.369,369.099,410.297,363.182z"/>
                            </g>
                        </g>
                        <g>
                            <g>
                                <path d="M181.939,409.534c-21.631-10.456-41.244-25.76-56.719-44.259c-5.918-7.073-16.446-8.009-23.518-2.094
                        c-7.072,5.917-8.009,16.446-2.092,23.518c18.491,22.104,41.935,40.395,67.799,52.897c8.306,4.015,18.285,0.532,22.296-7.765
                        C193.716,423.529,190.239,413.547,181.939,409.534z"/>
                            </g>
                        </g>
                    </svg>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Team Collaboration</h3>
                    <p className="text-gray-900 text-center">Enable seamless communication and collaboration among team members.</p>
                </div>

                {/* Progress Tracking Card */}
                <div className="bg-gray-300 text-gray-900 shadow-md rounded-lg p-6 flex flex-col items-center">
                    <svg className="w-12 h-12 text-purple-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Progress Tracking</h3>
                    <p className="text-gray-900 text-center">Get a visual overview of project status and milestones.</p>
                </div>

                {/* Real-Time Updates Card */}
                <div className="bg-gray-300 text-gray-900 shadow-md rounded-lg p-6 flex flex-col items-center">
                    <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 5.5L5 3.5M21 5.5L19 3.5M9 12.5L11 14.5L15 10.5M20 12.5C20 16.9183 16.4183 20.5 12 20.5C7.58172 20.5 4 16.9183 4 12.5C4 8.08172 7.58172 4.5 12 4.5C16.4183 4.5 20 8.08172 20 12.5Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-Time Updates</h3>
                    <p className="text-gray-900 text-center">Stay informed with live updates on task completion and project changes.</p>
                </div>

                {/* User-Friendly Interface Card */}
                <div className="bg-gray-300 text-gray-900 shadow-md rounded-lg p-6 flex flex-col items-center">
                    <svg className='w-12 h-12' fill="#000000" viewBox="0 0 35 35" data-name="Layer 2" id="b6b3c632-959e-430c-923d-e86193c4d165" xmlns="http://www.w3.org/2000/svg">
                        <path d="M30.559,26.568H4.441A4.2,4.2,0,0,1,.25,22.376V5.361A4.2,4.2,0,0,1,4.441,1.17H30.559A4.2,4.2,0,0,1,34.75,5.361V22.376A4.2,4.2,0,0,1,30.559,26.568ZM4.441,3.67A1.693,1.693,0,0,0,2.75,5.361V22.376a1.693,1.693,0,0,0,1.691,1.692H30.559a1.694,1.694,0,0,0,1.691-1.692V5.361A1.693,1.693,0,0,0,30.559,3.67Z" />
                        <path d="M20.6,33.459a1.25,1.25,0,0,1-1.25-1.25V25.318a1.25,1.25,0,1,1,2.5,0v6.891A1.249,1.249,0,0,1,20.6,33.459Z" /><path d="M15.415,33.459a1.25,1.25,0,0,1-1.25-1.25V25.318a1.25,1.25,0,0,1,2.5,0v6.891A1.249,1.249,0,0,1,15.415,33.459Z" />
                        <path d="M25.537,33.83H10.474a1.25,1.25,0,0,1,0-2.5H25.537a1.25,1.25,0,0,1,0,2.5Z" />
                    </svg>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">User-Friendly Interface</h3>
                    <p className="text-gray-900 text-center">Navigate and manage your projects with ease.</p>
                </div>

                {/* Customizable Workflows Card */}
                <div className="bg-gray-300 text-gray-900 shadow-md rounded-lg p-6 flex flex-col items-center">
                <svg className='w-12 h-12' fill="#15B8A6" viewBox="0 0 256 256" id="Flat" xmlns="http://www.w3.org/2000/svg">
                    <path d="M200.00781,88V200a16.01833,16.01833,0,0,1-16,16h-144a16.01833,16.01833,0,0,1-16-16V88a16.01833,16.01833,0,0,1,16-16h144A16.01833,16.01833,0,0,1,200.00781,88Zm16-48h-152a8,8,0,0,0,0,16h152V176a8,8,0,0,0,16,0V56A16.01833,16.01833,0,0,0,216.00781,40Z"/>
                </svg>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Customizable Workflows</h3>
                <p className="text-gray-900 text-center">
                    Tailor workflows to fit your team's unique processes, enhancing flexibility and efficiency.
                </p>
                </div>
            </div>
        </div>
    );
};

export default Home;
