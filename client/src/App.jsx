import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProjectProvider } from './context/ProjectContext';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Deck from './components/Deck';
import Home from './components/Home';
import Create from './components/Create';
import Signin from './components/Signin';
import Login from './components/Login';
import Footer from './components/Footer';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <ProjectProvider>
          <div className="flex flex-col min-h-screen bg-zinc-900">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signin" element={<Signin />} />
                <Route 
                  path="/deck" 
                  element={
                    <ProtectedRoute>
                      <Deck />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/create" 
                  element={
                    <ProtectedRoute>
                      <Create />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </ProjectProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;