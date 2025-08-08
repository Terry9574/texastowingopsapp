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
                <li>Maintain safe following distance of at least 4 seconds in normal conditions</li>
                <li>Use proper signaling when changing lanes or making turns</li>
                <li>Reduce speed in adverse weather conditions and increase following distance</li>
                <li>Do not use mobile devices while driving unless using approved hands-free equipment</li>
                <li>Report any vehicle issues or accidents immediately to your supervisor</li>
              </ul>
            </div>
            
            <div className="handbook-section">
              <h4>Towing Procedures</h4>
              <ul>
                <li>Always use wheel straps, safety chains, and proper tie-downs</li>
                <li>Verify the towing capacity of your vehicle before hooking up</li>
                <li>Secure the steering wheel of towed vehicles when appropriate</li>
                <li>Check that all lights are functioning on towed vehicles</li>
                <li>Place wheel chocks when loading/unloading vehicles</li>
                <li>Maintain communication with dispatch before, during, and after towing operations</li>
                <li>Follow the specific procedures for different vehicle types (FWD, RWD, AWD, etc.)</li>
              </ul>
            </div>
            
            <div className="handbook-section">
              <h4>Customer Interaction</h4>
              <ul>
                <li>Always identify yourself and your company when arriving at a service call</li>
                <li>Explain the process to customers before beginning work</li>
                <li>Provide written estimates when required by state law or company policy</li>
                <li>Collect necessary documentation and signatures before towing</li>
                <li>Maintain a professional demeanor even in difficult situations</li>
                <li>Know how to de-escalate conflicts and when to contact law enforcement if needed</li>
              </ul>
            </div>
            
            <div className="handbook-section">
              <h4>Emergency Procedures</h4>
              <ul>
                <li>In case of fire, use the provided fire extinguisher if safe to do so</li>
                <li>For hydraulic fluid leaks, contain spills using the spill kits in each vehicle</li>
                <li>In case of severe injury, call 911 immediately and then notify dispatch</li>
                <li>For vehicle breakdowns, secure the area and contact dispatch for assistance</li>
                <li>Document all incidents according to company procedures</li>
                <li>In hazardous weather conditions, seek shelter and notify dispatch of delays</li>
              </ul>
            </div>
          </div>
        );
        
      case 'incidentreports':
        return (
          <div className="feature-detail">
            <h3>Incident Reports</h3>
            <div className="incident-dashboard">
              <div className="incident-summary">
                <div className="summary-box">
                  <h4>Total Incidents (2025)</h4>
                  <div className="count">17</div>
                </div>
                <div className="summary-box">
                  <h4>Open Incidents</h4>
                  <div className="count warning">3</div>
                </div>
                <div className="summary-box">
                  <h4>Resolved This Month</h4>
                  <div className="count">5</div>
                </div>
              </div>
              
              <div className="incident-actions">
                <button className="primary-button">Report New Incident</button>
                <button>Generate Safety Report</button>
              </div>
              
              <div className="incident-table">
                <h4>Recent Incidents</h4>
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Date</th>
                      <th>Type</th>
                      <th>Reporter</th>
                      <th>Location</th>
                      <th>Severity</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>IR-2025-024</td>
                      <td>08/05/2025</td>
                      <td>Property Damage</td>
                      <td>Carlos Martinez</td>
                      <td>456 Oak Dr, Dallas, TX</td>
                      <td>Minor</td>
                      <td className="status-inprogress">Under Investigation</td>
                      <td><button className="action-button">View Details</button></td>
                    </tr>
                    <tr>
                      <td>IR-2025-023</td>
                      <td>08/02/2025</td>
                      <td>Near Miss</td>
                      <td>James Wilson</td>
                      <td>I-35 Northbound Mile 283</td>
                      <td>Medium</td>
                      <td className="status-inprogress">Under Review</td>
                      <td><button className="action-button">View Details</button></td>
                    </tr>
                    <tr>
                      <td>IR-2025-022</td>
                      <td>07/28/2025</td>
                      <td>Vehicle Damage</td>
                      <td>Robert Lee</td>
                      <td>789 Pine Ave, Houston, TX</td>
                      <td>Minor</td>
                      <td className="status-completed">Resolved</td>
                      <td><button className="action-button">View Details</button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="incident-form">
                <h4>Report an Incident</h4>
                <form>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Incident Type</label>
                      <select>
                        <option>Select Type</option>
                        <option>Property Damage</option>
                        <option>Vehicle Damage</option>
                        <option>Personal Injury</option>
                        <option>Near Miss</option>
                        <option>Customer Complaint</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Date & Time</label>
                      <input type="datetime-local" />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Location</label>
                      <input type="text" placeholder="Address or GPS coordinates" />
                    </div>
                    <div className="form-group">
                      <label>Severity</label>
                      <select>
                        <option>Select Severity</option>
                        <option>Minor</option>
                        <option>Medium</option>
                        <option>Major</option>
                        <option>Critical</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label>Description</label>
                    <textarea rows="4" placeholder="Describe what happened in detail"></textarea>
                  </div>
                  
                  <div className="form-group">
                    <label>Attach Photos/Files</label>
                    <input type="file" multiple />
                  </div>
                  
                  <div className="form-actions">
                    <button type="submit" className="primary-button">Submit Report</button>
                    <button type="button">Save Draft</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        );
        
      case 'inventory':
        return (
          <div className="feature-detail">
            <h3>Tow Truck Inventory</h3>
            <div className="inventory-dashboard">
              <div className="inventory-summary">
                <div className="summary-box">
                  <h4>Total Vehicles</h4>
                  <div className="count">14</div>
                </div>
                <div className="summary-box">
                  <h4>Active Vehicles</h4>
                  <div className="count">12</div>
                </div>
                <div className="summary-box">
                  <h4>In Maintenance</h4>
                  <div className="count warning">2</div>
                </div>
              </div>
              
              <div className="inventory-actions">
                <button className="primary-button">Add Vehicle</button>
                <button>Maintenance Schedule</button>
                <button>Service History</button>
              </div>
              
              <div className="inventory-filters">
                <h4>Filter Vehicles</h4>
                <div className="filter-options">
                  <button className="filter-option active">All</button>
                  <button className="filter-option">Flatbeds</button>
                  <button className="filter-option">Wreckers</button>
                  <button className="filter-option">Service Trucks</button>
                </div>
              </div>
              
              <div className="vehicle-list">
                <div className="vehicle-detail-card">
                  <div className="vehicle-image placeholder">
                    <span>Flatbed #1</span>
                  </div>
                  <div className="vehicle-info">
                    <h4>2023 Ford F-450 Flatbed</h4>
                    <div className="info-grid">
                      <div className="info-item">
                        <strong>VIN:</strong> 1FD0X5HT1PED12345
                      </div>
                      <div className="info-item">
                        <strong>License:</strong> TX12345
                      </div>
                      <div className="info-item">
                        <strong>Assigned:</strong> Robert Lee
                      </div>
                      <div className="info-item">
                        <strong>Status:</strong> <span className="status-active">Active</span>
                      </div>
                      <div className="info-item">
                        <strong>Mileage:</strong> 24,587
                      </div>
                      <div className="info-item">
                        <strong>Last Service:</strong> 07/15/2025
                      </div>
                    </div>
                    <div className="vehicle-actions">
                      <button>Service History</button>
                      <button>Update Info</button>
                      <button>Schedule Maintenance</button>
                    </div>
                  </div>
                </div>
                
                <div className="vehicle-detail-card maintenance">
                  <div className="vehicle-image placeholder">
                    <span>Wrecker #3</span>
                  </div>
                  <div className="vehicle-info">
                    <h4>2022 Chevrolet Silverado 3500HD Wrecker</h4>
                    <div className="info-grid">
                      <div className="info-item">
                        <strong>VIN:</strong> 1GC4YUCY5NF234567
                      </div>
                      <div className="info-item">
                        <strong>License:</strong> TX67890
                      </div>
                      <div className="info-item">
                        <strong>Assigned:</strong> N/A
                      </div>
                      <div className="info-item">
                        <strong>Status:</strong> <span className="status-maintenance">In Maintenance</span>
                      </div>
                      <div className="info-item">
                        <strong>Mileage:</strong> 37,842
                      </div>
                      <div className="info-item">
                        <strong>Service Due:</strong> 08/12/2025
                      </div>
                    </div>
                    <div className="vehicle-actions">
                      <button>Maintenance Details</button>
                      <button>Update Status</button>
                      <button>View Work Order</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'privateproperty':
        return (
          <div className="feature-detail">
            <h3>Private Property Forms</h3>
            <div className="forms-dashboard">
              <div className="forms-summary">
                <div className="summary-box">
                  <h4>Forms This Month</h4>
                  <div className="count">32</div>
                </div>
                <div className="summary-box">
                  <h4>Pending Signatures</h4>
                  <div className="count warning">7</div>
                </div>
                <div className="summary-box">
                  <h4>Completed</h4>
                  <div className="count">25</div>
                </div>
              </div>
              
              <div className="forms-actions">
                <button className="primary-button">New Property Tow Form</button>
                <button>Property Owner Registration</button>
                <button>Form Templates</button>
              </div>
              
              <div className="forms-table">
                <h4>Recent Private Property Forms</h4>
                <table>
                  <thead>
                    <tr>
                      <th>Form ID</th>
                      <th>Property Name</th>
                      <th>Address</th>
                      <th>Vehicle Info</th>
                      <th>Tow Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>PP-2025-108</td>
                      <td>Oakwood Apartments</td>
                      <td>123 Main St, Austin, TX</td>
                      <td>2015 Honda Civic, Blue</td>
                      <td>08/07/2025</td>
                      <td className="status-pending">Pending Authorization</td>
                      <td>
                        <button className="action-button">View</button>
                        <button className="action-button">Get Signature</button>
                      </td>
                    </tr>
                    <tr>
                      <td>PP-2025-107</td>
                      <td>Sunrise Shopping Center</td>
                      <td>456 Oak Dr, Dallas, TX</td>
                      <td>2018 Toyota Camry, Silver</td>
                      <td>08/06/2025</td>
                      <td className="status-completed">Completed</td>
                      <td>
                        <button className="action-button">View</button>
                        <button className="action-button">Print</button>
                      </td>
                    </tr>
                    <tr>
                      <td>PP-2025-106</td>
                      <td>Pine Ridge Office Park</td>
                      <td>789 Pine Ave, Houston, TX</td>
                      <td>2020 Ford F-150, Red</td>
                      <td>08/05/2025</td>
                      <td className="status-warning">Missing Documentation</td>
                      <td>
                        <button className="action-button">View</button>
                        <button className="action-button">Update</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="property-form">
                <h4>Private Property Tow Authorization Form</h4>
                <form>
                  <div className="form-section">
                    <h5>Property Information</h5>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Property Name</label>
                        <input type="text" placeholder="Apartment complex, business, etc." />
                      </div>
                      <div className="form-group">
                        <label>Property Address</label>
                        <input type="text" placeholder="Full address" />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Property Owner/Manager</label>
                        <input type="text" placeholder="Full name" />
                      </div>
                      <div className="form-group">
                        <label>Contact Phone</label>
                        <input type="tel" placeholder="(___) ___-____" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="form-section">
                    <h5>Vehicle Information</h5>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Make & Model</label>
                        <input type="text" placeholder="Toyota Camry, etc." />
                      </div>
                      <div className="form-group">
                        <label>Year</label>
                        <input type="text" placeholder="Vehicle year" />
                      </div>
                      <div className="form-group">
                        <label>Color</label>
                        <input type="text" placeholder="Vehicle color" />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>License Plate</label>
                        <input type="text" placeholder="License plate number" />
                      </div>
                      <div className="form-group">
                        <label>State</label>
                        <input type="text" placeholder="License plate state" />
                      </div>
                      <div className="form-group">
                        <label>VIN</label>
                        <input type="text" placeholder="Vehicle identification number" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="form-section">
                    <h5>Tow Information</h5>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Reason for Tow</label>
                        <select>
                          <option>Select Reason</option>
                          <option>No Permit/Unauthorized Parking</option>
                          <option>Fire Lane Violation</option>
                          <option>Expired Permit</option>
                          <option>Abandoned Vehicle</option>
                          <option>Blocking Access</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Destination</label>
                        <select>
                          <option>Select Destination</option>
                          <option>Main Impound Lot</option>
                          <option>Secondary Storage Facility</option>
                          <option>Customer Specified Location</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group wide">
                        <label>Additional Notes</label>
                        <textarea placeholder="Any special instructions or observations"></textarea>
                      </div>
                    </div>
                  </div>
                  
                  <div className="form-section">
                    <h5>Authorization</h5>
                    <div className="form-row">
                      <div className="form-group wide">
                        <p className="legal-text">
                          By signing below, I certify that I am the property owner or authorized representative with the legal authority to request the removal of the described vehicle from the property. I understand that false representation may result in civil and/or criminal penalties.
                        </p>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Authorized Name</label>
                        <input type="text" placeholder="Full name of authorizing person" />
                      </div>
                      <div className="form-group">
                        <label>Title/Position</label>
                        <input type="text" placeholder="Manager, Owner, etc." />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group wide">
                        <label>Signature</label>
                        <div className="signature-box">
                          <p>Sign here</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="form-actions">
                    <button type="submit" className="primary-button">Submit Form</button>
                    <button type="button">Save Draft</button>
                    <button type="button">Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        );

      case 'damagerelease':
        return (
          <div className="feature-detail">
            <h3>Damage Release Forms</h3>
            <div className="damage-dashboard">
              <div className="forms-summary">
                <div className="summary-box">
                  <h4>Total Forms</h4>
                  <div className="count">47</div>
                </div>
                <div className="summary-box">
                  <h4>Pending Signatures</h4>
                  <div className="count warning">5</div>
                </div>
                <div className="summary-box">
                  <h4>Completed This Month</h4>
                  <div className="count">12</div>
                </div>
              </div>
              
              <div className="forms-actions">
                <button className="primary-button">New Damage Release Form</button>
                <button>View Archived Forms</button>
                <button>Form Templates</button>
              </div>
              
              <div className="forms-table">
                <h4>Recent Damage Release Forms</h4>
                <table>
                  <thead>
                    <tr>
                      <th>Form ID</th>
                      <th>Customer</th>
                      <th>Vehicle Info</th>
                      <th>Service Date</th>
                      <th>Driver</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>DR-2025-064</td>
                      <td>Sarah Davis</td>
                      <td>2020 Honda Civic, Blue</td>
                      <td>08/07/2025</td>
                      <td>Carlos Martinez</td>
                      <td className="status-pending">Pending Signature</td>
                      <td>
                        <button className="action-button">View</button>
                        <button className="action-button">Send to Customer</button>
                      </td>
                    </tr>
                    <tr>
                      <td>DR-2025-063</td>
                      <td>Michael Wilson</td>
                      <td>2018 Toyota Camry, Silver</td>
                      <td>08/05/2025</td>
                      <td>James Wilson</td>
                      <td className="status-completed">Completed</td>
                      <td>
                        <button className="action-button">View</button>
                        <button className="action-button">Print</button>
                      </td>
                    </tr>
                    <tr>
                      <td>DR-2025-062</td>
                      <td>Lisa Johnson</td>
                      <td>2019 Chevrolet Malibu, Black</td>
                      <td>08/04/2025</td>
                      <td>Robert Lee</td>
                      <td className="status-completed">Completed</td>
                      <td>
                        <button className="action-button">View</button>
                        <button className="action-button">Print</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="damage-form">
                <h4>Damage Release Form</h4>
                <form>
                  <div className="form-section">
                    <h5>Customer Information</h5>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Customer Name</label>
                        <input type="text" placeholder="Full name" />
                      </div>
                      <div className="form-group">
                        <label>Phone Number</label>
                        <input type="tel" placeholder="(___) ___-____" />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Email</label>
                        <input type="email" placeholder="Email address" />
                      </div>
                      <div className="form-group">
                        <label>Driver's License</label>
                        <input type="text" placeholder="Driver's license number" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="form-section">
                    <h5>Vehicle Information</h5>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Make & Model</label>
                        <input type="text" placeholder="Toyota Camry, etc." />
                      </div>
                      <div className="form-group">
                        <label>Year</label>
                        <input type="text" placeholder="Vehicle year" />
                      </div>
                      <div className="form-group">
                        <label>Color</label>
                        <input type="text" placeholder="Vehicle color" />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>License Plate</label>
                        <input type="text" placeholder="License plate number" />
                      </div>
                      <div className="form-group">
                        <label>VIN</label>
                        <input type="text" placeholder="Vehicle identification number" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="form-section">
                    <h5>Service Information</h5>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Service Date</label>
                        <input type="date" />
                      </div>
                      <div className="form-group">
                        <label>Service Type</label>
                        <select>
                          <option>Select Service Type</option>
                          <option>Towing</option>
                          <option>Roadside Assistance</option>
                          <option>Vehicle Recovery</option>
                          <option>Flatbed Transport</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Driver Name</label>
                        <input type="text" placeholder="Name of driver who performed service" />
                      </div>
                      <div className="form-group">
                        <label>Tow Truck ID</label>
                        <input type="text" placeholder="Truck identification number" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="form-section">
                    <h5>Pre-Existing Damage Documentation</h5>
                    <div className="form-row">
                      <div className="form-group wide">
                        <label>Existing Damage Description</label>
                        <textarea placeholder="Describe any pre-existing damage noted"></textarea>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group wide">
                        <label>Upload Photos of Pre-Existing Damage</label>
                        <input type="file" multiple />
                      </div>
                    </div>
                  </div>
                  
                  <div className="form-section">
                    <h5>Release of Liability</h5>
                    <div className="form-row">
                      <div className="form-group wide">
                        <p className="legal-text">
                          I, the undersigned vehicle owner or authorized representative, hereby acknowledge receipt of the above-described vehicle. I have inspected the vehicle and find it to be in the same condition as when it was picked up by Texas Towing Ops, except as noted above. I release and discharge Texas Towing Ops, its employees, and agents from any and all claims for damage to or loss of the vehicle or its contents that may have occurred during the towing, transportation, or storage of the vehicle.
                        </p>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group wide">
                        <label>Customer Signature</label>
                        <div className="signature-box">
                          <p>Sign here</p>
                        </div>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Date</label>
                        <input type="date" />
                      </div>
                      <div className="form-group">
                        <label>Company Representative</label>
                        <input type="text" placeholder="Company representative name" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="form-actions">
                    <button type="submit" className="primary-button">Submit Form</button>
                    <button type="button">Save Draft</button>
                    <button type="button">Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        );

      case 'legaldocs':
        return (
          <div className="feature-detail">
            <h3>Legal Documents</h3>
            <div className="legal-dashboard">
              <div className="legal-summary">
                <div className="summary-box">
                  <h4>Total Documents</h4>
                  <div className="count">124</div>
                </div>
                <div className="summary-box">
                  <h4>Recent Updates</h4>
                  <div className="count">7</div>
                </div>
                <div className="summary-box">
                  <h4>Requiring Attention</h4>
                  <div className="count warning">3</div>
                </div>
              </div>
              
              <div className="legal-actions">
                <button className="primary-button">Upload Document</button>
                <button>Create Folder</button>
                <button>Export Documents</button>
              </div>
              
              <div className="legal-search">
                <input type="text" placeholder="Search documents..." />
                <button>Search</button>
              </div>
              
              <div className="legal-folders">
                <div className="folder-list">
                  <div className="folder-item">
                    <div className="folder-icon">📁</div>
                    <div className="folder-name">Permits & Licenses</div>
                    <div className="folder-count">34 documents</div>
                  </div>
                  <div className="folder-item">
                    <div className="folder-icon">📁</div>
                    <div className="folder-name">Insurance Documents</div>
                    <div className="folder-count">17 documents</div>
                  </div>
                  <div className="folder-item">
                    <div className="folder-icon">📁</div>
                    <div className="folder-name">Contracts & Agreements</div>
                    <div className="folder-count">28 documents</div>
                  </div>
                  <div className="folder-item">
                    <div className="folder-icon">📁</div>
                    <div className="folder-name">Regulatory Compliance</div>
                    <div className="folder-count">23 documents</div>
                  </div>
                  <div className="folder-item warning">
                    <div className="folder-icon">📁</div>
                    <div className="folder-name">Renewal Required</div>
                    <div className="folder-count">3 documents</div>
                  </div>
                </div>
              </div>
              
              <div className="legal-table">
                <h4>Recent Documents</h4>
                <table>
                  <thead>
                    <tr>
                      <th>Document Name</th>
                      <th>Type</th>
                      <th>Date Added</th>
                      <th>Expiration</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Business License 2025-2026</td>
                      <td>License</td>
                      <td>07/15/2025</td>
                      <td>07/14/2026</td>
                      <td className="status-active">Active</td>
                      <td>
                        <button className="action-button">View</button>
                        <button className="action-button">Download</button>
                      </td>
                    </tr>
                    <tr>
                      <td>Commercial Vehicle Insurance Policy</td>
                      <td>Insurance</td>
                      <td>06/01/2025</td>
                      <td>06/01/2026</td>
                      <td className="status-active">Active</td>
                      <td>
                        <button className="action-button">View</button>
                        <button className="action-button">Download</button>
                      </td>
                    </tr>
                    <tr className="warning-row">
                      <td>TDLR Towing Operator License - Carlos Martinez</td>
                      <td>License</td>
                      <td>01/15/2025</td>
                      <td>08/15/2025</td>
                      <td className="status-warning">Expiring Soon</td>
                      <td>
                        <button className="action-button">View</button>
                        <button className="action-button">Renew</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      // Add more feature content here for other menu
