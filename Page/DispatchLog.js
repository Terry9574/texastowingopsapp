import React, { useState } from 'react';

function DispatchLog() {
  // Sample dispatch data
  const [dispatches, setDispatches] = useState([
    {
      id: "D-5123",
      driverName: "Michael Johnson",
      vehicleNumber: "TT-101",
      status: "En Route",
      startTime: "2025-08-08 08:15:00",
      estimatedArrival: "2025-08-08 08:35:00",
      customerName: "James Wilson",
      serviceType: "Jump Start",
      location: "1234 Main St, Houston, TX",
      priority: "Normal",
      notes: "Customer waiting in vehicle",
      lastUpdated: "2025-08-08 08:17:32",
      latitude: 29.7604,
      longitude: -95.3698,
      ticketId: "T-10251"
    },
    {
      id: "D-5124",
      driverName: "Sarah Williams",
      vehicleNumber: "TT-102",
      status: "En Route",
      startTime: "2025-08-08 09:45:00",
      estimatedArrival: "2025-08-08 10:15:00",
      customerName: "Maria Garcia",
      serviceType: "Tow",
      location: "789 Oak Dr, Houston, TX",
      priority: "High",
      notes: "Vehicle disabled on busy road",
      lastUpdated: "2025-08-08 09:50:12",
      latitude: 29.7707,
      longitude: -95.3855,
      ticketId: "T-10252"
    },
    {
      id: "D-5125",
      driverName: "David Martinez",
      vehicleNumber: "TT-105",
      status: "Assigned",
      startTime: "2025-08-08 10:05:00",
      estimatedArrival: "2025-08-08 10:30:00",
      customerName: "Robert Brown",
      serviceType: "Tire Change",
      location: "456 Elm St, Houston, TX",
      priority: "Normal",
      notes: "Customer has spare tire ready",
      lastUpdated: "2025-08-08 10:05:00",
      latitude: 29.7604,
      longitude: -95.3698,
      ticketId: "T-10253"
    },
    {
      id: "D-5122",
      driverName: "Emily Rodriguez",
      vehicleNumber: "TT-107",
      status: "Completed",
      startTime: "2025-08-08 07:50:00",
      estimatedArrival: "2025-08-08 08:15:00",
      customerName: "Jennifer Davis",
      serviceType: "Tow",
      location: "Interstate 45 North, Mile Marker 35",
      priority: "Urgent",
      notes: "Vehicle towed to dealership successfully",
      lastUpdated: "2025-08-08 08:45:23",
      latitude: 29.8230,
      longitude: -95.4189,
      ticketId: "T-10254",
      completionTime: "2025-08-08 08:45:00",
      milesTowed: 12.5
    },
    {
      id: "D-5126",
      driverName: "James Taylor",
      vehicleNumber: "TT-103",
      status: "On Site",
      startTime: "2025-08-08 11:20:00",
      estimatedArrival: "2025-08-08 11:40:00",
      customerName: "Michael Thompson",
      serviceType: "Lockout",
      location: "987 Pine Rd, Houston, TX",
      priority: "High",
      notes: "Working on vehicle lockout, keys inside running vehicle",
      lastUpdated: "2025-08-08 11:42:15",
      latitude: 29.7830,
      longitude: -95.3901,
      ticketId: "T-10255"
    }
  ]);

  // Available drivers for dispatch
  const [availableDrivers, setAvailableDrivers] = useState([
    {
      name: "Michael Johnson",
      status: "En Route",
      vehicle: "TT-101",
      lastLocation: "Near Downtown",
      latitude: 29.7604,
      longitude: -95.3698,
      lastUpdated: "2025-08-08 08:17:32"
    },
    {
      name: "Sarah Williams",
      status: "En Route",
      vehicle: "TT-102",
      lastLocation: "Highway 59 South",
      latitude: 29.7707,
      longitude: -95.3855,
      lastUpdated: "2025-08-08 09:50:12"
    },
    {
      name: "David Martinez",
      status: "Assigned",
      vehicle: "TT-105",
      lastLocation: "Central Depot",
      latitude: 29.7520,
      longitude: -95.3573,
      lastUpdated: "2025-08-08 10:05:00"
    },
    {
      name: "Emily Rodriguez",
      status: "Available",
      vehicle: "TT-107",
      lastLocation: "North Service Center",
      latitude: 29.8230,
      longitude: -95.4189,
      lastUpdated: "2025-08-08 08:45:23"
    },
    {
      name: "James Taylor",
      status: "On Site",
      vehicle: "TT-103",
      lastLocation: "987 Pine Rd",
      latitude: 29.7830,
      longitude: -95.3901,
      lastUpdated: "2025-08-08 11:42:15"
    }
  ]);

  // Queue of pending calls awaiting dispatch
  const [dispatchQueue, setDispatchQueue] = useState([
    {
      ticketId: "T-10256",
      customerName: "Thomas Johnson",
      serviceType: "Fuel Delivery",
      location: "543 Westheimer Rd, Houston, TX",
      priority: "Normal",
      waitTime: "15 mins"
    },
    {
      ticketId: "T-10257",
      customerName: "Linda Martinez",
      serviceType: "Jump Start",
      location: "Houston Community College, Parking Lot C",
      priority: "Low",
      waitTime: "10 mins"
    },
    {
      ticketId: "T-10258",
      customerName: "Robert Garcia",
      serviceType: "Tow",
      location: "9876 Richmond Ave, Houston, TX",
      priority: "High",
      waitTime: "5 mins"
    }
  ]);

  const [newDispatch, setNewDispatch] = useState({
    driverName: "",
    vehicleNumber: "",
    customerName: "",
    serviceType: "",
    location: "",
    priority: "Normal",
    notes: "",
    ticketId: ""
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedDispatch, setSelectedDispatch] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [mapView, setMapView] = useState(false);

  // Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDispatch(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const dispatchId = `D-${5126 + Math.floor(Math.random() * 100)}`;
    const now = new Date();
    const formattedNow = formatTimestamp(now);
    
    // Estimate arrival time (20 mins from now)
    const arrivalTime = new Date(now.getTime() + 20 * 60000);
    const formattedArrival = formatTimestamp(arrivalTime);
    
    const newDispatchEntry = {
      id: dispatchId,
      driverName: newDispatch.driverName,
      vehicleNumber: newDispatch.vehicleNumber,
      status: "Assigned",
      startTime: formattedNow,
      estimatedArrival: formattedArrival,
      customerName: newDispatch.customerName,
      serviceType: newDispatch.serviceType,
      location: newDispatch.location,
      priority: newDispatch.priority,
      notes: newDispatch.notes,
      lastUpdated: formattedNow,
      ticketId: newDispatch.ticketId,
      // Default coordinates for Houston
      latitude: 29.7604,
      longitude: -95.3698
    };
    
    setDispatches([newDispatchEntry, ...dispatches]);
    
    // Update driver status
    const updatedDrivers = availableDrivers.map(driver => {
      if (driver.name === newDispatch.driverName) {
        return { ...driver, status: "Assigned" };
      }
      return driver;
    });
    
    setAvailableDrivers(updatedDrivers);
    
    // Remove from queue if from queue
    if (newDispatch.ticketId) {
      setDispatchQueue(dispatchQueue.filter(item => item.ticketId !== newDispatch.ticketId));
    }
    
    setNewDispatch({
      driverName: "",
      vehicleNumber: "",
      customerName: "",
      serviceType: "",
      location: "",
      priority: "Normal",
      notes: "",
      ticketId: ""
    });
    
    setIsFormVisible(false);
  };

  const updateDispatchStatus = (id, newStatus) => {
    const now = formatTimestamp(new Date());
    
    const updatedDispatches = dispatches.map(dispatch => {
      if (dispatch.id === id) {
        const updated = { 
          ...dispatch, 
          status: newStatus, 
          lastUpdated: now
        };
        
        if (newStatus === "Completed") {
          updated.completionTime = now;
        }
        
        return updated;
      }
      return dispatch;
    });
    
    setDispatches(updatedDispatches);
    
    // Also update driver status
    const dispatchItem = dispatches.find(d => d.id === id);
    if (dispatchItem) {
      const updatedDrivers = availableDrivers.map(driver => {
        if (driver.name === dispatchItem.driverName) {
          let status;
          switch(newStatus) {
            case "Assigned": status = "Assigned"; break;
            case "En Route": status = "En Route"; break;
            case "On Site": status = "On Site"; break;
            case "Completed": status = "Available"; break;
            default: status = driver.status;
          }
          
          return { ...driver, status, lastUpdated: now };
        }
        return driver;
      });
      
      setAvailableDrivers(updatedDrivers);
    }
  };

  // Filter dispatches by search term and status
  const filteredDispatches = dispatches.filter(dispatch => {
    const matchesSearch = 
      dispatch.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dispatch.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dispatch.ticketId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dispatch.location.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = statusFilter === "all" || dispatch.status.toLowerCase() === statusFilter.toLowerCase().replace(" ", "-");
    
    return matchesSearch && matchesStatus;
  });

  // Filter available drivers by search term
  const filteredDrivers = availableDrivers.filter(driver => 
    driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.lastLocation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Helper function to format timestamp
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "";
    
    // If already formatted, return as is
    if (typeof timestamp === 'string' && timestamp.includes("-") && timestamp.includes(":")) {
      return timestamp;
    }
    
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  // Calculate time difference in minutes
  const calculateTimeDifference = (start, end) => {
    if (!start || !end) return "";
    
    const startTime = new Date(start);
    const endTime = new Date(end);
    const diffMinutes = Math.round((endTime - startTime) / (1000 * 60));
    
    if (diffMinutes < 60) {
      return `${diffMinutes} mins`;
    } else {
      const hours = Math.floor(diffMinutes / 60);
      const mins = diffMinutes % 60;
      return `${hours}h ${mins}m`;
    }
  };

  // Handle assignment from queue
  const handleAssignFromQueue = (queueItem) => {
    // Find first available driver
    const availableDriver = availableDrivers.find(driver => driver.status === "Available");
    
    if (availableDriver) {
      setNewDispatch({
        driverName: availableDriver.name,
        vehicleNumber: availableDriver.vehicle,
        customerName: queueItem.customerName,
        serviceType: queueItem.serviceType,
        location: queueItem.location,
        priority: queueItem.priority,
        notes: "",
        ticketId: queueItem.ticketId
      });
      
      setIsFormVisible(true);
    } else {
      alert("No drivers currently available for dispatch.");
    }
  };

  // Sample data for dropdowns
  const serviceTypes = ["Tow", "Jump Start", "Tire Change", "Lockout", "Fuel Delivery", "Winching", "Battery Replacement"];
  const priorities = ["Low", "Normal", "High", "Urgent"];
  
  // Get counts by status
  const assignedCount = dispatches.filter(d => d.status === "Assigned").length;
  const enRouteCount = dispatches.filter(d => d.status === "En Route").length;
  const onSiteCount = dispatches.filter(d => d.status === "On Site").length;
  const completedCount = dispatches.filter(d => d.status === "Completed").length;
  
  // Calculate average response time
  const calculateAverageResponseTime = () => {
    const completedDispatches = dispatches.filter(d => d.status === "Completed" && d.startTime && d.completionTime);
    
    if (completedDispatches.length === 0) return "N/A";
    
    let totalMinutes = 0;
    
    completedDispatches.forEach(dispatch => {
      const startTime = new Date(dispatch.startTime);
      const completionTime = new Date(dispatch.completionTime);
      const diffMinutes = Math.round((completionTime - startTime) / (1000 * 60));
      totalMinutes += diffMinutes;
    });
    
    const avgMinutes = Math.round(totalMinutes / completedDispatches.length);
    
    if (avgMinutes < 60) {
      return `${avgMinutes} mins`;
    } else {
      const hours = Math.floor(avgMinutes / 60);
      const mins = avgMinutes % 60;
      return `${hours}h ${mins}m`;
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-wrap justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2 sm:mb-0">Dispatch System</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setMapView(!mapView)}
            className={`px-4 py-2 rounded-lg transition ${
              mapView ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            {mapView ? "List View" : "Map View"}
          </button>
          <button
            onClick={() => setIsFormVisible(!isFormVisible)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            {isFormVisible ? "Cancel" : "Create Dispatch"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-semibold text-gray-700">Active Dispatches</h3>
          <p className="text-2xl font-bold text-blue-600">{dispatches.filter(d => d.status !== "Completed").length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-semibold text-gray-700">Assigned</h3>
          <p className="text-2xl font-bold text-yellow-600">{assignedCount}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-semibold text-gray-700">En Route</h3>
          <p className="text-2xl font-bold text-indigo-600">{enRouteCount}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-semibold text-gray-700">On Site</h3>
          <p className="text-2xl font-bold text-purple-600">{onSiteCount}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-semibold text-gray-700">Avg Response Time</h3>
          <p className="text-2xl font-bold text-green-600">{calculateAverageResponseTime()}</p>
        </div>
      </div>

      {isFormVisible && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Create New Dispatch</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Driver</label>
                <select
                  name="driverName"
                  value={newDispatch.driverName}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select Driver</option>
                  {availableDrivers
                    .filter(driver => driver.status === "Available")
                    .map((driver, index) => (
                      <option key={index} value={driver.name}>{driver.name} ({driver.vehicle})</option>
                    ))
                  }
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Number</label>
                <input
                  type="text"
                  name="vehicleNumber"
                  value={newDispatch.vehicleNumber || (newDispatch.driverName ? 
                    availableDrivers.find(d => d.name === newDispatch.driverName)?.vehicle : "")}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                  readOnly
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ticket ID</label>
                <input
                  type="text"
                  name="ticketId"
                  value={newDispatch.ticketId}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="e.g. T-10259"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
                <input
                  type="text"
                  name="customerName"
                  value={newDispatch.customerName}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
                <select
                  name="serviceType"
                  value={newDispatch.serviceType}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select Service</option>
                  {serviceTypes.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select
                  name="priority"
                  value={newDispatch.priority}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  {priorities.map((priority, index) => (
                    <option key={index} value={priority}>{priority}</option>
                  ))}
                </select>
              </div>
              
              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  name="location"
                  value={newDispatch.location}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Full address or location description"
                  required
                />
              </div>
              
              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  name="notes"
                  value={newDispatch.notes}
                  onChange={handleInputChange}
                  rows="2"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Additional information for driver"
                ></textarea>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Create Dispatch
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Dispatch Queue */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-yellow-50 p-4 border-b border-yellow-100">
            <h2 className="font-semibold text-yellow-800">Dispatch Queue</h2>
            <p className="text-sm text-yellow-600">{dispatchQueue.length} calls awaiting dispatch</p>
          </div>
          
          {dispatchQueue.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {dispatchQueue.map((item, index) => (
                <li key={index} className="p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center mb-1">
                        <span className="font-medium text-gray-900">{item.ticketId}</span>
                        <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                          item.priority === 'Urgent' ? 'bg-red-100 text-red-800' : 
                          item.priority === 'High' ? 'bg-orange-100 text-orange-800' : 
                          item.priority === 'Low' ? 'bg-green-100 text-green-800' : 
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {item.priority}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{item.customerName}</p>
                      <p className="text-sm text-gray-500">{item.serviceType}</p>
                      <p className="text-xs text-gray-500 mt-1 truncate max-w-xs" title={item.location}>
                        📍 {item.location}
                      </p>
                      <p className="text-xs text-yellow-600 mt-1">
                        Waiting: {item.waitTime}
                      </p>
                    </div>
                    <button 
                      onClick={() => handleAssignFromQueue(item)}
                      className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                    >
                      Assign
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-8 text-center text-gray-500">
              No calls in queue
            </div>
          )}
        </div>

        {/* Active Drivers */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-blue-50 p-4 border-b border-blue-100">
            <h2 className="font-semibold text-blue-800">Driver Status</h2>
            <p className="text-sm text-blue-600">{availableDrivers.filter(d => d.status === "Available").length} drivers available</p>
          </div>
          
          <div className="p-2">
            <input
              type="text"
              placeholder="Search drivers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mb-2"
            />
          </div>
          
          <ul className="divide-y divide-gray-200">
            {filteredDrivers.map((driver, index) => (
              <li 
                key={index} 
                className="p-4 hover:bg-gray-50 cursor-pointer"
                onClick={() => setSelectedDriver(driver)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-gray-900">{driver.name}</div>
                    <div className="text-sm text-gray-500">Unit: {driver.vehicle}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      📍 {driver.lastLocation}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      Last update: {formatTimestamp(driver.lastUpdated).split(' ')[1]}
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    driver.status === 'Available' ? 'bg-green-100 text-green-800' : 
                    driver.status === 'Assigned' ? 'bg-yellow-100 text-yellow-800' :
                    driver.status === 'En Route' ? 'bg-blue-100 text-blue-800' :
                    driver.status === 'On Site' ? 'bg-purple-100 text-purple-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {driver.status}
                  </span>
                </div>
              </li>
            ))}
          </ul>
          
          {filteredDrivers.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No drivers found matching your search
            </div>
          )}
        </div>

        {/* Dispatch Map Placeholder */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gray-50 p-4 border-b">
            <h2 className="font-semibold text-gray-800">Live Dispatch Map</h2>
            <p className="text-sm text-gray-600">View driver locations in real-time</p>
          </div>
          <div className="bg-gray-100 h-96 flex items-center justify-center">
            <div className="text-center p-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              <p className="text-gray-600">Map integration coming soon!</p>
              <p className="text-sm text-gray-500 mt-2">Real-time driver tracking and routing</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center flex-wrap gap-2">
              <button 
                onClick={() => setStatusFilter("all")}
                className={`px-3 py-1 rounded-lg ${statusFilter === "all" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}`}
              >
                All
              </button>
              <button 
                onClick={() => setStatusFilter("assigned")}
                className={`px-3 py-1 rounded-lg ${statusFilter === "assigned" ? "bg-yellow-500 text-white" : "bg-gray-100 text-gray-700"}`}
              >
                Assigned
              </button>
              <button 
                onClick={() => setStatusFilter("en-route")}
                className={`px-3 py-1 rounded-lg ${statusFilter === "en-route" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700"}`}
              >
                En Route
              </button>
              <button 
                onClick={() => setStatusFilter("on-site")}
                className={`px-3 py-1 rounded-lg ${statusFilter === "on-site" ? "bg-purple-500 text-white" : "bg-gray-100 text-gray-700"}`}
              >
                On Site
              </button>
              <button 
                onClick={() => setStatusFilter("completed")}
                className={`px-3 py-1 rounded-lg ${statusFilter === "completed" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700"}`}
              >
                Completed
              </button>
            </div>
            
            <div className="w-full md:w-64">
              <input
                type="text"
                placeholder="Search dispatches..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID & Driver</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDispatches.map((dispatch) => (
                <tr key={dispatch.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{dispatch.id}</div>
                    <div className="text-sm text-gray-500">{dispatch.driverName}</div>
                    <div className="text-xs text-gray-500">{dispatch.vehicleNumber}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{dispatch.customerName}</div>
                    <div className="text-xs text-gray-500">Ticket: {dispatch.ticketId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{dispatch.serviceType}</div>
                    <div className={`text-xs ${
                      dispatch.priority === 'Urgent' ? 'text-red-600 font-semibold' : 
                      dispatch.priority === 'High' ? 'text-orange-600' : 
                      dispatch.priority === 'Low' ? 'text-green-600' : 
                      'text-blue-600'
                    }`}>
                      {dispatch.priority} Priority
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate" title={dispatch.location}>
                      {dispatch.location}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${dispatch.status === 'Assigned' ? 'bg-yellow-100 text-yellow-800' : ''}
                      ${dispatch.status === 'En Route' ? 'bg-blue-100 text-blue-800' : ''}
                      ${dispatch.status === 'On Site' ? 'bg-purple-100 text-purple-800' : ''}
                      ${dispatch.status === 'Completed' ? 'bg-green-100 text-green-800' : ''}
                      ${dispatch.status === 'Cancelled' ? 'bg-red-100 text-red-800' : ''}
                    `}>
                      {dispatch.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      Started: {formatTimestamp(dispatch.startTime).split(' ')[1]}
                    </div>
                    {dispatch.status === "Completed" && dispatch.completionTime && (
                      <div className="text-xs text-gray-500">
                        Total: {calculateTimeDifference(dispatch.startTime, dispatch.completionTime)}
                      </div>
                    )}
                    {dispatch.status !== "Completed" && dispatch.estimatedArrival && (
                      <div className="text-xs text-gray-500">
                        ETA: {formatTimestamp(dispatch.estimatedArrival).split(' ')[1]}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {dispatch.status !== "Completed" && (
                      <div className="flex flex-col space-y-1">
                        {dispatch.status === "Assigned" && (
                          <button 
                            onClick={() => updateDispatchStatus(dispatch.id, "En Route")}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            → En Route
                          </button>
                        )}
                        {dispatch.status === "En Route" && (
                          <button 
                            onClick={() => updateDispatchStatus(dispatch.id, "On Site")}
                            className="text-purple-600 hover:text-purple-900"
                          >
                            → On Site
                          </button>
                        )}
                        {dispatch.status === "On Site" && (
                          <button 
                            onClick={() => updateDispatchStatus(dispatch.id, "Completed")}
                            className="text-green-600 hover:text-green-900"
                          >
                            → Complete
                          </button>
                        )}
                        <button 
                          onClick={() => setSelectedDispatch(dispatch)}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          Details
                        </button>
                      </div>
                    )}
                    {dispatch.status === "Completed" && (
                      <button 
                        onClick={() => setSelectedDispatch(dispatch)}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        View Details
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredDispatches.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            No dispatches found matching your criteria.
          </div>
        )}
      </div>
      
      {/* Dispatch Details Modal */}
      {selectedDispatch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">
                  Dispatch Details: {selectedDispatch.id}
                </h2>
                <button 
                  onClick={() => setSelectedDispatch(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold
                    ${selectedDispatch.status === 'Assigned' ? 'bg-yellow-100 text-yellow-800' : ''}
                    ${selectedDispatch.status === 'En Route' ? 'bg-blue-100 text-blue-800' : ''}
                    ${selectedDispatch.status === 'On Site' ? 'bg-purple-100 text-purple-800' : ''}
                    ${selectedDispatch.status === 'Completed' ? 'bg-green-100 text-green-800' : ''}
                    ${selectedDispatch.status === 'Cancelled' ? 'bg-red-100 text-red-800' : ''}
                  `}>
                    {selectedDispatch.status}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold
                    ${selectedDispatch.priority === 'Urgent' ? 'bg-red-100 text-red-800' : ''}
                    ${selectedDispatch.priority === 'High' ? 'bg-orange-100 text-orange-800' : ''}
                    ${selectedDispatch.priority === 'Normal' ? 'bg-blue-100 text-blue-800' : ''}
                    ${selectedDispatch.priority === 'Low' ? 'bg-green-100 text-green-800' : ''}
                  `}>
                    {selectedDispatch.priority} Priority
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-700 mb-2">Driver Information</h3>
                    <p className="text-gray-800 font-medium">{selectedDispatch.driverName}</p>
                    <p className="text-gray-600">Vehicle: {selectedDispatch.vehicleNumber}</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-700 mb-2">Customer Information</h3>
                    <p className="text-gray-800 font-medium">{selectedDispatch.customerName}</p>
                    <p className="text-gray-600">Ticket: {selectedDispatch.ticketId}</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-700 mb-2">Service Details</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Service Type:</span>
                      <span className="font-medium">{selectedDispatch.serviceType}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-medium">{selectedDispatch.location}</span>
                    </div>
                    {selectedDispatch.notes && (
                      <div className="mt-2">
                        <span className="text-gray-600">Notes:</span>
                        <p className="text-gray-800 mt-1">{selectedDispatch.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-700 mb-2">Timeline</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Dispatched:</span>
                      <span className="font-medium">{formatTimestamp(selectedDispatch.startTime)}</span>
                    </div>
                    {selectedDispatch.completionTime && (
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Completed:</span>
                        <span className="font-medium">{formatTimestamp(selectedDispatch.completionTime)}</span>
                      </div>
                    )}
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Last Updated:</span>
                      <span className="font-medium">{formatTimestamp(selectedDispatch.lastUpdated)}</span>
                    </div>
                    {selectedDispatch.estimatedArrival && !selectedDispatch.completionTime && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Estimated Arrival:</span>
                        <span className="font-medium">{formatTimestamp(selectedDispatch.estimatedArrival)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between">
                <button 
                  onClick={() => setSelectedDispatch(null)} 
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                >
                  Close
                </button>
                {selectedDispatch.status !== "Completed" && (
                  <div>
                    {selectedDispatch.status === "Assigned" && (
                      <button 
                        onClick={() => {
                          updateDispatchStatus(selectedDispatch.id, "En Route");
                          setSelectedDispatch(null);
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                      >
                        Mark En Route
                      </button>
                    )}
                    {selectedDispatch.status === "En Route" && (
                      <button 
                        onClick={() => {
                          updateDispatchStatus(selectedDispatch.id, "On Site");
                          setSelectedDispatch(null);
                        }}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                      >
                        Mark On Site
                      </button>
                    )}
                    {selectedDispatch.status === "On Site" && (
                      <button 
                        onClick={() => {
                          updateDispatchStatus(selectedDispatch.id, "Completed");
                          setSelectedDispatch(null);
                        }}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                      >
                        Mark Completed
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Driver Details Modal */}
      {selectedDriver && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">
                  Driver Details
                </h2>
                <button 
                  onClick={() => setSelectedDriver(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-center justify-center mb-4">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold">{selectedDriver.name}</h3>
                <span className={`inline-block px-2 py-1 mt-1 text-xs rounded-full ${
                  selectedDriver.status === 'Available' ? 'bg-green-100 text-green-800' : 
                  selectedDriver.status === 'Assigned' ? 'bg-yellow-100 text-yellow-800' :
                  selectedDriver.status === 'En Route' ? 'bg-blue-100 text-blue-800' :
                  selectedDriver.status === 'On Site' ? 'bg-purple-100 text-purple-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {selectedDriver.status}
                </span>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Vehicle:</span>
                  <span className="font-medium">{selectedDriver.vehicle}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Current Location:</span>
                  <span className="font-medium">{selectedDriver.lastLocation}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Last Updated:</span>
                  <span className="font-medium">{formatTimestamp(selectedDriver.lastUpdated)}</span>
                </div>
              </div>
              
              {selectedDriver.status !== "Available" && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-700 mb-2">Current Assignment</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    {dispatches.filter(d => d.driverName === selectedDriver.name && d.status !== "Completed").map((dispatch, idx) => (
                      <div key={idx} className="mb-2 last:mb-0">
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-600">Ticket ID:</span>
                          <span className="font-medium">{dispatch.ticketId}</span>
                        </div>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-600">Customer:</span>
                          <span className="font-medium">{dispatch.customerName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Service:</span>
                          <span className="font-medium">{dispatch.serviceType}</span>
                        </div>
                      </div>
                    ))}
                    
                    {!dispatches.some(d => d.driverName === selectedDriver.name && d.status !== "Completed") && (
                      <p className="text-gray-500 text-center">No active assignments</p>
                    )}
                  </div>
                </div>
              )}
              
              <div className="flex justify-center">
                <button 
                  onClick={() => setSelectedDriver(null)} 
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DispatchLog;
