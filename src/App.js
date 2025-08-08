import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import './App.css';
import './features.css';

// Initialize Supabase client
const supabaseUrl = 'https://odxwjyuamvgccpesykts.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9keHdqeXVhbXZnY2NwZXN5a3RzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0Mjk4MTQsImV4cCI6MjA3MDAwNTgxNH0.BnzEn6Ep40ysR0hRcuYeY61Rlxohd2YDIvuHbQvDeAc';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Global admin credentials - typically these would be stored in a secure environment variable
// For demo purposes only - in production you'd use proper authentication
const ADMIN_EMAIL = 'admin@texastowing.com';
const ADMIN_PASSWORD = 'adminpass123';

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isGlobalAdmin, setIsGlobalAdmin] = useState(false);
  const [modalType, setModalType] = useState('create'); // 'create' or 'view'
  const [selectedItem, setSelectedItem] = useState(null);
  
  // References for Google Maps
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  
  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      // Check if global admin
      if (session && session.user.email === ADMIN_EMAIL) {
        setIsGlobalAdmin(true);
      }
      setLoading(false);
    });
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        // Check if global admin
        if (session && session.user.email === ADMIN_EMAIL) {
          setIsGlobalAdmin(true);
        } else {
          setIsGlobalAdmin(false);
        }
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
    
    // Check if global admin login attempt
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // Simulate session for global admin
      const adminSession = {
        user: {
          email: ADMIN_EMAIL,
          role: 'admin',
          id: 'global-admin'
        },
        access_token: 'simulated-admin-token'
      };
      
      setSession(adminSession);
      setIsGlobalAdmin(true);
      return;
    }
    
    // Regular user login via Supabase
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
    if (isGlobalAdmin) {
      // Clear simulated admin session
      setSession(null);
      setIsGlobalAdmin(false);
    } else {
      // Regular sign out via Supabase
      await supabase.auth.signOut();
    }
  };
  
  const handleFeatureClick = (feature) => {
    setSelectedFeature(feature);
  };

  const handleBackToDashboard = () => {
    setSelectedFeature(null);
    mapInstanceRef.current = null;
  };
  
  const handleCreateNew = () => {
    setModalType('create');
    setSelectedItem(null);
    setShowCreateModal(true);
  };
  
  const handleViewItem = (item) => {
    setModalType('view');
    setSelectedItem(item);
    setShowCreateModal(true);
  };
  
  const handleCloseModal = () => {
    setShowCreateModal(false);
    setSelectedItem(null);
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
    const [formData, setFormData] = useState(selectedItem || {});
    
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
      alert(modalType === 'create' ? "New record created successfully!" : "Record updated successfully!");
      handleCloseModal();
    };
    
    // Get modal title based on feature and mode
    const getModalTitle = () => {
      const action = modalType === 'create' ? 'Create New' : 'View/Edit';
      return `${action} ${getFeatureTitle(selectedFeature)}`;
    };
    
    // Render different forms based on the selected feature
    const renderForm = () => {
      // For view mode, we'll display the existing data
      // For create mode, we'll show empty forms
      
      switch(selectedFeature) {
        case 'dispatch':
          return (
            <>
              <div className="form-row">
                <div className="form-group">
                  <label>Customer Name</label>
                  <input type="text" name="customerName" value={formData.customerName || ''} onChange={handleInputChange} placeholder="Enter customer name" required />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input type="tel" name="phone" value={formData.phone || ''} onChange={handleInputChange} placeholder="Phone number" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Location</label>
                  <input type="text" name="location" value={formData.location || ''} onChange={handleInputChange} placeholder="Service location" required />
                </div>
                <div className="form-group">
                  <label>Service Type</label>
                  <select name="serviceType" value={formData.serviceType || ''} onChange={handleInputChange} required>
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
                  <label>Assign Driver</label>
                  <select name="driver" value={formData.driver || ''} onChange={handleInputChange}>
                    <option value="">Select driver</option>
                    <option value="carlos">Carlos Martinez</option>
                    <option value="james">James Wilson</option>
                    <option value="robert">Robert Lee</option>
                    <option value="mike">Mike Johnson</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Priority</label>
                  <select name="priority" value={formData.priority || ''} onChange={handleInputChange}>
                    <option value="">Select priority</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="emergency">Emergency</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group wide">
                  <label>Notes</label>
                  <textarea name="notes" value={formData.notes || ''} onChange={handleInputChange} placeholder="Additional information"></textarea>
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
                  <input type="text" name="customerName" value={formData.customerName || ''} onChange={handleInputChange} placeholder="Enter customer name" required />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input type="tel" name="phone" value={formData.phone || ''} onChange={handleInputChange} placeholder="Phone number" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Location</label>
                  <input type="text" name="location" value={formData.location || ''} onChange={handleInputChange} placeholder="Service location" required />
                </div>
                <div className="form-group">
                  <label>Service Requested</label>
                  <select name="serviceType" value={formData.serviceType || ''} onChange={handleInputChange} required>
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
                  <input type="text" name="vehicleModel" value={formData.vehicleModel || ''} onChange={handleInputChange} placeholder="e.g. Toyota Camry" required />
                </div>
                <div className="form-group">
                  <label>Vehicle Color</label>
                  <input type="text" name="vehicleColor" value={formData.vehicleColor || ''} onChange={handleInputChange} placeholder="e.g. Red" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Estimated Time of Arrival</label>
                  <input type="time" name="eta" value={formData.eta || ''} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>Call Status</label>
                  <select name="status" value={formData.status || ''} onChange={handleInputChange}>
                    <option value="">Select status</option>
                    <option value="pending">Pending</option>
                    <option value="assigned">Assigned</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group wide">
                  <label>Notes</label>
                  <textarea name="notes" value={formData.notes || ''} onChange={handleInputChange} placeholder="Additional information"></textarea>
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
                  <input type="text" name="vehicleModel" value={formData.vehicleModel || ''} onChange={handleInputChange} placeholder="e.g. Toyota Camry" required />
                </div>
                <div className="form-group">
                  <label>Year</label>
                  <input type="number" name="vehicleYear" value={formData.vehicleYear || ''} onChange={handleInputChange} placeholder="Vehicle year" required />
                </div>
                <div className="form-group">
                  <label>Color</label>
                  <input type="text" name="vehicleColor" value={formData.vehicleColor || ''} onChange={handleInputChange} placeholder="Vehicle color" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>License Plate</label>
                  <input type="text" name="licensePlate" value={formData.licensePlate || ''} onChange={handleInputChange} placeholder="License plate number" required />
                </div>
                <div className="form-group">
                  <label>State</label>
                  <input type="text" name="state" value={formData.state || ''} onChange={handleInputChange} placeholder="License plate state" required />
                </div>
                <div className="form-group">
                  <label>VIN</label>
                  <input type="text" name="vin" value={formData.vin || ''} onChange={handleInputChange} placeholder="Vehicle identification number" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Reason for Impound</label>
                  <select name="reason" value={formData.reason || ''} onChange={handleInputChange} required>
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
                  <select name="lot" value={formData.lot || ''} onChange={handleInputChange} required>
                    <option value="">Select lot</option>
                    <option value="A">Lot A</option>
                    <option value="B">Lot B</option>
                    <option value="C">Lot C</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Lot Space</label>
                  <input type="text" name="lotSpace" value={formData.lotSpace || ''} onChange={handleInputChange} placeholder="Specific space number" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Impound Date</label>
                  <input type="date" name="impoundDate" value={formData.impoundDate || ''} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <label>Impound Officer</label>
                  <input type="text" name="impoundOfficer" value={formData.impoundOfficer || ''} onChange={handleInputChange} placeholder="Name of impounding officer" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group wide">
                  <label>Notes</label>
                  <textarea name="notes" value={formData.notes || ''} onChange={handleInputChange} placeholder="Additional information"></textarea>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group wide">
                  <label>Upload Photos</label>
                  <input type="file" multiple />
                </div>
              </div>
            </>
          );
          
        case 'billing':
          return (
            <>
              <div className="form-row">
                <div className="form-group">
                  <label>Customer Name</label>
                  <input type="text" name="customerName" value={formData.customerName || ''} onChange={handleInputChange} placeholder="Enter customer name" required />
                </div>
                <div className="form-group">
                  <label>Customer Email</label>
                  <input type="email" name="email" value={formData.email || ''} onChange={handleInputChange} placeholder="Email address" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Service Date</label>
                  <input type="date" name="serviceDate" value={formData.serviceDate || ''} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <label>Service Type</label>
                  <select name="serviceType" value={formData.serviceType || ''} onChange={handleInputChange} required>
                    <option value="">Select service type</option>
                    <option value="towing">Towing</option>
                    <option value="recovery">Vehicle Recovery</option>
                    <option value="roadside">Roadside Assistance</option>
                    <option value="flatbed">Flatbed Transport</option>
                    <option value="storage">Storage Fees</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Amount ($)</label>
                  <input type="number" name="amount" value={formData.amount || ''} onChange={handleInputChange} placeholder="Invoice amount" required step="0.01" />
                </div>
                <div className="form-group">
                  <label>Due Date</label>
                  <input type="date" name="dueDate" value={formData.dueDate || ''} onChange={handleInputChange} required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Payment Status</label>
                  <select name="paymentStatus" value={formData.paymentStatus || ''} onChange={handleInputChange}>
                    <option value="">Select status</option>
                    <option value="unpaid">Unpaid</option>
                    <option value="partial">Partially Paid</option>
                    <option value="paid">Paid</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Payment Method</label>
                  <select name="paymentMethod" value={formData.paymentMethod || ''} onChange={handleInputChange}>
                    <option value="">Select method</option>
                    <option value="cash">Cash</option>
                    <option value="credit">Credit Card</option>
                    <option value="check">Check</option>
                    <option value="invoice">Invoice</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group wide">
                  <label>Invoice Notes</label>
                  <textarea name="notes" value={formData.notes || ''} onChange={handleInputChange} placeholder="Additional information"></textarea>
                </div>
              </div>
            </>
          );
          
        case 'livemap':
          return (
            <>
              <div className="form-row">
                <div className="form-group">
                  <label>Driver Name</label>
                  <input type="text" name="driverName" value={formData.driverName || ''} onChange={handleInputChange} placeholder="Driver's full name" required />
                </div>
                <div className="form-group">
                  <label>Vehicle ID</label>
                  <select name="vehicleId" value={formData.vehicleId || ''} onChange={handleInputChange} required>
                    <option value="">Select vehicle</option>
                    <option value="flatbed1">Flatbed #1</option>
                    <option value="flatbed2">Flatbed #2</option>
                    <option value="flatbed3">Flatbed #3</option>
                    <option value="wrecker1">Wrecker #1</option>
                    <option value="wrecker2">Wrecker #2</option>
                    <option value="wrecker3">Wrecker #3</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="tel" name="phone" value={formData.phone || ''} onChange={handleInputChange} placeholder="Driver's phone number" required />
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select name="status" value={formData.status || ''} onChange={handleInputChange} required>
                    <option value="">Select status</option>
                    <option value="available">Available</option>
                    <option value="busy">Busy</option>
                    <option value="offline">Offline</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Current Location (Latitude)</label>
                  <input type="number" step="0.000001" name="latitude" value={formData.latitude || ''} onChange={handleInputChange} placeholder="Latitude" />
                </div>
                <div className="form-group">
                  <label>Current Location (Longitude)</label>
                  <input type="number" step="0.000001" name="longitude" value={formData.longitude || ''} onChange={handleInputChange} placeholder="Longitude" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group wide">
                  <label>Notes</label>
                  <textarea name="notes" value={formData.notes || ''} onChange={handleInputChange} placeholder="Additional information"></textarea>
                </div>
              </div>
            </>
          );
          
        case 'equipment':
          return (
            <>
              <div className="form-row">
                <div className="form-group">
                  <label>Equipment Name</label>
                  <input type="text" name="equipmentName" value={formData.equipmentName || ''} onChange={handleInputChange} placeholder="Name of equipment" required />
                </div>
                <div className="form-group">
                  <label>Equipment Type</label>
                  <select name="equipmentType" value={formData.equipmentType || ''} onChange={handleInputChange} required>
                    <option value="">Select type</option>
                    <option value="towing">Towing Equipment</option>
                    <option value="vehicle">Vehicle Accessories</option>
                    <option value="electronic">Electronic Devices</option>
                    <option value="safety">Safety Equipment</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Serial Number</label>
                  <input type="text" name="serialNumber" value={formData.serialNumber || ''} onChange={handleInputChange} placeholder="Equipment serial number" />
                </div>
                <div className="form-group">
                  <label>Purchase Date</label>
                  <input type="date" name="purchaseDate" value={formData.purchaseDate || ''} onChange={handleInputChange} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Status</label>
                  <select name="status" value={formData.status || ''} onChange={handleInputChange} required>
                    <option value="">Select status</option>
                    <option value="available">Available</option>
                    <option value="in-use">In Use</option>
                    <option value="maintenance">Under Maintenance</option>
                    <option value="repair">In Repair</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Current Location</label>
                  <input type="text" name="location" value={formData.location || ''} onChange={handleInputChange} placeholder="Where is the equipment now" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Assigned To</label>
                  <select name="assignedTo" value={formData.assignedTo || ''} onChange={handleInputChange}>
                    <option value="">Not assigned</option>
                    <option value="carlos">Carlos Martinez</option>
                    <option value="james">James Wilson</option>
                    <option value="robert">Robert Lee</option>
                    <option value="mike">Mike Johnson</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Expected Return</label>
                  <input type="datetime-local" name="expectedReturn" value={formData.expectedReturn || ''} onChange={handleInputChange} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group wide">
                  <label>Notes</label>
                  <textarea name="notes" value={formData.notes || ''} onChange={handleInputChange} placeholder="Additional information"></textarea>
                </div>
              </div>
            </>
          );
          
        case 'inspections':
          return (
            <>
              <div className="form-row">
                <div className="form-group">
                  <label>Vehicle ID</label>
                  <select name="vehicleId" value={formData.vehicleId || ''} onChange={handleInputChange} required>
                    <option value="">Select vehicle</option>
                    <option value="flatbed1">Flatbed #1</option>
                    <option value="flatbed2">Flatbed #2</option>
                    <option value="flatbed3">Flatbed #3</option>
                    <option value="wrecker1">Wrecker #1</option>
                    <option value="wrecker2">Wrecker #2</option>
                    <option value="wrecker3">Wrecker #3</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Inspector Name</label>
                  <input type="text" name="inspectorName" value={formData.inspectorName || ''} onChange={handleInputChange} placeholder="Full name of inspector" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Inspection Date</label>
                  <input type="date" name="inspectionDate" value={formData.inspectionDate || ''} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <label>Inspection Time</label>
                  <input type="time" name="inspectionTime" value={formData.inspectionTime || ''} onChange={handleInputChange} required />
                </div>
              </div>
              <div className="form-section">
                <h5>Safety Checklist</h5>
                <div className="form-row">
                  <div className="form-group">
                    <label>Brakes</label>
                    <select name="brakes" value={formData.brakes || ''} onChange={handleInputChange} required>
                      <option value="">Select status</option>
                      <option value="pass">Pass</option>
                      <option value="fail">Fail</option>
                      <option value="na">N/A</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Lights</label>
                    <select name="lights" value={formData.lights || ''} onChange={handleInputChange} required>
                      <option value="">Select status</option>
                      <option value="pass">Pass</option>
                      <option value="fail">Fail</option>
                      <option value="na">N/A</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Tires</label>
                    <select name="tires" value={formData.tires || ''} onChange={handleInputChange} required>
                      <option value="">Select status</option>
                      <option value="pass">Pass</option>
                      <option value="fail">Fail</option>
                      <option value="na">N/A</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Fluid Levels</label>
                    <select name="fluids" value={formData.fluids || ''} onChange={handleInputChange} required>
                      <option value="">Select status</option>
                      <option value="pass">Pass</option>
                      <option value="fail">Fail</option>
                      <option value="na">N/A</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Winch & Controls</label>
                    <select name="winch" value={formData.winch || ''} onChange={handleInputChange} required>
                      <option value="">Select status</option>
                      <option value="pass">Pass</option>
                      <option value="fail">Fail</option>
                      <option value="na">N/A</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Safety Equipment</label>
                    <select name="safety" value={formData.safety || ''} onChange={handleInputChange} required>
                      <option value="">Select status</option>
                      <option value="pass">Pass</option>
                      <option value="fail">Fail</option>
                      <option value="na">N/A</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Overall Result</label>
                  <select name="overallResult" value={formData.overallResult || ''} onChange={handleInputChange} required>
                    <option value="">Select result</option>
                    <option value="pass">Pass</option>
                    <option value="fail">Fail - Requires Immediate Attention</option>
                    <option value="minor">Pass with Minor Issues</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Odometer Reading</label>
                  <input type="number" name="odometer" value={formData.odometer || ''} onChange={handleInputChange} placeholder="Current mileage" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group wide">
                  <label>Issues Found</label>
                  <textarea name="issues" value={formData.issues || ''} onChange={handleInputChange} placeholder="Describe any issues found during inspection"></textarea>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group wide">
                  <label>Recommendations</label>
                  <textarea name="recommendations" value={formData.recommendations || ''} onChange={handleInputChange} placeholder="Maintenance recommendations"></textarea>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group wide">
                  <label>Upload Photos</label>
                  <input type="file" multiple />
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
                  <input type="text" name="title" value={formData.title || ''} onChange={handleInputChange} placeholder="Title of the handbook section" required />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select name="category" value={formData.category || ''} onChange={handleInputChange} required>
                    <option value="">Select category</option>
                    <option value="safety">General Safety</option>
                    <option value="vehicle">Vehicle Operation</option>
                    <option value="towing">Towing Procedures</option>
                    <option value="customer">Customer Interaction</option>
                    <option value="emergency">Emergency Procedures</option>
                    <option value="compliance">Regulatory Compliance</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Priority</label>
                  <select name="priority" value={formData.priority || ''} onChange={handleInputChange}>
                    <option value="">Select priority</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Last Updated</label>
                  <input type="date" name="lastUpdated" value={formData.lastUpdated || ''} onChange={handleInputChange} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group wide">
                  <label>Content</label>
                  <textarea name="content" value={formData.content || ''} onChange={handleInputChange} rows="10" placeholder="Enter the content for this handbook section" required></textarea>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group wide">
                  <label>Attachments</label>
                  <input type="file" multiple />
                </div>
              </div>
            </>
          );
          
        case 'incidentreports':
          return (
            <>
              <div className="form-row">
                <div className="form-group">
                  <label>Incident Type</label>
                  <select name="incidentType" value={formData.incidentType || ''} onChange={handleInputChange} required>
                    <option value="">Select Type</option>
                    <option value="property-damage">Property Damage</option>
                    <option value="vehicle-damage">Vehicle Damage</option>
                    <option value="personal-injury">Personal Injury</option>
                    <option value="near-miss">Near Miss</option>
                    <option value="customer-complaint">Customer Complaint</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Date & Time</label>
                  <input type="datetime-local" name="incidentDateTime" value={formData.incidentDateTime || ''} onChange={handleInputChange} required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Reporter Name</label>
                  <input type="text" name="reporterName" value={formData.reporterName || ''} onChange={handleInputChange} placeholder="Name of person reporting incident" required />
                </div>
                <div className="form-group">
                  <label>Reporter Role</label>
                  <select name="reporterRole" value={formData.reporterRole || ''} onChange={handleInputChange} required>
                    <option value="">Select role</option>
                    <option value="driver">Driver</option>
                    <option value="dispatcher">Dispatcher</option>
                    <option value="manager">Manager</option>
                    <option value="customer">Customer</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Location</label>
                  <input type="text" name="location" value={formData.location || ''} onChange={handleInputChange} placeholder="Address or GPS coordinates" required />
                </div>
                <div className="form-group">
                  <label>Severity</label>
                  <select name="severity" value={formData.severity || ''} onChange={handleInputChange} required>
                    <option value="">Select Severity</option>
                    <option value="minor">Minor</option>
                    <option value="medium">Medium</option>
                    <option value="major">Major</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group wide">
                  <label>Description</label>
                  <textarea name="description" value={formData.description || ''} onChange={handleInputChange} rows="4" placeholder="Describe what happened in detail" required></textarea>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group wide">
                  <label>Action Taken</label>
                  <textarea name="actionTaken" value={formData.actionTaken || ''} onChange={handleInputChange} placeholder="Describe any immediate actions taken"></textarea>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Vehicles Involved</label>
                  <select name="vehicles" value={formData.vehicles || ''} onChange={handleInputChange} multiple>
                    <option value="flatbed1">Flatbed #1</option>
                    <option value="flatbed2">Flatbed #2</option>
                    <option value="flatbed3">Flatbed #3</option>
                    <option value="wrecker1">Wrecker #1</option>
                    <option value="wrecker2">Wrecker #2</option>
                    <option value="wrecker3">Wrecker #3</option>
                    <option value="customer">Customer Vehicle</option>
                    <option value="thirdparty">Third Party Vehicle</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Personnel Involved</label>
                  <select name="personnel" value={formData.personnel || ''} onChange={handleInputChange} multiple>
                    <option value="carlos">Carlos Martinez</option>
                    <option value="james">James Wilson</option>
                    <option value="robert">Robert Lee</option>
                    <option value="mike">Mike Johnson</option>
                    <option value="customer">Customer</option>
                    <option value="thirdparty">Third Party</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group wide">
                  <label>Attach Photos/Files</label>
                  <input type="file" multiple />
                </div>
              </div>
            </>
          );
          
        case 'inventory':
          return (
            <>
              <div className="form-row">
                <div className="form-group">
                  <label>Vehicle Type</label>
                  <select name="vehicleType" value={formData.vehicleType || ''} onChange={handleInputChange} required>
                    <option value="">Select Type</option>
                    <option value="flatbed">Flatbed</option>
                    <option value="wrecker">Wrecker</option>
                    <option value="service">Service Truck</option>
                    <option value="support">Support Vehicle</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Vehicle ID</label>
                  <input type="text" name="vehicleId" value={formData.vehicleId || ''} onChange={handleInputChange} placeholder="Unique identifier" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Make</label>
                  <input type="text" name="make" value={formData.make || ''} onChange={handleInputChange} placeholder="e.g. Ford" required />
                </div>
                <div className="form-group">
                  <label>Model</label>
                  <input type="text" name="model" value={formData.model || ''} onChange={handleInputChange} placeholder="e.g. F-450" required />
                </div>
                <div className="form-group">
                  <label>Year</label>
                  <input type="number" name="year" value={formData.year || ''} onChange={handleInputChange} placeholder="Vehicle year" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>VIN</label>
                  <input type="text" name="vin" value={formData.vin || ''} onChange={handleInputChange} placeholder="Vehicle identification number" required />
                </div>
                <div className="form-group">
                  <label>License Plate</label>
                  <input type="text" name="licensePlate" value={formData.licensePlate || ''} onChange={handleInputChange} placeholder="License plate number" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Current Mileage</label>
                  <input type="number" name="mileage" value={formData.mileage || ''} onChange={handleInputChange} placeholder="Current odometer reading" />
                </div>
                <div className="form-group">
                  <label>Towing Capacity (lbs)</label>
                  <input type="number" name="towingCapacity" value={formData.towingCapacity || ''} onChange={handleInputChange} placeholder="Maximum towing capacity" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Assigned Driver</label>
                  <select name="assignedDriver" value={formData.assignedDriver || ''} onChange={handleInputChange}>
                    <option value="">Not assigned</option>
                    <option value="carlos">Carlos Martinez</option>
                    <option value="james">James Wilson</option>
                    <option value="robert">Robert Lee</option>
                    <option value="mike">Mike Johnson</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select name="status" value={formData.status || ''} onChange={handleInputChange} required>
                    <option value="">Select status</option>
                    <option value="active">Active</option>
                    <option value="maintenance">In Maintenance</option>
                    <option value="repair">In Repair</option>
                    <option value="outofservice">Out of Service</option>
                    <option value="retired">Retired</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Last Service Date</label>
                  <input type="date" name="lastServiceDate" value={formData.lastServiceDate || ''} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>Next Service Due</label>
                  <input type="date" name="nextServiceDate" value={formData.nextServiceDate || ''} onChange={handleInputChange} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group wide">
                  <label>Equipment & Features</label>
                  <textarea name="equipment" value={formData.equipment || ''} onChange={handleInputChange} placeholder="List special equipment and features"></textarea>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group wide">
                  <label>Notes</label>
                  <textarea name="notes" value={formData.notes || ''} onChange={handleInputChange} placeholder="Additional information"></textarea>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group wide">
                  <label>Upload Vehicle Photo</label>
                  <input type="file" />
                </div>
              </div>
            </>
          );
          
        case 'privateproperty':
          return (
            <>
              <div className="form-section">
                <h5>Property Information</h5>
                <div className="form-row">
                  <div className="form-group">
                    <label>Property Name</label>
                    <input type="text" name="propertyName" value={formData.propertyName || ''} onChange={handleInputChange} placeholder="Apartment complex, business, etc." required />
                  </div>
                  <div className="form-group">
                    <label>Property Address</label>
                    <input type="text" name="propertyAddress" value={formData.propertyAddress || ''} onChange={handleInputChange} placeholder="Full address" required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Property Owner/Manager</label>
                    <input type="text" name="propertyManager" value={formData.propertyManager || ''} onChange={handleInputChange} placeholder="Full name" required />
                  </div>
                  <div className="form-group">
                    <label>Contact Phone</label>
                    <input type="tel" name="contactPhone" value={formData.contactPhone || ''} onChange={handleInputChange} placeholder="(___) ___-____" required />
                  </div>
                </div>
              </div>
              
              <div className="form-section">
                <h5>Vehicle Information</h5>
                <div className="form-row">
                  <div className="form-group">
                    <label>Make & Model</label>
                    <input type="text" name="vehicleModel" value={formData.vehicleModel || ''} onChange={handleInputChange} placeholder="Toyota Camry, etc." required />
                  </div>
                  <div className="form-group">
                    <label>Year</label>
                    <input type="text" name="vehicleYear" value={formData.vehicleYear || ''} onChange={handleInputChange} placeholder="Vehicle year" required />
                  </div>
                  <div className="form-group">
                    <label>Color</label>
                    <input type="text" name="vehicleColor" value={formData.vehicleColor || ''} onChange={handleInputChange} placeholder="Vehicle color" required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>License Plate</label>
                    <input type="text" name="licensePlate" value={formData.licensePlate || ''} onChange={handleInputChange} placeholder="License plate number" required />
                  </div>
                  <div className="form-group">
                    <label>State</label>
                    <input type="text" name="state" value={formData.state || ''} onChange={handleInputChange} placeholder="License plate state" required />
                  </div>
                  <div className="form-group">
                    <label>VIN</label>
                    <input type="text" name="vin" value={formData.vin || ''} onChange={handleInputChange} placeholder="Vehicle identification number" />
                  </div>
                </div>
              </div>
              
              <div className="form-section">
                <h5>Tow Information</h5>
                <div className="form-row">
                  <div className="form-group">
                    <label>Reason for Tow</label>
                    <select name="reason" value={formData.reason || ''} onChange={handleInputChange} required>
                      <option value="">Select Reason</option>
                      <option value="no-permit">No Permit/Unauthorized Parking</option>
                      <option value="fire-lane">Fire Lane Violation</option>
                      <option value="expired-permit">Expired Permit</option>
                      <option value="abandoned">Abandoned Vehicle</option>
                      <option value="blocking">Blocking Access</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Destination</label>
                    <select name="destination" value={formData.destination || ''} onChange={handleInputChange} required>
                      <option value="">Select Destination</option>
                      <option value="main">Main Impound Lot</option>
                      <option value="secondary">Secondary Storage Facility</option>
                      <option value="custom">Customer Specified Location</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Driver Assigned</label>
                    <select name="driver" value={formData.driver || ''} onChange={handleInputChange} required>
                      <option value="">Select Driver</option>
                      <option value="carlos">Carlos Martinez</option>
                      <option value="james">James Wilson</option>
                      <option value="robert">Robert Lee</option>
                      <option value="mike">Mike Johnson</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Tow Date/Time</label>
                    <input type="datetime-local" name="towDateTime" value={formData.towDateTime || ''} onChange={handleInputChange} required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group wide">
                    <label>Additional Notes</label>
                    <textarea name="notes" value={formData.notes || ''} onChange={handleInputChange} placeholder="Any special instructions or observations"></textarea>
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
                    <input type="text" name="authorizedName" value={formData.authorizedName || ''} onChange={handleInputChange} placeholder="Full name of authorizing person" required />
                  </div>
                  <div className="form-group">
                    <label>Title/Position</label>
                    <input type="text" name="authorizedTitle" value={formData.authorizedTitle || ''} onChange={handleInputChange} placeholder="Manager, Owner, etc." required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Date</label>
                    <input type="date" name="authorizationDate" value={formData.authorizationDate || ''} onChange={handleInputChange} required />
                  </div>
                  <div className="form-group">
                    <label>Electronic Signature</label>
                    <input type="text" name="signature" value={formData.signature || ''} onChange={handleInputChange} placeholder="Type full name to sign electronically" required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group wide">
                    <label>Upload Photos (before tow)</label>
                    <input type="file" multiple />
                  </div>
                </div>
              </div>
            </>
          );
          
        case 'damagerelease':
          return (
            <>
              <div className="form-section">
                <h5>Customer Information</h5>
                <div className="form-row">
                  <div className="form-group">
                    <label>Customer Name</label>
                    <input type="text" name="customerName" value={formData.customerName || ''} onChange={handleInputChange} placeholder="Full name" required />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input type="tel" name="phoneNumber" value={formData.phoneNumber || ''} onChange={handleInputChange} placeholder="(___) ___-____" required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" value={formData.email || ''} onChange={handleInputChange} placeholder="Email address" />
                  </div>
                  <div className="form-group">
                    <label>Driver's License</label>
                    <input type="text" name="driversLicense" value={formData.driversLicense || ''} onChange={handleInputChange} placeholder="Driver's license number" required />
                  </div>
                </div>
              </div>
              
              <div className="form-section">
                <h5>Vehicle Information</h5>
                <div className="form-row">
                  <div className="form-group">
                    <label>Make & Model</label>
                    <input type="text" name="vehicleModel" value={formData.vehicleModel || ''} onChange={handleInputChange} placeholder="Toyota Camry, etc." required />
                  </div>
                  <div className="form-group">
                    <label>Year</label>
                    <input type="text" name="vehicleYear" value={formData.vehicleYear || ''} onChange={handleInputChange} placeholder="Vehicle year" required />
                  </div>
                  <div className="form-group">
                    <label>Color</label>
                    <input type="text" name="vehicleColor" value={formData.vehicleColor || ''} onChange={handleInputChange} placeholder="Vehicle color" required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>License Plate</label>
                    <input type="text" name="licensePlate" value={formData.licensePlate || ''} onChange={handleInputChange} placeholder="License plate number" required />
                  </div>
                  <div className="form-group">
                    <label>VIN</label>
                    <input type="text" name="vin" value={formData.vin || ''} onChange={handleInputChange} placeholder="Vehicle identification number" required />
                  </div>
                </div>
              </div>
              
              <div className="form-section">
                <h5>Service Information</h5>
                <div className="form-row">
                  <div className="form-group">
                    <label>Service Date</label>
                    <input type="date" name="serviceDate" value={formData.serviceDate || ''} onChange={handleInputChange} required />
                  </div>
                  <div className="form-group">
                    <label>Service Type</label>
                    <select name="serviceType" value={formData.serviceType || ''} onChange={handleInputChange} required>
                      <option value="">Select Service Type</option>
                      <option value="towing">Towing</option>
                      <option value="roadside">Roadside Assistance</option>
                      <option value="recovery">Vehicle Recovery</option>
                      <option value="flatbed">Flatbed Transport</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Driver Name</label>
                    <input type="text" name="driverName" value={formData.driverName || ''} onChange={handleInputChange} placeholder="Name of driver who performed service" required />
                  </div>
                  <div className="form-group">
                    <label>Tow Truck ID</label>
                    <input type="text" name="towTruckId" value={formData.towTruckId || ''} onChange={handleInputChange} placeholder="Truck identification number" required />
                  </div>
                </div>
              </div>
              
              <div className="form-section">
                <h5>Pre-Existing Damage Documentation</h5>
                <div className="form-row">
                  <div className="form-group wide">
                    <label>Existing Damage Description</label>
                    <textarea name="existingDamage" value={formData.existingDamage || ''} onChange={handleInputChange} placeholder="Describe any pre-existing damage noted"></textarea>
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
