import React, { useState, useEffect } from 'react';
import './App.css';
import { supabase } from './supabaseClient';

function App() {
  const [session, setSession] = useState(null);
  
  useEffect(() => {
    // Check for active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="app">
      {!session ? (
        <div className="auth-section">
          <h1>Texas Towing Ops</h1>
          <p>Professional Handbook & Operations Management</p>
          <button 
            className="login-btn"
            onClick={() => {
              supabase.auth.signInWithPassword({
                email: 'test@example.com',
                password: 'password123'
              });
            }}
          >
            Demo Login
          </button>
        </div>
      ) : (
        <div className="dashboard">
          <header>
            <h1>Texas Towing Ops & Handbook</h1>
            <button onClick={() => supabase.auth.signOut()}>Sign Out</button>
          </header>
          
          <main>
            <h2>Operations Dashboard</h2>
            
            <div className="section">
              <h3>Operations</h3>
              <div className="tiles">
                <div className="tile">
                  <h4>Dispatch System</h4>
                  <p>Task info & assignments</p>
                </div>
                <div className="tile">
                  <h4>Driver Calls</h4>
                  <p>Service records & completion</p>
                </div>
              </div>
            </div>
            
            <div className="section">
              <h3>Compliance</h3>
              <div className="tiles">
                <div className="tile">
                  <h4>Daily Inspections</h4>
                  <p>Vehicle safety checks</p>
                </div>
                <div className="tile">
                  <h4>Handbook</h4>
                  <p>Safety protocols & procedures</p>
                </div>
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
