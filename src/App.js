import React, { useState, useEffect, useRef } from 'react';
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
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  // References for Google Maps
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  
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
  
  // Initialize Google Maps when the livemap feature is selected
  useEffect(() => {
    if (selectedFeature === 'livemap' && mapRef.current && !mapInstanceRef.current) {
      // Sample driver locations (latitude, longitude)
      const driverLocations = [
        { lat: 30.2672, lng: -97.7431, name: "Carlos Martinez", vehicle: "Flatbed #3", status: "available" }, // Austin
        { lat: 30.2546, lng: -97.7622, name: "James Wilson", vehicle: "Wrecker #2", status: "available" }, // South Austin
        { lat: 30.2913, lng: -97.7352, name: "Robert Lee", vehicle: "Flatbed #1", status: "busy" }, // North Austin
        { lat: 30.2747, lng: -97.7404, name: "Mike Johnson", vehicle: "Wrecker #1", status: "available" } // East Austin
      ];
      
      try {
        // Create map centered on Austin, TX
        const mapOptions = {
          center: { lat: 30.2672, lng: -97.7431 },
          zoom: 12,
          mapTypeId: window.google.maps.MapTypeId.ROADMAP,
          mapTypeControl: true,
          streetViewControl: false,
          fullscreenControl: true,
        };
        
        const map = new window.google.maps.Map(mapRef.current, mapOptions);
        mapInstanceRef.current = map;
        
        // Add markers for each driver
        driverLocations.forEach(driver => {
          const marker = new window.google.maps.Marker({
            position: { lat: driver.lat, lng: driver.lng },
            map,
            title: driver.name,
            icon: {
              path: window.google.maps.SymbolPath.CIRCLE,
              fillColor: driver.status === 'available' ? '#28a745' : '#dc3545',
              fillOpacity: 1,
              strokeWeight: 1,
              strokeColor: '#ffffff',
              scale: 8
            }
          });
          
          // Add info window for each driver
          const infoWindow = new window.google.maps.InfoWindow({
            content: `
              <div style="padding: 10px;">
                <h4 style="margin: 0 0 5px 0;">${driver.name}</h4>
                <p style="margin: 0 0 3px 0;"><strong>Vehicle:</strong> ${driver.vehicle}</p>
                <p style="margin: 0; color: ${driver.status === 'available' ? '#28a745' : '#dc3545'}">
                  <strong>Status:</strong> ${driver.status === 'available' ? 'Available' : 'Busy'}
                </p>
              </div>
            `
          });
          
          marker.addListener('click', () => {
            infoWindow.open(map, marker);
          });
        });
      } catch (error) {
        console.error("Error initializing Google Maps:", error);
      }
    }
  }, [selectedFeature]);
  
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
    mapInstanceRef.current = null;
  };
  
  const handleCreateNew = () => {
    setShowCreateModal(true);
  };
  
  const handleCloseModal = () => {
    setShowCreateModal(false);
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
  
  // Create Modal component
  const CreateModal = () => {
    const [formData, setFormData] = useState({});
    
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };
    
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Form submitted:", formData);
      // Here you would save the data to your database
      alert("New record created successfully!");
      handleCloseModal();
    };
    
    // Render different forms based on the selected feature
    const renderForm = () => {
      switch(selectedFeature) {
        case 'dispatch':
          return (
            <>
              <div className="form-row">
                <div className="form-group">
                  <label>Customer Name</label>
                  <input type="text" name="customerName" onChange={handleInputChange} placeholder="Enter customer name" required />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input type="tel" name="phone" onChange={handleInputChange} placeholder="Phone number" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Location</label>
                  <input type="text" name="location" onChange={handleInputChange} placeholder="Service location" required />
                </div>
                <div className="form-group">
                  <label>Service Type</label>
                  <select name="serviceType" onChange={handleInputChange} required>
                    <option value="">Select service type</option>
                    <option value="towing">Towing</option>
                    <option value="recovery">Vehicle Recovery</option>
                    <option value="roadside">Roadside Assistance</option>
                    <option value="flatbed">Flatbed Transport</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group wide">
                  <label>Notes</label>
                  <textarea name="notes" onChange={handleInputChange} placeholder="Additional information"></textarea>
                </div>
              </div>
            </>
          );
          
        case 'drivercalls':
          return (
            <>
              <div className="form-row">
                <div className="form-group">
                  <label>Customer Name</label>
                  <input type="text" name="customerName" onChange={handleInputChange} placeholder="Enter customer name" required />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input type="tel" name="phone" onChange={handleInputChange} placeholder="Phone number" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Location</label>
                  <input type="text" name="location" onChange={handleInputChange} placeholder="Service location" required />
                </div>
                <div className="form-group">
                  <label>Service Requested</label>
                  <select name="serviceType" onChange={handleInputChange} required>
                    <option value="">Select service type</option>
                    <option value="towing">Towing</option>
                    <option value="recovery">Vehicle Recovery</option>
                    <option value="roadside">Roadside Assistance</option>
                    <option value="flatbed">Flatbed Transport</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Vehicle Make/Model</label>
                  <input type="text" name="vehicleModel" onChange={handleInputChange} placeholder="e.g. Toyota Camry" required />
                </div>
                <div className="form-group">
                  <label>Vehicle Color</label>
                  <input type="text" name="vehicleColor" onChange={handleInputChange} placeholder="e.g. Red" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group wide">
                  <label>Notes</label>
                  <textarea name="notes" onChange={handleInputChange} placeholder="Additional information"></textarea>
                </div>
              </div>
            </>
          );
          
        case 'impound':
          return (
            <>
              <div className="form-row">
                <div className="form-group">
                  <label>Vehicle Make/Model</label>
                  <input type="text" name="vehicleModel" onChange={handleInputChange} placeholder="e.g. Toyota Camry" required />
                </div>
                <div className="form-group">
                  <label>Year</label>
                  <input type="number" name="vehicleYear" onChange={handleInputChange} placeholder="Vehicle year" required />
                </div>
                <div className="form-group">
                  <label>Color</label>
                  <input type="text" name="vehicleColor" onChange={handleInputChange} placeholder="Vehicle color" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>License Plate</label>
                  <input type="text" name="licensePlate" onChange={handleInputChange} placeholder="License plate number" required />
                </div>
                <div className="form-group">
                  <label>State</label>
                  <input type="text" name="state" onChange={handleInputChange} placeholder="License plate state" required />
                </div>
                <div className="form-group">
                  <label>VIN</label>
                  <input type="text" name="vin" onChange={handleInputChange} placeholder="Vehicle identification number" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Reason for Impound</label>
                  <select name="reason" onChange={handleInputChange} required>
                    <option value="">Select reason</option>
                    <option value="abandoned">Abandoned Vehicle</option>
                    <option value="illegal">Illegal Parking</option>
                    <option value="accident">Accident</option>
                    <option value="police">Police Request</option>
                    <option value="private">Private Property</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Impound Lot</label>
                  <select name="lot" onChange={handleInputChange} required>
                    <option value="">Select lot</option>
                    <option value="A">Lot A</option>
                    <option value="B">Lot B</option>
                    <option value="C">Lot C</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Lot Space</label>
                  <input type="text" name="lotSpace" onChange={handleInputChange} placeholder="Specific space number" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group wide">
                  <label>Notes</label>
                  <textarea name="notes" onChange={handleInputChange} placeholder="Additional information"></textarea>
                </div>
              </div>
            </>
          );
          
        case 'handbook':
          return (
            <>
              <div className="form-row">
                <div className="form-group">
                  <label>Section Title</label>
                  <input type="text" name="title" onChange={handleInputChange} placeholder="Title of the handbook section" required />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select name="category" onChange={handleInputChange} required>
                    <option value="">Select category</option>
                    <option value="safety">General Safety</option>
                    <option value="vehicle">Vehicle Operation</option>
                    <option value="towing">Towing Procedures</option>
                    <option value="customer">Customer Interaction</option>
                    <option value="emergency">Emergency Procedures</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group wide">
                  <label>Content</label>
                  <textarea name="content" onChange={handleInputChange} rows="10" placeholder="Enter the content for this handbook section" required></textarea>
                </div>
              </div>
            </>
          );
          
        // Default form for other features
        default:
          return (
            <>
              <div className="form-row">
                <div className="form-group">
                  <label>Name</label>
                  <input type="text" name="name" onChange={handleInputChange} placeholder="Enter name" required />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <input type="text" name="description" onChange={handleInputChange} placeholder="Enter description" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group wide">
                  <label>Notes</label>
                  <textarea name="notes" onChange={handleInputChange} placeholder="Additional information"></textarea>
                </div>
              </div>
            </>
          );
      }
    };
    
    return (
      <div className="modal-backdrop" onClick={handleCloseModal}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h3>Create New {getFeatureTitle(selectedFeature)}</h3>
            <button className="close-button" onClick={handleCloseModal}>&times;</button>
          </div>
          
          <form onSubmit={handleSubmit}>
            {renderForm()}
            
            <div className="modal-footer">
              <button type="button" onClick={handleCloseModal}>Cancel</button>
              <button type="submit" className="primary-button">Create</button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  // Show loading indicator
  if (loading) {
    return <div className="loading">Loading...</div>;
  }
  
  // Feature content rendering function
  const renderFeatureContent = () => {
    // Common feature header with create button for all features
    const FeatureHeader = ({ title, buttonText = "Create New" }) => (
      <div className="feature-header">
        <h3>{title}</h3>
        <button className="create-button" onClick={handleCreateNew}>
          <span>+</span> {buttonText}
        </button>
      </div>
    );
    
    switch(selectedFeature) {
      // Operations Section
      case 'dispatch':
        return (
          <div className="feature-detail">
            <FeatureHeader title="Dispatch System" buttonText="New Dispatch" />
            <div className="dispatch-dashboard">
              <div className="dispatch-controls">
                <div className="control-group">
                  <h4>Dispatch Overview</h4>
                  <p>Total active dispatches: 23</p>
                  <p>Pending assignments: 5</p>
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
            <FeatureHeader title="Driver Calls" buttonText="New Call" />
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
            <FeatureHeader title="Impound Facility" buttonText="Add Vehicle" />
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
            <FeatureHeader title="Customer Billing" buttonText="New Invoice" />
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
            <FeatureHeader title="Driver Live Map" buttonText="Add Driver" />
            <div className="livemap-container">
              <div className="map-sidebar">
                <div className="map-filters">
                  <h4>Filters</h4>
                  <div className="filter-group">
                    <label>
                      <input type="checkbox" defaultChecked />
                      <span>Active Drivers</span>
                    </label>
                  </div>
                  <div className="filter-group">
                    <label>
                      <input type="checkbox" defaultChecked />
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
                  
                  <div className="driver-item active">
                    <div className="driver-status"></div>
                    <div className="driver-info">
                      <strong>Mike Johnson</strong>
                      <span>Wrecker #1</span>
                    </div>
                    <div className="driver-actions">
                      <button className="small-button">Contact</button>
                      <button className="small-button">Assign</button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="map-display">
                {/* This div will be populated with the Google Map */}
                <div ref={mapRef} className="google-map"></div>
              </div>
            </div>
          </div>
        );
        
      case 'equipment':
        return (
          <div className="feature-detail">
            <FeatureHeader title="Equipment Logs" buttonText="Add Equipment Log" />
            <div className="equipment-dashboard">
              <div className="equipment-actions">
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
            <FeatureHeader title="Daily Inspections" buttonText="New Inspection" />
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
            <div className="feature-header">
              <h3>Safety Protocols & Procedures</h3>
              <button className="create-button" onClick={handleCreateNew}>
                <span>+</span> Add Section
              </button>
            </div>
            
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
        
      // For all other features - This is the important part that ensures ALL features have a create button
      default:
        return (
          <div className="feature-detail">
            <div className="feature-header">
              <h3>{getFeatureTitle(selectedFeature)}</h3>
              <button className="create-button" onClick={handleCreateNew}>
                <span>+</span> Create New
              </button>
            </div>
            <div className="feature-placeholder">
              <p>This {selectedFeature} feature is under development.</p>
              <p>Click the "Create New" button to add content.</p>
            </div>
          </div>
        );
    }
  };
  
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
              
              {renderFeatureContent()}
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
      
      {showCreateModal && <CreateModal />}
    </div>
  );
}

export default App;
