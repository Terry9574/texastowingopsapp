import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import './App.css';
import './features.css';

// Initialize Supabase client
const supabaseUrl = 'https://odxwjyuamvgccpesykts.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9keHdqeXVhbXZnY2NwZXN5a3RzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0Mjk4MTQsImV4cCI6MjA3MDAwNTgxNH0.BnzEn6Ep40ysR0hRcuYeY61Rlxohd2YDIvuHbQvDeAc';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// TDLR notification timing calculation
const calculateTDLRNotifications = (impoundDate) => {
  const impound = new Date(impoundDate);
  
  // Calculate first notification date (24 hours after impound)
  const firstNotification = new Date(impound);
  firstNotification.setDate(firstNotification.getDate() + 1);
  
  // Calculate police notification date (10 days after impound)
  const policeNotification = new Date(impound);
  policeNotification.setDate(policeNotification.getDate() + 10);
  
  // Calculate second notification date (15 days after first notification)
  const secondNotification = new Date(firstNotification);
  secondNotification.setDate(secondNotification.getDate() + 15);
  
  // Calculate sale date (30 days after second notification)
  const saleDate = new Date(secondNotification);
  saleDate.setDate(saleDate.getDate() + 30);
  
  // Calculate days remaining for each notification
  const today = new Date();
  const firstNotificationRemaining = Math.ceil((firstNotification - today) / (1000 * 60 * 60 * 24));
  const policeNotificationRemaining = Math.ceil((policeNotification - today) / (1000 * 60 * 60 * 24));
  const secondNotificationRemaining = Math.ceil((secondNotification - today) / (1000 * 60 * 60 * 24));
  const saleDateRemaining = Math.ceil((saleDate - today) / (1000 * 60 * 60 * 24));
  
  return {
    firstNotificationDate: firstNotification,
    firstNotificationRemaining,
    policeNotificationDate: policeNotification,
    policeNotificationRemaining,
    secondNotificationDate: secondNotification,
    secondNotificationRemaining,
    saleDateDate: saleDate,
    saleDateRemaining
  };
};

// Format date as MM/DD/YYYY
const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
};

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
    
    // FOR DEVELOPMENT ONLY - Allow any login
    const devMode = true;
    
    if (devMode) {
      // Create a demo session
      const demoSession = {
        user: {
          email: email || 'demo@texastowing.com',
          role: 'user',
          id: 'demo-user'
        },
        access_token: 'demo-token'
      };
      
      setSession(demoSession);
      return;
    }
    
    // Regular Supabase login - only used when devMode is false
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
    setSession(null);
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
              <div className="form-section">
                <h5>Basic Information</h5>
                <div className="form-row">
                  <div className="form-group">
                    <label>Owner Name</label>
                    <input type="text" name="ownerName" value={formData.ownerName || ''} onChange={handleInputChange} placeholder="Vehicle owner's name" />
                  </div>
                  <div className="form-group">
                    <label>Tow Date</label>
                    <input type="date" name="towDate" value={formData.towDate || ''} onChange={handleInputChange} required />
                  </div>
                  <div className="form-group">
                    <label>Tow Time</label>
                    <input type="time" name="towTime" value={formData.towTime || ''} onChange={handleInputChange} required />
                  </div>
                </div>
              </div>
              
              <div className="form-section">
                <h5>Vehicle Info</h5>
                <div className="form-row">
                  <div className="form-group">
                    <label>VIN</label>
                    <div className="vin-decoder-field">
                      <input type="text" name="vin" value={formData.vin || ''} onChange={handleInputChange} placeholder="Enter VIN number" required />
                      <button type="button" className="vin-decode-button" onClick={() => {
                        // Call the VIN decoder API
                        if (formData.vin && formData.vin.length > 10) {
                          fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${formData.vin}?format=json`)
                            .then(res => res.json())
                            .then(data => {
                              const results = data.Results;
                              const make = results.find(item => item.Variable === "Make")?.Value || '';
                              const model = results.find(item => item.Variable === "Model")?.Value || '';
                              const year = results.find(item => item.Variable === "Model Year")?.Value || '';
                              
                              // Update the form data with the decoded information
                              const vehicleDetails = `${year} ${make} ${model}`.trim();
                              
                              setFormData(prev => ({
                                ...prev,
                                vehicleModel: vehicleDetails
                              }));
                              
                              alert(`VIN Decoded: ${vehicleDetails}`);
                            })
                            .catch(err => {
                              console.error("Error decoding VIN:", err);
                              alert("Error decoding VIN. Please check the VIN number.");
                            });
                        } else {
                          alert("Please enter a valid VIN number (at least 11 characters).");
                        }
                      }}>Decode VIN</button>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>License Plate</label>
                    <input type="text" name="licensePlate" value={formData.licensePlate || ''} onChange={handleInputChange} placeholder="License plate number" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group wide">
                    <label>Vehicle Details (Year, Make, Model)</label>
                    <input type="text" name="vehicleModel" value={formData.vehicleModel || ''} onChange={handleInputChange} placeholder="e.g. 2020 Ford F-150" required />
                  </div>
                </div>
              </div>
              
              <div className="form-section">
                <h5>Tow Information</h5>
                <div className="form-row">
                  <div className="form-group">
                    <label>Tow From Address</label>
                    <input type="text" name="towFrom" value={formData.towFrom || ''} onChange={handleInputChange} placeholder="Address vehicle was towed from" required />
                  </div>
                  <div className="form-group">
                    <label>Dropoff Location</label>
                    <select name="dropoffLocation" value={formData.dropoffLocation || ''} onChange={handleInputChange} required>
                      <option value="">Select storage facility</option>
                      <option value="main">Main Storage Facility</option>
                      <option value="secondary">Secondary Lot</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="form-section">
                <h5>Towing Charges</h5>
                <div className="form-row">
                  <div className="form-group">
                    <label>Towing Amount</label>
                    <div className="amount-field">
                      <span className="currency-symbol">$</span>
                      <input type="number" name="towingAmount" value={formData.towingAmount || ''} onChange={handleInputChange} placeholder="0.00" step="0.01" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="form-section">
                <h5>Daily Storage Charges</h5>
                <div className="form-row">
                  <div className="form-group">
                    <label>Daily Storage Rate</label>
                    <div className="amount-field">
                      <span className="currency-symbol">$</span>
                      <input type="number" name="dailyRate" value={formData.dailyRate || ''} onChange={handleInputChange} placeholder="0.00" step="0.01" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Storage Days (Calculated)</label>
                    <input type="number" name="storageDays" value={formData.storageDays || '0'} readOnly />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Storage Start Date</label>
                    <input type="date" name="storageStart" value={formData.storageStart || ''} onChange={(e) => {
                      const value = e.target.value;
                      handleInputChange(e);
                      
                      // Calculate storage days if both start and end dates are set
                      if (value && formData.storageEnd) {
                        const start = new Date(value);
                        const end = new Date(formData.storageEnd);
                        const diffTime = Math.abs(end - start);
                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                        
                        setFormData(prev => ({
                          ...prev,
                          storageDays: diffDays
                        }));
                      }
                    }} />
                  </div>
                  <div className="form-group">
                    <label>Storage End Date</label>
                    <input type="date" name="storageEnd" value={formData.storageEnd || ''} onChange={(e) => {
                      const value = e.target.value;
                      handleInputChange(e);
                      
                      // Calculate storage days if both start and end dates are set
                      if (formData.storageStart && value) {
                        const start = new Date(formData.storageStart);
                        const end = new Date(value);
                        const diffTime = Math.abs(end - start);
                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                        
                        setFormData(prev => ({
                          ...prev,
                          storageDays: diffDays
                        }));
                      }
                    }} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Notification Fee</label>
                    <div className="amount-field">
                      <span className="currency-symbol">$</span>
                      <input type="number" name="notificationFee" value={formData.notificationFee || ''} onChange={handleInputChange} placeholder="0.00" step="0.01" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="form-section">
                <h5>TDLR Notification Schedule</h5>
                <div className="form-row">
                  <div className="notification-schedule">
                    <p><strong>First Notification:</strong> 24 hours after impound</p>
                    <p><strong>Police Notification:</strong> 10 days after impound</p>
                    <p><strong>Second Notification:</strong> 15 days after first notification</p>
                    <p><strong>Sale Date:</strong> 30 days after second notification</p>
                  </div>
                </div>
              </div>
              
              <div className="form-section">
                <h5>Vehicle Documentation</h5>
                <div className="form-row">
                  <div className="form-group wide">
                    <label>Damage Description</label>
                    <textarea name="damageDescription" value={formData.damageDescription || ''} onChange={handleInputChange} placeholder="Describe any pre-existing damage"></textarea>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group wide">
                    <label>Upload Photos</label>
                    <div className="photo-upload">
                      <input type="file" multiple />
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group wide">
                    <label>Items Inside Vehicle</label>
                    <textarea name="itemsInside" value={formData.itemsInside || ''} onChange={handleInputChange} placeholder="List any visible items left in vehicle"></textarea>
                  </div>
                </div>
              </div>
              
              <div className="form-section">
                <h5>Legal Acceptance</h5>
                <div className="form-row">
                  <div className="form-group wide">
                    <label className="checkbox-label">
                      <input type="checkbox" name="legalAcceptance" checked={formData.legalAcceptance || false} onChange={(e) => {
                        handleInputChange({
                          target: {
                            name: e.target.name,
                            value: e.target.checked
                          }
                        });
                      }} />
                      <span>Acknowledge and Accept Terms: By checking this box, I acknowledge that I have read and agree to the terms outlined in the Legal Notice & Compliance section.</span>
                    </label>
                  </div>
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
          
        case 'library':
          return (
            <>
              <div className="form-row">
                <div className="form-group">
                  <label>Resource Title</label>
                  <input type="text" name="resourceTitle" onChange={handleInputChange} placeholder="Title of the resource" required />
                </div>
                <div className="form-group">
                  <label>Resource Type</label>
                  <select name="resourceType" onChange={handleInputChange} required>
                    <option value="">Select type</option>
                    <option value="document">Document</option>
                    <option value="video">Video</option>
                    <option value="link">External Link</option>
                    <option value="form">Form</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group wide">
                  <label>Description</label>
                  <textarea name="description" onChange={handleInputChange} placeholder="Brief description of this resource" required></textarea>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Resource URL (if external)</label>
                  <input type="url" name="resourceUrl" onChange={handleInputChange} placeholder="https://example.com" />
                </div>
                <div className="form-group">
                  <label>Upload File (if document)</label>
                  <input type="file" name="resourceFile" onChange={handleInputChange} />
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
            <div className="feature-header">
              <h3>Impound Facility</h3>
              <p className="feature-subtitle">Vehicle impound and storage documentation</p>
              <button className="create-button" onClick={handleCreateNew}>
                <span>+</span> New Impound Entry
              </button>
            </div>
            
            <div className="impound-controls">
              <div className="search-filter">
                <input type="text" placeholder="Search..." className="search-input" />
                <div className="filter-dropdown">
                  <button className="filter-button">
                    <span>All Status</span>
                    <span className="dropdown-icon">▼</span>
                  </button>
                </div>
                <div className="filter-dropdown">
                  <button className="filter-button">
                    <span>All Alerts</span>
                    <span className="dropdown-icon">▼</span>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="impound-vehicles">
              <div className="vehicle-card">
                <div className="vehicle-header">
                  <h4>2020 FORD F-150</h4>
                  <span className="status-tag">In Storage</span>
                </div>
                <div className="vehicle-details">
                  <p><strong>VIN:</strong> 1F1FW1E61LA07664</p>
                  <p><strong>LP:</strong> PAPER</p>
                  <p><strong>Impounded:</strong> Jul 13, 2025, 7:00 PM</p>
                  <p><strong>Days in Storage:</strong> 24</p>
                  <p><strong>Towed From:</strong> 27008 Farm to Market Road 2978</p>
                  <p><strong>Owner:</strong> UNKNOWN</p>
                </div>
                
                <div className="tdlr-notifications">
                  <h5>TDLR Notification Status</h5>
                  <div className="notification-item complete">
                    <span className="check-icon">✓</span>
                    <span>First Notification Sent: Jul 14, 2025</span>
                  </div>
                  <div className="notification-item complete">
                    <span className="check-icon">✓</span>
                    <span>Police Notification Sent: Jul 23, 2025</span>
                  </div>
                  <div className="notification-item urgent">
                    <span className="alert-icon">!</span>
                    <span>Second Notification Due</span>
                    <button className="notification-button">Mark Sent</button>
                  </div>
                  <div className="notification-item pending">
                    <span className="clock-icon">⏱</span>
                    <span>Sale Date: Sep 13, 2025 (36 days)</span>
                  </div>
                </div>
                
                <div className="card-actions">
                  <button className="icon-button">⋮</button>
                </div>
              </div>
              
              <div className="vehicle-card">
                <div className="vehicle-header">
                  <h4>2020 Honda Civic</h4>
                  <span className="status-tag">In Storage</span>
                </div>
                <div className="vehicle-details">
                  <p><strong>VIN:</strong> 12345678</p>
                  <p><strong>LP:</strong> PAPER</p>
                  <p><strong>Impounded:</strong> Jul 11, 2025, 7:00 PM</p>
                  <p><strong>Days in Storage:</strong> 26</p>
                  <p><strong>Towed From:</strong> 2200 EAST DAVIS</p>
                  <p><strong>Owner:</strong> Unknown</p>
                </div>
                
                <div className="tdlr-notifications">
                  <h5>TDLR Notification Status</h5>
                  <div className="notification-item complete">
                    <span className="check-icon">✓</span>
                    <span>First Notification Sent: Jul 12, 2025</span>
                  </div>
                  <div className="notification-item complete">
                    <span className="check-icon">✓</span>
                    <span>Police Notification Sent: Jul 21, 2025</span>
                  </div>
                  <div className="notification-item urgent">
                    <span className="alert-icon">!</span>
                    <span>Second Notification Due</span>
                    <button className="notification-button">Mark Sent</button>
                  </div>
                  <div className="notification-item pending">
                    <span className="clock-icon">⏱</span>
                    <span>Sale Date: Sep 11, 2025 (34 days)</span>
                  </div>
                </div>
                
                <div className="card-actions">
                  <button className="icon-button">⋮</button>
                </div>
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

      case 'library':
        return (
          <div className="feature-detail">
            <div className="feature-header">
              <h3>Resource Library</h3>
              <button className="create-button" onClick={handleCreateNew}>
                <span>+</span> Add Resource
              </button>
            </div>
            
            <div className="resource-section">
              <h4>TDLR Resources</h4>
              <div className="resource-links">
                <a 
                  href="https://www.tdlr.texas.gov/towing/towinglaw.htm" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="resource-link"
                >
                  <div className="resource-icon">📜</div>
                  <div className="resource-info">
                    <h5>TDLR Towing Rules and Regulations</h5>
                    <p>Official Texas Department of Licensing and Regulation towing rules</p>
                  </div>
                </a>
                
                <a 
                  href="https://www.tdlr.texas.gov/towing/towing.htm" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="resource-link"
                >
                  <div className="resource-icon">📋</div>
                  <div className="resource-info">
                    <h5>TDLR Towing Program</h5>
                    <p>Information about the TDLR Towing Program and requirements</p>
                  </div>
                </a>
                
                <a 
                  href="https://www.tdlr.texas.gov/towing/forms/TowingFacility.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="resource-link"
                >
                  <div className="resource-icon">📝</div>
                  <div className="resource-info">
                    <h5>TDLR Towing Company License Application</h5>
                    <p>Form for towing company license applications</p>
                  </div>
                </a>
              </div>
            </div>
            
            <div className="resource-section">
              <h4>Company Resources</h4>
              <div className="resource-cards">
                <div className="resource-card">
                  <h5>Employee Handbook</h5>
                  <p>Complete employee handbook with policies and procedures</p>
                  <div className="resource-actions">
                    <button className="action-button">View</button>
                    <button className="action-button">Download</button>
                  </div>
                </div>
                
                <div className="resource-card">
                  <h5>Training Materials</h5>
                  <p>Training guides and documentation for new employees</p>
                  <div className="resource-actions">
                    <button className="action-button">View</button>
                    <button className="action-button">Download</button>
                  </div>
                </div>
                
                <div className="resource-card">
                  <h5>Safety Guidelines</h5>
                  <p>Safety procedures and protocols for towing operations</p>
                  <div className="resource-actions">
                    <button className="action-button">View</button>
                    <button className="action-button">Download</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      // For all other features - This is the important part that ensures ALL features have a create button
      default:
        return (
          <div className="feature-
