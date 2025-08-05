import React from 'react';

function Dashboard({ userRole }) {
  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Texas Towing Ops</h1>
          <p>Professional Handbook & Operations Management</p>
          <div className="app-subtitle">App Version 2.0.0</div>
        </div>
        <div className="user-info-header">
          <div className="user-role-badge">Consulting Advisors Of Texas</div>
          <div>Administrator</div>
        </div>
      </div>
      
      {(userRole === 'admin' || userRole === 'global_admin') && (
        <div className="admin-badge">
          <i className="fas fa-key"></i>
          <div className="admin-message">admin_access</div>
          <div className="admin-description">full access message</div>
        </div>
      )}
      
      {/* Operations Section */}
      <div className="section-title">
        <i className="fas fa-cog"></i>
        <h2>Operations</h2>
      </div>
      <div className="card-grid">
        <div className="feature-card">
          <div className="icon-circle operations-icon">
            <i className="fas fa-satellite-dish"></i>
          </div>
          <h3>Dispatch System</h3>
          <p>Task info & assignments</p>
        </div>
        <div className="feature-card">
          <div className="icon-circle operations-icon">
            <i className="fas fa-phone-alt"></i>
          </div>
          <h3>Driver Calls</h3>
          <p>Service records & completion</p>
        </div>
        <div className="feature-card">
          <div className="icon-circle operations-icon">
            <i className="fas fa-warehouse"></i>
          </div>
          <h3>Impound Facility</h3>
          <p>Manage vehicles in the impound facility</p>
        </div>
        <div className="feature-card">
          <div className="icon-circle operations-icon">
            <i className="fas fa-dollar-sign"></i>
          </div>
          <h3>Customer Billing</h3>
          <p>Manage customers and track outstanding invoices</p>
        </div>
        <div className="feature-card">
          <div className="icon-circle operations-icon">
            <i className="fas fa-map-marked-alt"></i>
          </div>
          <h3>Driver Live Map</h3>
          <p>See real-time driver locations</p>
        </div>
      </div>
      
      {/* Compliance Section */}
      <div className="section-title">
        <i className="fas fa-clipboard-check"></i>
        <h2>Compliance</h2>
      </div>
      <div className="card-grid">
        <div className="feature-card">
          <div className="icon-circle compliance-icon">
            <i className="fas fa-clipboard-list"></i>
          </div>
          <h3>Daily Inspections</h3>
          <p>Vehicle safety checks</p>
        </div>
        <div className="feature-card">
          <div className="icon-circle compliance-icon">
            <i className="fas fa-book"></i>
          </div>
          <h3>Handbook</h3>
          <p>Safety protocols & procedures</p>
        </div>
        <div className="feature-card">
          <div className="icon-circle compliance-icon">
            <i className="fas fa-exclamation-triangle"></i>
          </div>
          <h3>Incident Reports</h3>
          <p>Report safety incidents</p>
        </div>
        <div className="feature-card">
          <div className="icon-circle compliance-icon">
            <i className="fas fa-truck"></i>
          </div>
          <h3>Tow Truck Inventory</h3>
          <p>Manage tow trucks & equipment</p>
        </div>
        <div className="feature-card">
          <div className="icon-circle compliance-icon">
            <i className="fas fa-file-contract"></i>
          </div>
          <h3>Private Property Form</h3>
          <p>Authorize tows on private property</p>
        </div>
        <div className="feature-card">
          <div className="icon-circle compliance-icon">
            <i className="fas fa-file-signature"></i>
          </div>
          <h3>Damage Release</h3>
          <p>Vehicle condition forms</p>
        </div>
      </div>
      
      {/* Training Section */}
      <div className="section-title">
        <i className="fas fa-graduation-cap"></i>
        <h2>Training</h2>
      </div>
      <div className="card-grid">
        <div className="feature-card">
          <div className="icon-circle training-icon">
            <i className="fas fa-clipboard"></i>
          </div>
          <h3>Training Logs</h3>
          <p>Track employee training</p>
        </div>
        <div className="feature-card">
          <div className="icon-circle training-icon">
            <i className="fas fa-user-check"></i>
          </div>
          <h3>Driver Compliance</h3>
          <p>Insurance/legal compliance</p>
        </div>
        <div className="feature-card">
          <div className="icon-circle training-icon">
            <i className="fas fa-id-card"></i>
          </div>
          <h3>License Vault</h3>
          <p>Manage licenses & cards</p>
        </div>
      </div>
      
      {/* Finance Section */}
      <div className="section-title">
        <i className="fas fa-money-bill-wave"></i>
        <h2>Finance</h2>
      </div>
      <div className="card-grid">
        <div className="feature-card">
          <div className="icon-circle finance-icon">
            <i className="fas fa-money-check-alt"></i>
          </div>
          <h3>Driver Payroll Log</h3>
          <p>Track driver payment information</p>
        </div>
        <div className="feature-card">
          <div className="icon-circle finance-icon">
            <i className="fas fa-credit-card"></i>
          </div>
          <h3>Customer Payment Portal</h3>
          <p>Process payments & payments</p>
        </div>
        <div className="feature-card">
          <div className="icon-circle finance-icon">
            <i className="fas fa-credit-card"></i>
          </div>
          <h3>Credit Card Auth</h3>
          <p>Payment authorization forms</p>
        </div>
        <div className="feature-card">
          <div className="icon-circle finance-icon">
            <i className="fas fa-gas-pump"></i>
          </div>
          <h3>Mileage & Fuel Log</h3>
          <p>Track vehicle mileage & fuel</p>
        </div>
      </div>
      
      {/* Admin Tools Section - Only visible to admins */}
      {(userRole === 'admin' || userRole === 'global_admin') && (
        <>
          <div className="section-title">
            <i className="fas fa-tools"></i>
            <h2>Admin Tools</h2>
          </div>
          <div className="card-grid">
            <div className="feature-card">
              <div className="icon-circle admin-icon">
                <i className="fas fa-chart-bar"></i>
              </div>
              <h3>Reports & Analytics</h3>
              <p>Comprehensive business analytics</p>
            </div>
            <div className="feature-card">
              <div className="icon-circle admin-icon">
                <i className="fas fa-clipboard"></i>
              </div>
              <h3>View All Submissions</h3>
              <p>Review all form submissions</p>
            </div>
            <div className="feature-card">
              <div className="icon-circle admin-icon">
                <i className="fas fa-book-open"></i>
              </div>
              <h3>Resource Library</h3>
              <p>Training materials, docs</p>
            </div>
            <div className="feature-card">
              <div className="icon-circle admin-icon">
                <i className="fas fa-building"></i>
              </div>
              <h3>Company Management</h3>
              <p>Manage company info, trucks & employees</p>
            </div>
            <div className="feature-card">
              <div className="icon-circle admin-icon">
                <i className="fas fa-file-alt"></i>
              </div>
              <h3>State Papers</h3>
              <p>Insurance, registration, inspection, docs</p>
            </div>
          </div>
        </>
      )}
      
      {/* Communication Section */}
      <div className="section-title">
        <i className="fas fa-comment-alt"></i>
        <h2>Communication</h2>
      </div>
      <div className="card-grid">
        <div className="feature-card">
          <div className="icon-circle communication-icon">
            <i className="fas fa-bell"></i>
          </div>
          <h3>Notifications</h3>
          <p>Important alerts/SMS alerts</p>
        </div>
        <div className="feature-card">
          <div className="icon-circle communication-icon">
            <i className="fas fa-star"></i>
          </div>
          <h3>Customer Feedback</h3>
          <p>Review customer ratings</p>
        </div>
      </div>
      
      <div className="section-title">
        <i className="fas fa-plus-circle"></i>
        <h2>Get More from Your App</h2>
      </div>
      
      <div className="share-button">
        <i className="fas fa-share-alt"></i>
        Share This App
      </div>
      
      <div className="app-version">
        © 2025 Texas Towing Ops & Handbook v2.0.0
      </div>
    </div>
  );
}

export default Dashboard;
