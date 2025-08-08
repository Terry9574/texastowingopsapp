import React from 'react';
import { createPageUrl } from '../utils/urlUtils'; // Assuming base44 has this utility

function Home() {
  return (
    <div className="dashboard-container">
      <div className="welcome-section">
        <h1>Welcome to Texas Towing Ops</h1>
        <p>Your complete towing operations management system</p>
      </div>
      
      <div className="quick-stats">
        <div className="stat-card">
          <h3>Today's Tows</h3>
          <p className="stat-number">24</p>
        </div>
        <div className="stat-card">
          <h3>Active Drivers</h3>
          <p className="stat-number">8</p>
        </div>
        <div className="stat-card">
          <h3>Pending Jobs</h3>
          <p className="stat-number">3</p>
        </div>
      </div>
      
      <div className="feature-tiles">
        <a href={createPageUrl('Handbook')} className="feature-tile">
          <div className="tile-icon">📖</div>
          <h3>Handbook</h3>
          <p>Safety procedures and company policies</p>
        </a>
        
        <a href={createPageUrl('Jobs')} className="feature-tile">
          <div className="tile-icon">🚚</div>
          <h3>Jobs</h3>
          <p>Manage towing jobs and assignments</p>
        </a>
        
        <a href={createPageUrl('Drivers')} className="feature-tile">
          <div className="tile-icon">👤</div>
          <h3>Drivers</h3>
          <p>Driver management and scheduling</p>
        </a>
        
        <a href={createPageUrl('Reports')} className="feature-tile">
          <div className="tile-icon">📊</div>
          <h3>Reports</h3>
          <p>Analytics and business reporting</p>
        </a>
      </div>
    </div>
  );
}

export default Home;
