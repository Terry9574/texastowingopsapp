import React from 'react';

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="welcome-banner">
        <h1>Welcome to Texas Towing Ops & Handbook</h1>
        <p>Your complete platform for managing towing operations in compliance with Texas regulations.</p>
      </div>
      
      <div className="card-grid">
        <div className="card">
          <h3>Safety Guidelines</h3>
          <p>Access comprehensive safety protocols for towing operations in Texas.</p>
        </div>
        
        <div className="card">
          <h3>Training Logs</h3>
          <p>Record and track employee training sessions and certifications.</p>
        </div>
        
        <div className="card">
          <h3>Incident Reporting</h3>
          <p>Document accidents, near-misses, and safety incidents.</p>
        </div>
        
        <div className="card">
          <h3>License Management</h3>
          <p>Track licenses, permits, and important renewal dates.</p>
        </div>
        
        <div className="card">
          <h3>Quick References</h3>
          <p>Access quick guides and important information for towing operations.</p>
        </div>
        
        <div className="card">
          <h3>Compliance Checklist</h3>
          <p>Ensure your operations meet all Texas regulatory requirements.</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
