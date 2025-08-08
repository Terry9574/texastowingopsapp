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
  const [selectedFeature, setSelectedFeature] = useState(null);
  
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
  
  const handleFeatureClick = (feature) => {
    setSelectedFeature(feature);
  };

  const handleBackToDashboard = () => {
    setSelectedFeature(null);
  };
  
  const getFeatureTitle = (feature) => {
    const titles = {
      dispatch: 'Dispatch System',
      drivercalls: 'Driver Calls',
      impound: 'Impound Facility',
      billing: 'Customer Billing',
      livemap: 'Driver Live Map',
      equipment: 'Equipment Logs',
      inspections: 'Daily Inspections',
      handbook: 'Handbook',
      incidentreports: 'Incident Reports',
      inventory: 'Tow Truck Inventory',
      privateproperty: 'Private Property',
      damagerelease: 'Damage Release',
      legaldocs: 'Legal Documents',
      traininglogs: 'Training Logs',
      drivercompliance: 'Driver Compliance',
      licensevault: 'License Vault',
      certifications: 'Certification Management',
      driverpayroll: 'Driver Payroll Log',
      payments: 'Customer Payment Portal',
      mileage: 'Mileage & Fuel Log',
      ccauth: 'Credit Card Authorization Form',
      notifications: 'Notifications',
      feedback: 'Customer Feedback',
      reports: 'Reports & Analytics',
      submissions: 'View All Submissions',
      library: 'Resource Library',
      companymanagement: 'Company Management',
      statepapers: 'State Papers',
      usermanagement: 'User Management',
      systemsettings: 'System Settings'
    };
    
    return titles[feature] || 'Feature';
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
          
          {!selectedFeature ? (
            <main>
              <div className="welcome-section">
                <h2>Welcome to Your Dashboard</h2>
                <p>You are signed in as: {session.user.email}</p>
              </div>
              
              {/* Operations Section */}
              <h3 className="section-title">Operations</h3>
              <div className="feature-grid">
                <div className="feature-card" onClick={() => handleFeatureClick('dispatch')}>
                  <h4>Dispatch System</h4>
                  <p>Task info & assignments</p>
                </div>
                <div className="feature-card" onClick={() => handleFeatureClick('drivercalls')}>
                  <h4>Driver Calls</h4>
                  <p>Service records & completion</p>
                </div>
                <div className="feature-card" onClick={() => handleFeatureClick('impound')}>
                  <h4>Impound Facility</h4>
                  <p>Manage vehicles in the impound facility</p>
                </div>
                <div className="feature-card" onClick={() => handleFeatureClick('billing')}>
                  <h4>Customer Billing</h4>
                  <p>Manage customers and track outstanding invoices</p>
                </div>
                <div className="feature-card" onClick={() => handleFeatureClick('livemap')}>
                  <h4>Driver Live Map</h4>
                  <p>See real-time driver locations</p>
                </div>
                <div className="feature-card" onClick={() => handleFeatureClick('equipment')}>
                  <h4>Equipment Logs</h4>
                  <p>Track equipment usage and maintenance</p>
                </div>
              </div>
              
              {/* Compliance Section */}
              <h3 className="section-title">Compliance</h3>
              <div className="feature-grid">
                <div className="feature-card" onClick={() => handleFeatureClick('inspections')}>
                  <h4>Daily Inspections</h4>
                  <p>Vehicle safety checks</p>
                </div>
                <div className="feature-card" onClick={() => handleFeatureClick('handbook')}>
                  <h4>Handbook</h4>
                  <p>Safety protocols & procedures</p>
                </div>
                <div className="feature-card" onClick={() => handleFeatureClick('incidentreports')}>
                  <h4>Incident Reports</h4>
                  <p>Report safety incidents</p>
                </div>
                <div className="feature-card" onClick={() => handleFeatureClick('inventory')}>
                  <h4>Tow Truck Inventory</h4>
                  <p>Manage tow trucks & equipment</p>
                </div>
                <div className="feature-card" onClick={() => handleFeatureClick('privateproperty')}>
                  <h4>Private Property</h4>
                  <p>Private property towing forms</p>
                </div>
                <div className="feature-card" onClick={() => handleFeatureClick('damagerelease')}>
                  <h4>Damage Release</h4>
                  <p>Manage damage release forms</p>
                </div>
                <div className="feature-card" onClick={() => handleFeatureClick('legaldocs')}>
                  <h4>Legal Documents</h4>
                  <p>Store and manage important documents</p>
                </div>
              </div>
              
              {/* Training Section */}
              <h3 className="section-title">Training</h3>
              <div className="feature-grid">
                <div className="feature-card" onClick={() => handleFeatureClick('traininglogs')}>
                  <h4>Training Logs</h4>
                  <p>Track employee training</p>
                </div>
                <div className="feature-card" onClick={() => handleFeatureClick('drivercompliance')}>
                  <h4>Driver Compliance</h4>
                  <p>Insurance/legal compliance</p>
                </div>
                <div className="feature-card" onClick={() => handleFeatureClick('licensevault')}>
                  <h4>License Vault</h4>
                  <p>Manage licenses & cards</p>
                </div>
                <div className="feature-card" onClick={() => handleFeatureClick('certifications')}>
                  <h4>Certification Management</h4>
                  <p>Track required certifications</p>
                </div>
              </div>
              
              {/* Finance Section */}
              <h3 className="section-title">Finance</h3>
              <div className="feature-grid">
                <div className="feature-card" onClick={() => handleFeatureClick('driverpayroll')}>
                  <h4>Driver Payroll Log</h4>
                  <p>Track driver payment information</p>
                </div>
                <div className="feature-card" onClick={() => handleFeatureClick('payments')}>
                  <h4>Customer Payment Portal</h4>
                  <p>Process payments</p>
                </div>
                <div className="feature-card" onClick={() => handleFeatureClick('mileage')}>
                  <h4>Mileage & Fuel Log</h4>
                  <p>Track vehicle mileage & fuel</p>
                </div>
                <div className="feature-card" onClick={() => handleFeatureClick('ccauth')}>
                  <h4>Credit Card Authorization</h4>
                  <p>Manage credit card authorization forms</p>
                </div>
              </div>
              
              {/* Communication Section */}
              <h3 className="section-title">Communication</h3>
              <div className="feature-grid">
                <div className="feature-card" onClick={() => handleFeatureClick('notifications')}>
                  <h4>Notifications</h4>
                  <p>Important alerts/SMS alerts</p>
                </div>
                <div className="feature-card" onClick={() => handleFeatureClick('feedback')}>
                  <h4>Customer Feedback</h4>
                  <p>Review customer ratings</p>
                </div>
              </div>
              
              {/* Admin Tools Section */}
              <h3 className="section-title">Admin Tools</h3>
              <div className="feature-grid">
                <div className="feature-card" onClick={() => handleFeatureClick('reports')}>
                  <h4>Reports & Analytics</h4>
                  <p>Generate business reports</p>
                </div>
                <div className="feature-card" onClick={() => handleFeatureClick('submissions')}>
                  <h4>View All Submissions</h4>
                  <p>Review all form submissions</p>
                </div>
                <div className="feature-card" onClick={() => handleFeatureClick('library')}>
                  <h4>Resource Library</h4>
                  <p>Access shared resources</p>
                </div>
                <div className="feature-card" onClick={() => handleFeatureClick('companymanagement')}>
                  <h4>Company Management</h4>
                  <p>Manage company settings</p>
                </div>
                <div className="feature-card" onClick={() => handleFeatureClick('statepapers')}>
                  <h4>State Papers</h4>
                  <p>Access state forms and requirements</p>
                </div>
              </div>
            </main>
          ) : (
            <div className="feature-content">
              <button 
                className="back-button" 
                onClick={handleBackToDashboard}
              >
                Back to Dashboard
              </button>
              <h2>{getFeatureTitle(selectedFeature)}</h2>
              
              {selectedFeature === 'handbook' ? (
                <div className="handbook-content">
                  <h3>Safety Protocols & Procedures</h3>
                  <div className="handbook-section">
                    <h4>General Safety</h4>
                    <ul>
                      <li>Always wear appropriate safety gear including high-visibility vests</li>
                      <li>Inspect all equipment before use</li>
                      <li>Follow proper lifting techniques to prevent injury</li>
                      <li>Be aware of surroundings at all times</li>
                    </ul>
                  </div>
                  <div className="handbook-section">
                    <h4>Vehicle Operation</h4>
                    <ul>
                      <li>Complete pre-trip inspection before each shift</li>
                      <li>Observe all traffic laws and regulations</li>
                      <li>Maintain safe following distance</li>
                      <li>Use proper signaling when changing lanes</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="feature-placeholder">
                  <p>This {selectedFeature} feature is under development.</p>
                  <p>Coming soon!</p>
                </div>
              )}
            </div>
          )}
          
          <footer>
            <div className="footer-content">
              <p>© 2025 Texas Towing Ops & Handbook</p>
              <div className="social-icons">
                <span className="social-icon">FB</span>
                <span className="social-icon">IG</span>
                <span className="social-icon">TW</span>
                <span className="social-icon">LI</span>
              </div>
            </div>
          </footer>
        </div>
      )}
    </div>
  );
}

export default App;
