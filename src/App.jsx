import { useState } from 'react';
import './App.css';
import Navbar from './Tailwind Compo/NavBar.jsx';
import Canva from './Tailwind Compo/Canva.jsx';
import Home from './Tailwind Compo/Home.jsx';
import About from './Tailwind Compo/About.jsx'; // Assuming "About" is your CreateProject component
import Signin from './Tailwind Compo/Signin.jsx';
import Login from './Tailwind Compo/Login.jsx'
import Footer from './Tailwind Compo/Footer.jsx';

function App() {
  // State to manage which section is active
  const [activeSection, setActiveSection] = useState('Home');

  // Function to handle section change
  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <>
      <Navbar onSectionChange={handleSectionChange} />
      <div className="canva-layout">
        {activeSection === 'Signin' && <Signin />}
        {activeSection === 'Home' && <Home onSectionChange={handleSectionChange} />}
        {activeSection === 'Deck' && <Canva />}
        {activeSection === 'CreateProject' && <About />}
        {activeSection === 'Login' && <Login />}
      </div>
      <Footer/>
    </>
  );
}

export default App;
