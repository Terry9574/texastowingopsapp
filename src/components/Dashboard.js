import React from 'react';

function Dashboard({ userRole }) {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Texas Towing Ops</h1>
        <p className="dashboard-subtitle">Professional Handbook & Operations Management</p>
        <p>App Version 2.0.0</p>
        <p>Consulting Advisors Of Texas</p>
        <p>Administrator</p>
      </div>
      
      {(userRole === 'admin' || userRole === 'global_admin') && (
        <div className="admin-badge">
          <span className="admin-message">admin_access</span>
          <span className="admin-description">full access message</span>
        </div>
      )}
      
      {/* Operations Section */}
      <h2 className="section-title">Operations</h2>
      <div className="feature-grid">
        <div className="feature-card">
          <div className="feature-icon">📡</div>
          <h3 className="feature-title">Dispatch System</h3>
          <p className="feature-description">Task info & assignments</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📞</div>
          <h3 className="feature-title">Driver Calls</h3>
          <p className="feature-description">Service records & completion</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🏢</div>
          <h3 className="feature-title">Impound Facility</h3>
          <p className="feature-description">Manage vehicles in the impound facility</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">💲</div>
          <h3 className="feature-title">Customer Billing</h3>
          <p className="feature-description">Manage customers and track outstanding invoices</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🗺️</div>
          <h3 className="feature-title">Driver Live Map</h3>
          <p className="feature-description">See real-time driver locations</p>
        </div>
      </div>
      
      {/* Compliance Section */}
      <h2 className="section-title">Compliance</h2>
      <div className="feature-grid">
        <div className="feature-card">
          <div className="feature-icon">📋</div>
          <h3 className="feature-title">Daily Inspections</h3>
          <p className="feature-description">Vehicle safety checks</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📚</div>
          <h3 className="feature-title">Handbook</h3>
          <p className="feature-description">Safety protocols & procedures</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">⚠️</div>
          <h3 className="feature-title">Incident Reports</h3>
          <p className="feature-description">Report safety incidents</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🚚</div>
          <h3 className="feature-title">Tow Truck Inventory</h3>
          <p className="feature-description">Manage tow trucks & equipment</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📄</div>
          <h3 className="feature-title">Private Property Form</h3>
          <p className="feature-description">Authorize tows on private property</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📝</div>
          <h3 className="feature-title">Damage Release</h3>
          <p className="feature-description">Vehicle condition forms</p>
        </div>
      </div>
      
      {/* Training Section */}
      <h2 className="section-title">Training</h2>
      <div className="feature-grid">
        <div className="feature-card">
          <div className="feature-icon">📋</div>
          <h3 className="feature-title">Training Logs</h3>
          <p className="feature-description">Track employee training</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">✅</div>
          <h3 className="feature-title">Driver Compliance</h3>
          <p className="feature-description">Insurance/legal compliance</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🪪</div>
          <h3 className="feature-title">License Vault</h3>
          <p className="feature-description">Manage licenses & cards</p>
        </div>
      </div>
      
      {/* Finance Section */}
      <h2 className="section-title">Finance</h2>
      <div className="feature-grid">
        <div className="feature-card">
          <div className="feature-icon">💰</div>
          <h3 className="feature-title">Driver Payroll Log</h3>
          <p className="feature-description">Track driver payment information</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">💳</div>
          <h3 className="feature-title">Customer Payment Portal</h3>
          <p className="feature-description">Process payments</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">💳</div>
          <h3 className="feature-title">Credit Card Auth</h3>
          <p className="feature-description">Payment authorization forms</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">⛽</div>
          <h3 className="feature-title">Mileage & Fuel Log</h3>
          <p className="feature-description">Track vehicle mileage & fuel</p>
        </div>
      </div>
      
      {/* Communication Section */}
      <h2 className="section-title">Communication</h2>
      <div className="feature-grid">
        <div className="feature-card">
          <div className="feature-icon">🔔</div>
          <h3 className="feature-title">Notifications</h3>
          <p className="feature-description">Important alerts/SMS alerts</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">⭐</div>
          <h3 className="feature-title">Customer Feedback</h3>
          <p className="feature-description">Review customer ratings</p>
        </div>
      </div>
      
      <h2 className="section-title">Get More from Your App</h2>
      
      <div className="text-center" style={{marginTop: '30px'}}>
        <button className="submit-btn">
          Share This App
        </button>
      </div>
      
      <div className="text-center" style={{marginTop: '50px', color: '#666', fontSize: '14px'}}>
        © 2025 Texas Towing Ops & Handbook v2.0.0
      </div>
    </div>
  );
}

export default Dashboard;
