import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import './features.css';

// Component imports
import Layout from './Layout';
import Handbook from './components/Handbook'; // Import from components directory
import TrainingLogs from './components/TrainingLogs'; // Add this import

// Temporary placeholder components
const Home = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8">
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h1 className="text-2xl font-bold mb-2">Welcome to Texas Towing Ops</h1>
        <p>Your towing operations management system</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-3">📖 Handbook</h2>
          <p className="text-gray-600 mb-4">Access safety protocols and company policies</p>
          <button 
            onClick={() => window.location.href = '/handbook'}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Open Handbook
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-3">📋 Training Logs</h2>
          <p className="text-gray-600 mb-4">Track and manage employee training records</p>
          <button 
            onClick={() => window.location.href = '/training-logs'}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            View Training Logs
          </button>
        </div>
      </div>
    </div>
  </div>
);

const Login = ({ setUser }) => {
  const handleLogin = () => {
    // Create a sample user for testing
    const user = {
      full_name: "Test User",
      email: "test@example.com",
      custom_role: "admin",
      company_name: "Texas Towing Ops"
    };
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Texas Towing Ops</h1>
        <button 
          onClick={handleLogin}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Sign In (Demo)
        </button>
      </div>
    </div>
  );
};

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Check if user is logged in
  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    };
    
    checkAuth();
  }, []);
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  return (
    <Router>
      <Routes>
        <Route path="/login" element={!user ? <Login setUser={setUser} /> : <Navigate to="/" />} />
        
        {/* Protected Routes */}
        <Route 
          path="/"
          element={
            user ? (
              <Layout currentPageName="Home" user={user}>
                <Home user={user} />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        
        <Route
          path="/handbook"
          element={
            user ? (
              <Layout currentPageName="Handbook" user={user}>
                <Handbook />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        
        {/* Add Training Logs Route */}
        <Route
          path="/training-logs"
          element={
            user ? (
              <Layout currentPageName="Training Logs" user={user}>
                <TrainingLogs user={user} />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        
        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
