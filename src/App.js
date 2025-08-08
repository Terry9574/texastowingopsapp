import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import './App.css';
import './features.css';

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
  
  // Feature content rendering function
  const renderFeatureContent = () => {
    switch(selectedFeature) {
      // Operations Section
      case 'dispatch':
        return (
          <div className="feature-detail">
            <h3>Dispatch System</h3>
            <div className="dispatch-dashboard">
              <div className="dispatch-controls">
                <div className="control-group">
                  <h4>Create New Dispatch</h4>
                  <button className="primary-button">New Dispatch</button>
                </div>
                <div className="control-group">
                  <h4>Filter By</h4>
                  <select className="filter-select">
                    <option>All Dispatches</option>
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </select>
                </div>
              </div>
              <div className="dispatch-table">
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Customer</th>
                      <th>Location</th>
                      <th>Service Type</th>
                      <th>Driver</th>
                      <th>Status</th>
                      <th>Created At</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>D-1001</td>
                      <td>John Smith</td>
                      <td>123 Main St, Austin, TX</td>
                      <td>Vehicle Recovery</td>
                      <td>Mike Johnson</td>
                      <td className="status-pending">Pending</td>
                      <td>08/07/2025 09:45 AM</td>
                      <td><button className="action-button">Assign</button></td>
                    </tr>
                    <tr>
                      <td>D-1002</td>
                      <td>Sarah Davis</td>
                      <td>456 Oak Dr, Dallas, TX</td>
                      <td>Flatbed Tow</td>
                      <td>Carlos Martinez</td>
                      <td className="status-inprogress">In Progress</td>
                      <td>08/07/2025 10:15 AM</td>
                      <td><button className="action-button">Track</button></td>
                    </tr>
                    <tr>
                      <td>D-1003</td>
                      <td>Michael Wilson</td>
                      <td>789 Pine Ave, Houston, TX</td>
                      <td>Roadside Assistance</td>
                      <td>Robert Lee</td>
                      <td className="status-completed">Completed</td>
                      <td>08/07/2025 11:30 AM</td>
                      <td><button className="action-button">View</button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      
      case 'drivercalls':
        return (
          <div className="feature-detail">
            <h3>Driver Calls</h3>
            <div className="calls-container">
              <div className="calls-header">
                <div className="call-filters">
                  <button className="filter-button active">All Calls</button>
                  <button className="filter-button">Pending</button>
                  <button className="filter-button">Completed</button>
                </div>
                <div className="search-box">
                  <input type="text" placeholder="Search by customer or location" />
                  <button>Search</button>
                </div>
              </div>
              <div className="calls-list">
                <div className="call-card">
                  <div className="call-header">
                    <span className="call-id">Call #78923</span>
                    <span className="call-status pending">Pending</span>
                  </div>
                  <div className="call-details">
                    <p><strong>Customer:</strong> David Wilson</p>
                    <p><strong>Phone:</strong> (512) 555-2345</p>
                    <p><strong>Location:</strong> 342 Broadway St, Austin TX</p>
                    <p><strong>Service Requested:</strong> Vehicle Recovery</p>
                    <p><strong>Vehicle:</strong> 2019 Ford F-150, Red</p>
                    <p><strong>Notes:</strong> Customer reports vehicle is in a ditch off the road.</p>
                  </div>
                  <div className="call-actions">
                    <button className="action-button">Accept Call</button>
                    <button className="action-button secondary">Call Customer</button>
                  </div>
                </div>
                
                <div className="call-card">
                  <div className="call-header">
                    <span className="call-id">Call #78922</span>
                    <span className="call-status inprogress">In Progress</span>
                  </div>
                  <div className="call-details">
                    <p><strong>Customer:</strong> Maria Garcia</p>
                    <p><strong>Phone:</strong> (512) 555-8765</p>
                    <p><strong>Location:</strong> 128 Riverside Dr, Austin TX</p>
                    <p><strong>Service Requested:</strong> Flatbed Tow</p>
                    <p><strong>Vehicle:</strong> 2020 Honda Civic, Blue</p>
                    <p><strong>Notes:</strong> Vehicle has transmission issues and needs to be towed to customer's mechanic.</p>
                  </div>
                  <div className="call-actions">
                    <button className="action-button">Update Status</button>
                    <button className="action-button secondary">Navigate</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'impound':
        return (
          <div className="feature-detail">
            <h3>Impound Facility</h3>
            <div className="impound-dashboard">
              <div className="impound-stats">
                <div className="stat-box">
                  <h4>Current Capacity</h4>
                  <div className="capacity-meter">
                    <div className="capacity-fill" style={{width: '65%'}}>65%</div>
                  </div>
                  <p>78 vehicles of 120 capacity</p>
                </div>
                <div className="stat-box">
                  <h4>Vehicles Pending Release</h4>
                  <div className="stat-number">12</div>
                </div>
                <div className="stat-box">
                  <h4>Average Stay Duration</h4>
                  <div className="stat-number">7.3 <span>days</span></div>
                </div>
              </div>
              
              <div className="impound-actions">
                <button className="primary-button">Add New Vehicle</button>
                <button>Process Release</button>
                <button>Generate Report</button>
              </div>
              
              <div className="impound-table">
                <table>
                  <thead>
                    <tr>
                      <th>Lot #</th>
                      <th>Vehicle Info</th>
                      <th>License #</th>
                      <th>Date Impounded</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>A12</td>
                      <td>2018 Toyota Camry, White</td>
                      <td>TX-ABC1234</td>
                      <td>08/01/2025</td>
                      <td>Held</td>
                      <td>
                        <button className="action-button">Details</button>
                        <button className="action-button">Release</button>
                      </td>
                    </tr>
                    <tr>
                      <td>B07</td>
                      <td>2015 Chevrolet Malibu, Black</td>
                      <td>TX-XYZ7890</td>
                      <td>08/03/2025</td>
                      <td>Pending Release</td>
                      <td>
                        <button className="action-button">Details</button>
                        <button className="action-button">Process</button>
                      </td>
                    </tr>
                    <tr>
                      <td>C15</td>
                      <td>2020 Honda Accord, Silver</td>
                      <td>TX-DEF4567</td>
                      <td>08/05/2025</td>
                      <td>New Arrival</td>
                      <td>
                        <button className="action-button">Details</button>
                        <button className="action-button">Update</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
        
      case 'billing':
        return (
          <div className="feature-detail">
            <h3>Customer Billing</h3>
            <div className="billing-dashboard">
              <div className="billing-summary">
                <div className="summary-box">
                  <h4>Total Outstanding</h4>
                  <div className="amount">$14,375.00</div>
                </div>
                <div className="summary-box">
                  <h4>Invoices Pending</h4>
                  <div className="count">23</div>
                </div>
                <div className="summary-box">
                  <h4>Overdue Invoices</h4>
                  <div className="count warning">8</div>
                </div>
              </div>
              
              <div className="billing-actions">
                <button className="primary-button">Create New Invoice</button>
                <button>Send Payment Reminders</button>
                <button>Export Reports</button>
              </div>
              
              <div className="billing-table">
                <h4>Recent Invoices</h4>
                <table>
                  <thead>
                    <tr>
                      <th>Invoice #</th>
                      <th>Customer</th>
                      <th>Service Date</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Due Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>INV-2025-087</td>
                      <td>Robert Johnson</td>
                      <td>08/01/2025</td>
                      <td>$245.00</td>
                      <td className="status-pending">Unpaid</td>
                      <td>08/15/2025</td>
                      <td>
                        <button className="action-button">View</button>
                        <button className="action-button">Send Reminder</button>
                      </td>
                    </tr>
                    <tr>
                      <td>INV-2025-086</td>
                      <td>Lisa Williams</td>
                      <td>07/29/2025</td>
                      <td>$180.00</td>
                      <td className="status-completed">Paid</td>
                      <td>08/12/2025</td>
                      <td>
                        <button className="action-button">View</button>
                        <button className="action-button">Receipt</button>
                      </td>
                    </tr>
                    <tr>
                      <td>INV-2025-085</td>
                      <td>Michael Davis</td>
                      <td>07/25/2025</td>
                      <td>$375.00</td>
                      <td className="status-warning">Overdue</td>
                      <td>08/08/2025</td>
                      <td>
                        <button className="action-button">View</button>
                        <button className="action-button">Contact</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
        
      case 'livemap':
        return (
          <div className="feature-detail">
            <h3>Driver Live Map</h3>
            <div className="livemap-container">
              <div className="map-sidebar">
                <div className="map-filters">
                  <h4>Filters</h4>
                  <div className="filter-group">
                    <label>
                      <input type="checkbox" checked readOnly />
                      <span>Active Drivers</span>
                    </label>
                  </div>
                  <div className="filter-group">
                    <label>
                      <input type="checkbox" checked readOnly />
                      <span>Pending Calls</span>
                    </label>
                  </div>
                  <div className="filter-group">
                    <label>
                      <input type="checkbox" />
                      <span>Completed Calls</span>
                    </label>
                  </div>
                </div>
                
                <div className="driver-list">
                  <h4>Available Drivers</h4>
                  <div className="driver-item active">
                    <div className="driver-status"></div>
                    <div className="driver-info">
                      <strong>Carlos Martinez</strong>
                      <span>Flatbed #3</span>
                    </div>
                    <div className="driver-actions">
                      <button className="small-button">Contact</button>
                      <button className="small-button">Assign</button>
                    </div>
                  </div>
                  
                  <div className="driver-item active">
                    <div className="driver-status"></div>
                    <div className="driver-info">
                      <strong>James Wilson</strong>
                      <span>Wrecker #2</span>
                    </div>
                    <div className="driver-actions">
                      <button className="small-button">Contact</button>
                      <button className="small-button">Assign</button>
                    </div>
                  </div>
                  
                  <div className="driver-item busy">
                    <div className="driver-status"></div>
                    <div className="driver-info">
                      <strong>Robert Lee</strong>
                      <span>Flatbed #1</span>
                      <span className="busy-note">On call #78922</span>
                    </div>
                    <div className="driver-actions">
                      <button className="small-button">Contact</button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="map-display">
                <div className="map-placeholder">
                  <p>Interactive map showing driver locations would display here</p>
                  <div className="map-legend">
                    <div className="legend-item">
                      <span className="legend-dot available"></span>
                      <span>Available Driver</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-dot busy"></span>
                      <span>Busy Driver</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-dot pending"></span>
                      <span>Pending Call</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'equipment':
        return (
          <div className="feature-detail">
            <h3>Equipment Logs</h3>
            <div className="equipment-dashboard">
              <div className="equipment-actions">
                <button className="primary-button">Add Equipment Log</button>
                <button>Equipment Maintenance</button>
                <button>View Reports</button>
              </div>
              
              <div className="equipment-categories">
                <h4>Equipment Categories</h4>
                <div className="category-grid">
                  <div className="category-card">
                    <div className="category-icon">🔧</div>
                    <h5>Towing Equipment</h5>
                    <span>24 items</span>
                  </div>
                  <div className="category-card">
                    <div className="category-icon">🚚</div>
                    <h5>Vehicle Accessories</h5>
                    <span>18 items</span>
                  </div>
                  <div className="category-card">
                    <div className="category-icon">🔌</div>
                    <h5>Electronic Devices</h5>
                    <span>12 items</span>
                  </div>
                  <div className="category-card">
                    <div className="category-icon">⚠️</div>
                    <h5>Safety Equipment</h5>
                    <span>35 items</span>
                  </div>
                </div>
              </div>
              
              <div className="equipment-table">
                <h4>Recent Equipment Logs</h4>
                <table>
                  <thead>
                    <tr>
                      <th>Log ID</th>
                      <th>Equipment</th>
                      <th>Driver</th>
                      <th>Check Out</th>
                      <th>Check In</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>EQ-2025-045</td>
                      <td>Heavy Duty Winch</td>
                      <td>Carlos Martinez</td>
                      <td>08/07/2025 08:15 AM</td>
                      <td>—</td>
                      <td className="status-inprogress">In Use</td>
                      <td><button className="action-button">Check In</button></td>
                    </tr>
                    <tr>
                      <td>EQ-2025-044</td>
                      <td>Traffic Cones (Set of 5)</td>
                      <td>James Wilson</td>
                      <td>08/07/2025 07:30 AM</td>
                      <td>—</td>
                      <td className="status-inprogress">In Use</td>
                      <td><button className="action-button">Check In</button></td>
                    </tr>
                    <tr>
                      <td>EQ-2025-043</td>
                      <td>Vehicle Dolly</td>
                      <td>Robert Lee</td>
                      <td>08/06/2025 09:45 AM</td>
                      <td>08/06/2025 06:20 PM</td>
                      <td className="status-completed">Returned</td>
                      <td><button className="action-button">View Details</button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      // Compliance Section  
      case 'inspections':
        return (
          <div className="feature-detail">
            <h3>Daily Inspections</h3>
            <div className="inspection-dashboard">
              <div className="inspection-summary">
                <div className="summary-box">
                  <h4>Today's Inspections</h4>
                  <div className="count">7 / 12</div>
                  <div className="progress-bar">
                    <div className="progress" style={{width: '58%'}}></div>
                  </div>
                </div>
                <div className="summary-box">
                  <h4>Issues Identified</h4>
                  <div className="count warning">3</div>
                </div>
                <div className="summary-box">
                  <h4>Compliance Rate</h4>
                  <div className="rate">92%</div>
                </div>
              </div>
              
              <div className="inspection-actions">
                <button className="primary-button">New Inspection</button>
                <button>View Issue Reports</button>
                <button>Inspection History</button>
              </div>
              
              <div className="vehicle-grid">
                <h4>Vehicle Inspection Status</h4>
                <div className="vehicle-cards">
                  <div className="vehicle-card inspected">
                    <div className="vehicle-status">Inspected</div>
                    <h5>Flatbed #1</h5>
                    <p>Last inspection: Today, 6:45 AM</p>
                    <p>Inspector: Robert Lee</p>
                    <p>Status: <span className="status-ok">No Issues</span></p>
                    <button className="vehicle-button">View Details</button>
                  </div>
                  
                  <div className="vehicle-card inspected">
                    <div className="vehicle-status">Inspected</div>
                    <h5>Wrecker #3</h5>
                    <p>Last inspection: Today, 7:15 AM</p>
                    <p>Inspector: Carlos Martinez</p>
                    <p>Status: <span className="status-warning">Minor Issues</span></p>
                    <button className="vehicle-button">View Details</button>
                  </div>
                  
                  <div className="vehicle-card">
                    <div className="vehicle-status">Not Inspected</div>
                    <h5>Flatbed #2</h5>
                    <p>Last inspection: Yesterday, 7:30 AM</p>
                    <p>Assigned to: James Wilson</p>
                    <button className="vehicle-button primary">Start Inspection</button>
                  </div>
                  
                  <div className="vehicle-card">
                    <div className="vehicle-status">Not Inspected</div>
                    <h5>Wrecker #1</h5>
                    <p>Last inspection: Yesterday, 6:15 AM</p>
                    <p>Assigned to: Mike Johnson</p>
                    <button className="vehicle-button primary">Start Inspection</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'handbook':
        return (
          <div className="handbook-content">
            <h3>Safety Protocols & Procedures</h3>
            
            <div className="handbook-section">
              <h4>General Safety</h4>
              <ul>
                <li>Always wear appropriate safety gear including high-visibility vests, steel-toed boots, and work gloves</li>
                <li>Inspect all equipment before use, including hooks, chains, cables, and hydraulic systems</li>
                <li>Follow proper lifting techniques to prevent injury - bend at the knees, not the waist</li>
                <li>Be aware of surroundings at all times, especially in high-traffic areas</li>
                <li>Use proper lighting and warning signals when working on roadways</li>
                <li>Keep first aid kits fully stocked and accessible in all vehicles</li>
              </ul>
            </div>
            
            <div className="handbook-section">
              <h4>Vehicle Operation</h4>
              <ul>
                <li>Complete pre-trip inspection before each shift using the provided checklist</li>
                <li>Observe all traffic laws and regulations when operating company vehicles</li>
                <li>Maintain

