import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bottom-0 w-full bg-zinc-900 text-gray-400 py-6">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    {/* Left Section */}
                    <div className="text-sm">
                        © {new Date().getFullYear()} ProDeck. All rights reserved.
                    </div>

                    {/* Mid section */}
                    <div className="flex justify-center space-x-6">
                        {/* Gmail */}
                        <a href="mailto:contact@prodeck.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                            <svg className="w-8 h-8 bg-white flex justify-center align-center rounded-md" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <g id="Complete">
                                    <g id="mail">
                                        <polyline fill="none" points="4 8.2 12 14.1 20 8.2" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                                        <rect fill="none" height="14" rx="2" ry="2" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" width="18" x="3" y="6.5"/>
                                    </g>
                                </g>
                            </svg>
                        </a>

                        {/* LinkedIn */}
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                            <svg className="w-8 h-8 bg-white flex justify-center align-center rounded-md" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <rect x="2" y="9" width="4" height="12" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <circle cx="4" cy="4" r="2" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </a>

                        {/* GitHub */}
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                            <svg className="w-8 h-8 bg-white flex justify-center align-center rounded-md" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </a>
                    </div>

                    {/* Right section */}
                    <div className="flex space-x-4 text-sm">
                        <Link to="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link>
                        <Link to="/terms-of-service" className="hover:text-white transition">Terms of Service</Link>
                        <Link to="/contact" className="hover:text-white transition">Contact Us</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;