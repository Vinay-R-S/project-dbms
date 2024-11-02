import React from 'react';

const Footer = () => {
    return (
        <footer class="bottom-0 w-full bg-zinc-900 text-gray-400 py-6">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center space-y-4 md:space-y-0">
                    {/* Left Section */}
                    <div className="text-sm">
                        © {new Date().getFullYear()} ProDeck. All rights reserved.
                    </div>

                    {/* Mid section */}
                    <div className="mt-4 flex justify-center align-center space-x-6">
                        {/* Gmail */}
                        <a href="https://gmail.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                            <svg className="w-8 h-8 bg-white flex justify-center align-center rounded-md" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <g id="Complete">
                                    <g id="mail">
                                        <polyline fill="none" points="4 8.2 12 14.1 20 8.2" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                                        <rect fill="none" height="14" rx="2" ry="2" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" width="18" x="3" y="6.5"/>
                                    </g>
                                </g>
                            </svg>
                        </a>

                        {/* Linkedin */}
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                        <svg className='w-8 h-8 bg-blue-500 px-1 py-1 rounded-sm' fill="#ffffff" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 552.77 552.77" xml:space="preserve">
                            <g>
                                <g>
                                    <path d="M17.95,528.854h71.861c9.914,0,17.95-8.037,17.95-17.951V196.8c0-9.915-8.036-17.95-17.95-17.95H17.95 C8.035,178.85,0,186.885,0,196.8v314.103C0,520.816,8.035,528.854,17.95,528.854z"/>
                                    <path d="M17.95,123.629h71.861c9.914,0,17.95-8.036,17.95-17.95V41.866c0-9.914-8.036-17.95-17.95-17.95H17.95 C8.035,23.916,0,31.952,0,41.866v63.813C0,115.593,8.035,123.629,17.95,123.629z"/>
                                    <path d="M525.732,215.282c-10.098-13.292-24.988-24.223-44.676-32.791c-19.688-8.562-41.42-12.846-65.197-12.846 c-48.268,0-89.168,18.421-122.699,55.27c-6.672,7.332-11.523,5.729-11.523-4.186V196.8c0-9.915-8.037-17.95-17.951-17.95h-64.192 c-9.915,0-17.95,8.035-17.95,17.95v314.103c0,9.914,8.036,17.951,17.95,17.951h71.861c9.915,0,17.95-8.037,17.95-17.951V401.666 c0-45.508,2.748-76.701,8.244-93.574c5.494-16.873,15.66-30.422,30.488-40.649c14.83-10.227,31.574-15.343,50.24-15.343 c14.572,0,27.037,3.58,37.393,10.741c10.355,7.16,17.834,17.19,22.436,30.104c4.604,12.912,6.904,41.354,6.904,85.33v132.627 c0,9.914,8.035,17.951,17.949,17.951h71.861c9.914,0,17.949-8.037,17.949-17.951V333.02c0-31.445-1.982-55.607-5.941-72.48 S535.836,228.581,525.732,215.282z"/>
                                    </g>
                                </g>
                            </svg>                         
                        </a>
                    </div>

                    {/* Right Section */}
                    <div className="flex space-x-4">
                        <a href="/terms-of-service" className="hover:text-white transition">Terms of Service</a>
                        <a href="/contact" className="hover:text-white transition">Contact Us</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
