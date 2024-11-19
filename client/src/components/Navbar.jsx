import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, isManager, logout } = useAuth();

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <nav className="bg-white/1 backdrop-blur-md shadow-md fixed w-full z-50 top-0 border-b-2 border-blue-500">
      <div className="container w-full mx-auto px-6 py-3 flex justify-between items-center bg-zinc-900">
        <div 
          className="text-2xl font-bold text-blue-500 cursor-pointer" 
          onClick={() => handleNavigation('/')}
        >
          ProDeck
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-zinc-200 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
              )}
            </svg>
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex md:items-center md:space-x-2">
          <button onClick={() => handleNavigation('/')} className="text-zinc-200 py-2 px-3 rounded-md hover:bg-white/10 transition">
            Home
          </button>
          
          {isAuthenticated ? (
            <>
              <button onClick={() => handleNavigation('/deck')} className="text-blue-500 py-2 px-3 rounded-md hover:bg-white/10 transition">
                Deck
              </button>
              {isManager && (
                <button onClick={() => handleNavigation('/create')} className="text-green-500 py-2 px-3 rounded-md hover:bg-white/10 transition">
                  Create Project
                </button>
              )}
              <button onClick={logout} className="text-red-600 py-2 px-3 rounded-md hover:bg-white/10 transition">
                Sign out
              </button>
            </>
          ) : (
            <>
              <button onClick={() => handleNavigation('/signin')} className="text-blue-500 py-2 px-3 rounded-md hover:bg-white/10 transition">
                Sign In
              </button>
              <button onClick={() => handleNavigation('/login')} className="text-blue-500 py-2 px-3 rounded-md hover:bg-white/10 transition">
                Log In
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <div className={`fixed top-0 right-0 h-full transform bg-zinc-900 ${isOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out md:hidden w-64 z-50`}>
          <div className="flex flex-col mt-16 space-y-4 px-6 backdrop-blur-lg shadow-lg min-h-screen bg-zinc-800">
            <button onClick={() => handleNavigation('/')} className="text-zinc-200 py-2 px-3 rounded-md hover:bg-white/10 transition">
              Home
            </button>
            
            {isAuthenticated ? (
              <>
                <button onClick={() => handleNavigation('/deck')} className="text-blue-500 py-2 px-3 rounded-md hover:bg-white/10 transition">
                  Deck
                </button>
                {isManager && (
                  <button onClick={() => handleNavigation('/create')} className="text-green-500 py-2 px-3 rounded-md hover:bg-white/10 transition">
                    Create Project
                  </button>
                )}
                <button onClick={logout} className="text-red-600 py-2 px-3 rounded-md hover:bg-white/10 transition">
                  Sign out
                </button>
              </>
            ) : (
              <>
                <button onClick={() => handleNavigation('/signin')} className="text-blue-500 py-2 px-3 rounded-md hover:bg-white/10 transition">
                  Sign In
                </button>
                <button onClick={() => handleNavigation('/login')} className="text-blue-500 py-2 px-3 rounded-md hover:bg-white/10 transition">
                  Log In
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;