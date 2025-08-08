import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import './features.css';

// Component imports
import Layout from './Layout';
import Home from './pages/Home';
import Handbook from './pages/Handbook';
import Login from './pages/Login';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Simulated auth check - replace with your actual auth logic
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
    return <div className="loading">Loading...</div>;
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
        
        {/* Add more routes for other features */}
        
        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
