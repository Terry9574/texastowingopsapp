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
  const [showShareModal, setShowShareModal] = useState(false);
  
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
          role: 'admin',
          custom_role: 'admin',
          id: 'demo-user',
          full_name: email ? email.split('@')[0] : 'Demo User',
          company_name: 'Texas Towing Ops',
          primary_color: '#1e3a8a',
          logo_url: ''
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
    setSelectedFeature(null);
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

  const handleShareApp = () => {
    setShowShareModal(true);
  };

  const handleCloseShareModal = () => {
    setShowShareModal(false);
  };
  
  // Feature groupings from Base44
  const operationsGroup = [
    { title: "Dispatch System", url: "dispatch", icon: "📻", description: "Task info & assignments", color: "bg-slate-600", roles: ["admin", "owner", "truck_manager", "office_manager"] },
    { title: "Driver Calls", url: "drivercalls", icon: "📝", description: "Service records & completion", color: "bg-gray-600", roles: ["admin", "owner", "truck_manager", "office_manager", "driver"] },
    { title: "Impound Facility", url: "impound", icon: "🏢", description: "Vehicle impound and storage documentation", color: "bg-slate-700", roles: ["admin", "owner", "truck_manager", "office_manager", "driver"] },
    { title: "Customer Billing", url: "billing", icon: "💰", description: "Manage customers and track invoices", color: "bg-green-700", roles: ["admin", "owner", "office_manager"] },
    { title: "Driver Live Map", url: "livemap", icon: "🗺️", description: "See real-time driver locations", color: "bg-teal-600", roles: ["admin", "owner", "truck_manager", "office_manager"] }
  ];

  const complianceGroup = [
    { title: "Daily Inspections", url: "inspections", icon: "🔧", description: "Vehicle safety checks", color: "bg-orange-600", roles: ["admin", "owner", "truck_manager", "office_manager", "driver"] },
    { title: "Handbook", url: "handbook", icon: "📖", description: "Safety protocols & procedures", color: "bg-blue-600", roles: ["admin", "owner", "truck_manager", "office_manager", "driver"] },
    { title: "Incident Reports", url: "incidentreports", icon: "⚠️", description: "Report safety incidents", color: "bg-red-600", roles: ["admin", "owner", "truck_manager", "office_manager", "driver"] },
    { title: "Tow Truck Inventory", url: "inventory", icon: "🚚", description: "Manage tow trucks & equipment", color: "bg-blue-700", roles: ["admin", "owner", "truck_manager", "office_manager", "driver"] },
    { title: "Private Property", url: "privateproperty", icon: "📄", description: "Private property towing forms", color: "bg-purple-600", roles: ["admin", "owner", "truck_manager", "office_manager", "driver"] },
    { title: "Damage Release", url: "damagerelease", icon: "✓", description: "Manage damage release forms", color: "bg-emerald-600", roles: ["admin", "owner", "truck_manager", "office_manager", "driver"] }
  ];

  const trainingGroup = [
    { title: "Training Logs", url: "traininglogs", icon: "📅", description: "Track employee training", color: "bg-green-600", roles: ["admin", "owner", "truck_manager", "office_manager", "driver"] },
    { title: "Driver Compliance", url: "drivercompliance", icon: "✓", description: "Insurance/legal compliance", color: "bg-cyan-600", roles: ["admin", "owner", "office_manager"] },
    { title: "License Vault", url: "licensevault", icon: "🛡️", description: "Manage licenses & cards", color: "bg-purple-600", roles: ["admin", "owner", "office_manager"] }
  ];

  const financeGroup = [
    { title: "Driver Payroll Log", url: "driverpayroll", icon: "💵", description: "Track driver payment information", color: "bg-teal-600", roles: ["admin", "owner", "truck_manager", "office_manager", "driver"] },
    { title: "Customer Payment Portal", url: "payments", icon: "💳", description: "Process payments", color: "bg-green-600", roles: ["admin", "owner", "office_manager"] },
    { title: "Mileage & Fuel Log", url: "mileage", icon: "🔍", description: "Track vehicle mileage & fuel", color: "bg-indigo-600", roles: ["admin", "owner", "truck_manager", "office_manager", "driver"] },
    { title: "Credit Card Authorization Form", url: "ccauth", icon: "💳", description: "Payment authorization forms", color: "bg-indigo-600", roles: ["admin", "owner", "truck_manager", "office_manager", "driver"] }
  ];

  const adminToolsGroup = [
    { title: "Reports & Analytics", url: "reports", icon: "📊", description: "Comprehensive business analytics", color: "bg-purple-700", roles: ["admin", "owner"] },
    { title: "View All Submissions", url: "submissions", icon: "📋", description: "Review all form submissions", color: "bg-slate-600", roles: ["admin", "owner"] },
    { title: "Resource Library", url: "library", icon: "📚", description: "Training materials & docs", color: "bg-cyan-600", roles: ["admin", "owner", "truck_manager", "office_manager", "driver"] },
    { title: "Company Management", url: "companymanagement", icon: "🏢", description: "Manage company info", color: "bg-sky-700", roles: ["admin", "owner", "office_manager", "truck_manager"] },
    { title: "State Papers", url: "statepapers", icon: "📑", description: "Vehicle insurance & registration documents", color: "bg-indigo-700", roles: ["admin", "owner", "office_manager", "truck_manager", "driver"] }
  ];

  const communicationGroup = [
    { title: "Notifications", url: "notifications", icon: "🔔", description: "Important alerts", color: "bg-pink-600", roles: ["admin", "owner", "truck_manager", "office_manager", "driver"] },
    { title: "Customer Feedback", url: "feedback", icon: "⭐", description: "Review customer ratings", color: "bg-yellow-600", roles: ["admin", "owner", "truck_manager", "office_manager"] }
  ];

  const socialLinks = [
    { name: "Facebook", icon: "facebook", url: "https://www.facebook.com/profile.php?id=61566025746895" },
    { name: "X (Twitter)", icon: "twitter", url: "https://x.com/consulting9574" },
    { name: "Instagram", icon: "instagram", url: "https://www.instagram.com/lilt9574/" },
    { name: "TikTok", icon: "tiktok", url: "https://www.tiktok.com/@texastowman" },
    { name: "YouTube", icon: "youtube", url: "https://www.youtube.com/@consultingadvisorsoftexas" }
  ];
  
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

  // Share App Modal Component
  const ShareAppModal = () => {
    const [copySuccess, setCopySuccess] = useState('');
    const appUrl = window.location.href;
    
    const copyToClipboard = () => {
      navigator.clipboard.writeText(appUrl)
        .then(() => {
          setCopySuccess('Copied!');
          setTimeout(() => setCopySuccess(''), 2000);
        })
        .catch(err => {
          console.error('Failed to copy: ', err);
        });
    };
    
    return (
      <div className="modal-backdrop" onClick={handleCloseShareModal}>
        <div className="modal-content share-modal" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h3>Share This App</h3>
            <button className="close-button" onClick={handleCloseShareModal}>&times;</button>
          </div>
          
          <div className="modal-body">
            <p>Share this app with your colleagues and team members:</p>
            
            <div className="share-link-container">
              <input 
                type="text" 
                value={appUrl} 
                readOnly 
                className="share-link-input"
              />
              <button 
                onClick={copyToClipboard} 
                className="copy-button"
              >
                {copySuccess ? copySuccess : 'Copy'}
              </button>
            </div>
            
            <div className="social-share-buttons">
              <h4>Share via:</h4>
              <div className="social-buttons">
                {socialLinks.map(social => (
                  <button 
                    key={social.name}
                    className={`social-button ${social.icon}`}
                    onClick={() => {
                      let url;
                      switch(social.icon) {
                        case 'facebook':
                          url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(appUrl)}`;
                          break;
                        case 'twitter':
                          url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(appUrl)}&text=Check out this towing operations app!`;
                          break;
                        default:
                          url = social.url;
                      }
                      window.open(url, '_blank');
                    }}
                  >
                    {social.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Show loading indicator
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="text-lg font-medium text-slate-700">Loading, please wait...</span>
        </div>
      </div>
    );
  }

  // Base44 style feature section component
  const FeatureSection = ({ title, features, icon }) => {
    // Get user role from session
    const userRole = session?.user?.custom_role?.toLowerCase() || 'user';
    const isAdmin = userRole === 'admin' || session?.user?.role === 'admin';
    
    // Filter features based on user role
    const filteredFeatures = features.filter(feature => {
      if (isAdmin) return true;
      return feature.roles.includes(userRole);
    });
    
    if (filteredFeatures.length === 0) return null;
    
    return (
      <div className="space-y-4">
        <div className="bg-slate-100/80 backdrop-blur-sm rounded-lg px-4 py-3 border-l-4 border-blue-600 flex items-center gap-3">
          <span className="w-6 h-6 text-blue-700">{icon}</span>
          <h2 className="text-lg font-bold text-slate-800">{title}</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredFeatures.map((feature) => (
            <div 
              key={feature.title} 
              className="group h-full hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl overflow-hidden cursor-pointer"
              onClick={() => handleFeatureClick(feature.url)}
            >
              <div className="p-4 flex flex-col items-center text-center h-full justify-center">
                <div className={`mb-3 w-16 h-16 rounded-full ${feature.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <h3 className="text-sm font-semibold text-slate-800 mb-1 leading-tight">{feature.title}</h3>
                <p className="text-xs text-slate-500 flex-grow">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
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
        
      // For all other features - default view
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
        <>
          {!selectedFeature ? (
            // Base44 style dashboard
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
              <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
                {/* Header with company info */}
                <div
                  className="rounded-2xl p-6 md:p-8 text-white relative overflow-hidden shadow-2xl"
                  style={{ backgroundColor: session?.user?.primary_color || '#1e3a8a' }}
                >
                  <div className="absolute -bottom-10 -right-10 w-48 h-48 opacity-10">
                    <span className="text-7xl">🚚</span>
                  </div>
                  <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center gap-4">
                      {session?.user?.logo_url ? (
                        <img src={session.user.logo_url} alt={`${session.user.company_name} Logo`} className="h-16 w-16 object-contain bg-white/90 p-2 rounded-lg" />
                      ) : (
                        <div className="h-16 w-16 bg-white/90 p-2 rounded-lg flex items-center justify-center">
                          <span className="text-3xl">🚚</span>
                        </div>
                      )}
                      <div>
                        <h1 className="text-2xl md:text-3xl font-bold">{session?.user?.company_name || 'Texas Towing Ops'}</h1>
                        <p className="text-lg opacity-90">Professional Handbook & Operations</p>
                        <p className="text-sm opacity-75 mt-1">Version 1.0.0</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-black/20 backdrop-blur-sm rounded-full px-4 py-3">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="text-xl">👤</span>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{session?.user?.full_name || 'User'}</p>
                        <p className="text-sm opacity-80">{session?.user?.custom_role || 'Admin'}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Admin alert */}
                {(session?.user?.role === 'admin' || session?.user?.custom_role === 'admin') && (
                  <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-r-lg shadow-md" role="alert">
                    <p className="font-bold">🔑 Admin Access</p>
                    <p>You have full access to all features and settings.</p>
                  </div>
                )}
                
                {/* Feature Sections */}
                <FeatureSection title="🚚 Operations" features={operationsGroup} icon="🚚" />
                <FeatureSection title="📋 Compliance" features={complianceGroup} icon="📋" />
                <FeatureSection title="🎓 Training" features={trainingGroup} icon="🎓" />
                <FeatureSection title="🧾 Finance" features={financeGroup} icon="🧾" />
                <FeatureSection title="📁 Admin Tools" features={adminToolsGroup} icon="📁" />
                <FeatureSection title="📣 Communication" features={communicationGroup} icon="📣" />
                
                {/* Share app section */}
                <div className="space-y-6 text-center pt-6 border-t border-slate-200">
                  <div className="bg-slate-100/80 backdrop-blur-sm rounded-lg px-4 py-3 border-l-4 border-orange-500 inline-block">
                    <h2 className="text-lg font-bold text-slate-800">🚀 Get More From App</h2>
                  </div>
                  <div className="flex flex-wrap justify-center gap-4">
                    <button 
                      className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center"
                      onClick={handleShareApp}
                    >
                      <span className="mr-2">🔗</span> Share This App
                    </button>
                  </div>
                  <div className="flex justify-center gap-3">
                    {socialLinks.map(social => (
                      <button
                        key={social.name}
                        className="p-2 text-slate-500 hover:text-blue-600 hover:scale-110 transition-all duration-200"
                        onClick={() => window.open(social.url, '_blank')}
                      >
                        <span className="text-xl">
                          {social.icon === 'facebook' ? '👥' : 
                           social.icon === 'twitter' ? '🐦' : 
                           social.icon === 'instagram' ? '📷' : 
                           social.icon === 'youtube' ? '📺' : '🌐'}
                        </span>
                      </button>
                    ))}
                  
