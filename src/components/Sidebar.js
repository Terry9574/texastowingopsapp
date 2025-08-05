import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import '../styles/Sidebar.css';

function Sidebar({ setActivePage, activePage }) {
  const [expandedSection, setExpandedSection] = useState(null);
  
  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };
  
  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };
  
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="app-logo">
          <img src="/logo.png" alt="Texas Towing Ops" />
          <span>Texas Towing Ops</span>
        </div>
      </div>
      
      <div className="sidebar-section">
        <div className="section-title">GLOBAL ADMINISTRATION</div>
        <ul>
          <li className={activePage === 'global-accounts' ? 'active' : ''} 
              onClick={() => setActivePage('global-accounts')}>
            <i className="fas fa-globe"></i>
            <span>global_accounts</span>
          </li>
        </ul>
      </div>
      
      <div className="sidebar-section">
        <ul>
          <li className={activePage === 'dashboard' ? 'active' : ''} 
              onClick={() => setActivePage('dashboard')}>
            <i className="fas fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </li>
          <li className={activePage === 'handbook' ? 'active' : ''} 
              onClick={() => setActivePage('handbook')}>
            <i className="fas fa-book"></i>
            <span>Handbook</span>
          </li>
          <li className={activePage === 'training-logs' ? 'active' : ''} 
              onClick={() => setActivePage('training-logs')}>
            <i className="fas fa-clipboard-list"></i>
            <span>Training Logs</span>
          </li>
          <li className={activePage === 'daily-inspections' ? 'active' : ''} 
              onClick={() => setActivePage('daily-inspections')}>
            <i className="fas fa-clipboard-check"></i>
            <span>Daily Inspections</span>
          </li>
          <li className={activePage === 'incident-reports' ? 'active' : ''} 
              onClick={() => setActivePage('incident-reports')}>
            <i className="fas fa-exclamation-triangle"></i>
            <span>Incident Reports</span>
          </li>
          <li className={activePage === 'license-vault' ? 'active' : ''} 
              onClick={() => setActivePage('license-vault')}>
            <i className="fas fa-id-card"></i>
            <span>License Vault</span>
          </li>
          <li className={activePage === 'violation-tracker' ? 'active' : ''} 
              onClick={() => setActivePage('violation-tracker')}>
            <i className="fas fa-exclamation-circle"></i>
            <span>Violation Tracker</span>
          </li>
          <li className={activePage === 'tow-truck-inventory' ? 'active' : ''} 
              onClick={() => setActivePage('tow-truck-inventory')}>
            <i className="fas fa-truck"></i>
            <span>Tow Truck Inventory</span>
          </li>
          <li className={activePage === 'resource-library' ? 'active' : ''} 
              onClick={() => setActivePage('resource-library')}>
            <i className="fas fa-book-open"></i>
            <span>Resource Library</span>
          </li>
        </ul>
      </div>
      
      <div className="sidebar-section">
        <div className="section-title">OPERATIONS</div>
        <ul>
          <li className={activePage === 'driver-calls' ? 'active' : ''} 
              onClick={() => setActivePage('driver-calls')}>
            <i className="fas fa-phone"></i>
            <span>Driver Calls</span>
          </li>
          <li className={activePage === 'dispatch-system' ? 'active' : ''} 
              onClick={() => setActivePage('dispatch-system')}>
            <i className="fas fa-satellite-dish"></i>
            <span>Dispatch System</span>
          </li>
          <li className={activePage === 'impound-facility' ? 'active' : ''} 
              onClick={() => setActivePage('impound-facility')}>
            <i className="fas fa-warehouse"></i>
            <span>Impound Facility</span>
          </li>
          <li className={activePage === 'customer-billing' ? 'active' : ''} 
              onClick={() => setActivePage('customer-billing')}>
            <i className="fas fa-file-invoice-dollar"></i>
            <span>Customer Billing</span>
          </li>
          <li className={activePage === 'mileage-fuel-log' ? 'active' : ''} 
              onClick={() => setActivePage('mileage-fuel-log')}>
            <i className="fas fa-gas-pump"></i>
            <span>Mileage & Fuel Log</span>
          </li>
        </ul>
      </div>
      
      <div className="sidebar-section">
        <div className="section-title">FINANCE</div>
        <ul>
          <li className={activePage === 'driver-payroll' ? 'active' : ''} 
              onClick={() => setActivePage('driver-payroll')}>
            <i className="fas fa-money-check-alt"></i>
            <span>Driver Payroll Log</span>
          </li>
          <li className={activePage === 'billing' ? 'active' : ''} 
              onClick={() => setActivePage('billing')}>
            <i className="fas fa-file-invoice"></i>
            <span>Billing</span>
          </li>
        </ul>
      </div>
      
      <div className="sidebar-section">
        <div className="section-title">COMPANY</div>
        <ul>
          <li className={activePage === 'company-management' ? 'active' : ''} 
              onClick={() => setActivePage('company-management')}>
            <i className="fas fa-building"></i>
            <span>Company Management</span>
          </li>
          <li className={activePage === 'state-papers' ? 'active' : ''} 
              onClick={() => setActivePage('state-papers')}>
            <i className="fas fa-file-alt"></i>
            <span>State Papers</span>
          </li>
          <li className={activePage === 'driver-scorecard' ? 'active' : ''} 
              onClick={() => setActivePage('driver-scorecard')}>
            <i className="fas fa-chart-line"></i>
            <span>driver_scorecard</span>
          </li>
        </ul>
      </div>
      
      <div className="sidebar-section">
        <div className="section-title">FEEDBACK</div>
        <ul>
          <li className={activePage === 'submit-feedback' ? 'active' : ''} 
              onClick={() => setActivePage('submit-feedback')}>
            <i className="fas fa-comment"></i>
            <span>submit_feedback</span>
          </li>
        </ul>
      </div>
      
      <div className="sidebar-footer">
        <div className="user-info">
          <img src="/admin-avatar.png" alt="Admin" />
          <div>
            <div>Consulting Advisors</div>
            <div className="user-role">Administrator</div>
          </div>
        </div>
        <button onClick={handleSignOut} className="sign-out-btn">
          <i className="fas fa-sign-out-alt"></i>
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
