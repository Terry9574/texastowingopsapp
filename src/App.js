import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import './App.css';

// Initialize Supabase client
const supabaseUrl = 'https://odxwjyuamvgccpesykts.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9keHdqeXVhbXZnY2NwZXN5a3RzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0Mjk4MTQsImV4cCI6MjA3MDAwNTgxNH0.BnzEn6Ep40ysR0hRcuYeY61Rlxohd2YDIvuHbQvDeAc';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(null);
  
  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setLoading(false);
      }
    );
    
    return () => subscription.unsubscribe();
  }, []);
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError(null);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        setLoginError(error.message);
      }
    } catch (error) {
      setLoginError('An error occurred during login');
      console.error(error);
    }
  };
  
  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };
  
  // Show loading indicator
  if (loading) {
    return <div className="loading">Loading...</div>;
  }
  
  return (
    <div className="app">
      {!session ? (
        <div className="login-page">
          <header>
            <h1>Texas Towing Ops</h1>
            <p>Professional Handbook & Operations Management</p>
          </header>
          
          <div className="login-container">
            <h2>Login to Your Account</h2>
            {loginError && <div className="error-message">{loginError}</div>}
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Password</label>
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <button type="submit" className="login-button">Log In</button>
            </form>
            
            <div className="demo-login">
              <p>For testing, use these credentials:</p>
              <p>Email: demo@texastowing.com</p>
              <p>Password: password123</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="dashboard-page">
          <header className="dashboard-header">
            <div>
              <h1>Texas Towing Ops</h1>
              <p>Professional Handbook & Operations Management</p>
            </div>
            <button onClick={handleSignOut} className="sign-out-button">
              Sign Out
            </button>
          </header>
          
          <main>
            <div className="welcome-section">
              <h2>Welcome to Your Dashboard</h2>
              <p>You are signed in as: {session.user.email}</p>
            </div>
            
            <h3 className="section-title">Operations</h3>
            <div className="feature-grid">
              <div className="feature-card">
                <h4>Dispatch System</h4>
                <p>Task info & assignments</p>
              </div>
              <div className="feature-card">
                <h4>Driver Calls</h4>
                <p>Service records & completion</p>
              </div>
              <div className="feature-card">
                <h4>Impound Facility</h4>
                <p>Manage vehicles in the impound facility</p>
              </div>
            </div>
            
            <h3 className="section-title">Compliance</h3>
            <div className="feature-grid">
              <div className="feature-card">
                <h4>Daily Inspections</h4>
                <p>Vehicle safety checks</p>
              </div>
              <div className="feature-card">
                <h4>Handbook</h4>
                <p>Safety protocols & procedures</p>
              </div>
            </div>
          </main>
          
          <footer>
            © 2025 Texas Towing Ops & Handbook
          </footer>
        </div>
      )}
    </div>
  );
}

export default App;
