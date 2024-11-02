import React, { useState } from "react";

const Navbar = ({ onSectionChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white/1 backdrop-blur-md shadow-md fixed w-full z-50 top-0 border-b-2 border-blue-500">
      <div className="container w-full mx-auto px-6 py-3 flex justify-between items-center bg-zinc-900">
        <div className="text-2xl font-bold text-blue-500">ProDeck</div>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-zinc-200 focus:outline-none" >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isOpen ? (<></>) : (<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>)}
            </svg>
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex md:items-center md:space-x-2">
          <button onClick={() => onSectionChange("Home")} className="text-zinc-200 py-2 px-3 rounded-md hover:bg-white/10 transition">
            Home
          </button>
          <button onClick={() => onSectionChange("CreateProject")} className="text-green-500 py-2 px-3 rounded-md hover:bg-white/10 transition">
            Create Project
          </button>
          <button onClick={() => onSectionChange("Deck")} className="text-blue-500 py-2 px-3 rounded-md hover:bg-white/10 transition">
            Deck
          </button>
          <button onClick={() => onSectionChange("Signin")} className="text-blue-500 py-2 px-3 rounded-md hover:bg-white/10 transition">
            Sign In
          </button>
          <button onClick={() => onSectionChange("Login")} className="text-blue-500 py-2 px-3 rounded-md hover:bg-white/10 transition">
            Log In
          </button>
          <a href="/signout" className="text-red-600 py-2 px-3 rounded-md hover:bg-white/10 transition">
            Sign out
          </a>
        </div>

        {/* Mobile Menu */}
        <div className={`fixed top-0 right-0 h-full transform bg-zinc-900 ${ isOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out md:hidden w-64 z-50`}>
          <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-zinc-200">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>

          <div className="flex flex-col mt-16 space-y-4 px-6 backdrop-blur-lg shadow-lg min-h-screen bg-zinc-800">
            <button onClick={() => { onSectionChange("Home"); setIsOpen(false); }} className="text-zinc-200 py-2 px-3 rounded-md hover:bg-white/10 transition">
              Home
            </button>
            <button onClick={() => { onSectionChange("CreateProject"); setIsOpen(false); }} className="text-green-500 py-2 px-3 rounded-md hover:bg-white/10 transition" >
              Create Project
            </button>
            <button onClick={() => { onSectionChange("Deck"); setIsOpen(false); }} className="text-blue-500 py-2 px-3 rounded-md hover:bg-white/10 transition" >
              Deck
            </button>
            <a href="/signout" className="text-red-600 py-2 px-3 rounded-md hover:bg-white/10 transition">
              Sign out
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

// import React, { useState } from "react";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <nav className="bg-white/1 backdrop-blur-md shadow-md fixed w-full z-50 top-0 border-b-2 border-blue-500">
//       <div className="container w-full mx-auto px-6 py-3 flex justify-between items-center bg-zinc-900">
//         <div className="text-2xl font-bold text-zinc-200">ProDeck</div>

//           <div className="md:hidden">
//             <button onClick={() => setIsOpen(!isOpen)} className="text-zinc-200 focus:outline-none">
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                 {isOpen ? (<></>) : (<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>)}
//               </svg>
//             </button>
//           </div>

//         {/* Desktop Menu */}
//         <div className="hidden md:flex md:items-center md:space-x-2">
//           <a href="/" className="text-zinc-200 py-2 px-3 rounded-md hover:bg-white/10 transition">
//             Home
//           </a>
//           <a href="/create" className="text-green-500 py-2 px-3 rounded-md hover:bg-white/10 transition">
//             Create Project
//           </a>
//           <a href="/deck" className="text-blue-500 py-2 px-3 rounded-md hover:bg-white/10 transition">
//             Deck
//           </a>
//           {/* <a href="/about" className="text-zinc-200 py-2 px-3 rounded-md hover:bg-white/10 transition">
//             About
//           </a> */}
//           <a href="/signout" className="text-red-600 py-2 px-3 rounded-md hover:bg-white/10 transition">
//             Sign out
//           </a>
//         </div>

//         {/* Mobile Menu */}
//         <div className={`fixed top-0 right-0 h-full transform bg-zinc-900
//         ${isOpen ? "translate-x-0" : "translate-x-full"}
//         transition-transform duration-300 ease-in-out md:hidden w-64 z-50`}>
//           {/* bg-zinc-800 backdrop-blur-lg shadow-lg */}

//           <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-zinc-200">
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>

//           <div className="flex flex-col mt-16 space-y-4 px-6 backdrop-blur-lg shadow-lg min-h-screen bg-zinc-800">
//             {/* bg-zinc-800 */}

//             <a href="/" className="text-zinc-200 py-2 px-3 rounded-md hover:bg-white/10 transition">
//               Home
//             </a>
//             <a href="/create" className="text-green-500 py-2 px-3 rounded-md hover:bg-white/10 transition">
//               Create Project
//             </a>
//             <a href="/deck" className="text-blue-500 py-2 px-3 rounded-md hover:bg-white/10 transition">
//               Deck
//             </a>
//             <a href="/signout" className="text-red-600 py-2 px-3 rounded-md hover:bg-white/10 transition">
//               Sign out
//             </a>
//             {/* <a href="/about" className="text-zinc-200 py-2 px-3 rounded-md hover:bg-white/10 transition">
//               About
//             </a> */}
//           </div>

//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
