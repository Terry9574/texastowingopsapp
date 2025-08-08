import React, { useState } from 'react';

function VehicleInventory() {
  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      vehicleNumber: "TT-101",
      vehicleType: "Flatbed",
      make: "Ford",
      model: "F-550",
      year: 2023,
      vin: "1FDUF5GY8NEE12345",
      licensePlate: "TX-123456",
      status: "Active",
      mileage: 15238,
      lastService: "2025-07-15",
      nextService: "2025-09-15",
      assignedTo: "Michael Johnson",
      gpsEnabled: true,
      location: "Depot",
      fuelType: "Diesel",
      notes: "New vehicle, all systems operational"
    },
    {
      id: 2,
      vehicleNumber: "TT-102",
      vehicleType: "Wrecker",
      make: "Dodge",
      model: "RAM 5500",
      year: 2022,
      vin: "3D7MR48C13G67890",
      licensePlate: "TX-234567",
      status: "Active",
      mileage: 28465,
      lastService: "2025-06-10",
      nextService: "2025-08-10",
      assignedTo: "Sarah Williams",
      gpsEnabled: true,
      location: "Field",
      fuelType: "Diesel",
      notes: "Needs tire rotation at next service"
    },
    {
      id: 3,
      vehicleNumber: "TT-103",
      vehicleType: "Rollback",
      make: "Chevrolet",
      model: "Silverado 3500HD",
      year: 2023,
      vin: "1GC4KVCY2LF54321",
      licensePlate: "TX-345678",
      status: "Maintenance",
      mileage: 32140,
      lastService: "2025-08-01",
      nextService: "2025-10-01",
      assignedTo: "",
      gpsEnabled: true,
      location: "Service Center",
      fuelType: "Diesel",
      notes: "In shop for transmission service"
    },
    {
      id: 4,
      vehicleNumber: "TT-105",
      vehicleType: "Flatbed",
      make: "Ford",
      model: "F-650",
      year: 2021,
      vin: "1FDNF6DC9MDB24680",
      licensePlate: "TX-456789",
      status: "Active",
      mileage: 45692,
      lastService: "2025-07-22",
      nextService: "2025-09-22",
      assignedTo: "David Martinez",
      gpsEnabled: true,
      location: "Field",
      fuelType: "Diesel",
      notes: "Check engine light came on briefly last week but is now off"
    },
    {
      id: 5,
      vehicleNumber: "TT-107",
      vehicleType: "Wheel Lift",
      make: "RAM",
      model: "4500",
      year: 2022,
      vin: "3C63RRGL4NG13579",
      licensePlate: "TX-567890",
      status: "Out of Service",
      mileage: 37891,
      lastService: "2025-06-05",
      nextService: "2025-08-05",
      assignedTo: "",
      gpsEnabled: true,
      location: "Depot",
      fuelType: "Diesel",
      notes: "Waiting for parts to repair hydraulic system"
    }
  ]);

  const [newVehicle, setNewVehicle] = useState({
    vehicleNumber: "",
    vehicleType: "",
    make: "",
    model: "",
    year: new Date().getFullYear(),
    vin: "",
    licensePlate: "",
    status: "Active",
    mileage: 0,
    lastService: "",
    nextService: "",
    assignedTo: "",
    gpsEnabled: true,
    location: "Depot",
    fuelType: "Diesel",
    notes: ""
  });

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewVehicle(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formattedVehicle = {
      ...newVehicle,
      id: vehicles.length + 1,
      mileage: parseInt(newVehicle.mileage) || 0,
      year: parseInt(newVehicle.year) || new Date().getFullYear(),
    };
    
    setVehicles([...vehicles, formattedVehicle]);
    setNewVehicle({
      vehicleNumber: "",
      vehicleType: "",
      make: "",
      model: "",
      year: new Date().getFullYear(),
      vin: "",
      licensePlate: "",
      status: "Active",
      mileage: 0,
      lastService: "",
      nextService: "",
      assignedTo: "",
      gpsEnabled: true,
      location: "Depot",
      fuelType: "Diesel",
      notes: ""
    });
    setIsFormVisible(false);
  };

  // Filter functions
  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = 
      vehicle.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.vin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (vehicle.assignedTo && vehicle.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()));
      
    const matchesStatus = statusFilter === "all" || vehicle.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesType = typeFilter === "all" || vehicle.vehicleType.toLowerCase() === typeFilter.toLowerCase();
    
    return matchesSearch && matchesStatus && matchesType;
  });

  // Sample data for dropdowns
  const vehicleTypes = ["Flatbed", "Wrecker", "Rollback", "Wheel Lift", "Heavy Duty", "Service Truck"];
  const vehicleMakes = ["Ford", "Chevrolet", "Dodge", "RAM", "International", "Freightliner", "Peterbilt", "Kenworth"];
  const statuses = ["Active", "Maintenance", "Out of Service", "Reserved", "In Transit"];
  const fuelTypes = ["Diesel", "Gasoline", "Electric", "Hybrid"];
  const locations = ["Depot", "Field", "Service Center", "Customer Site", "Other"];
  const drivers = ["Michael Johnson", "Sarah Williams", "David Martinez", "Emily Rodriguez", "James Taylor"];

  // Calculate the days since last service
  const daysSinceService = (lastServiceDate) => {
    if (!lastServiceDate) return "N/A";
    
    const lastService = new Date(lastServiceDate);
    const today = new Date();
    const diffTime = today - lastService;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };

  // Calculate days until next service
  const daysUntilNextService = (nextServiceDate) => {
    if (!nextServiceDate) return "N/A";
    
    const nextService = new Date(nextServiceDate);
    const today = new Date();
    const diffTime = nextService - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };

  return (
    <div className="p-6">
      <div className="flex flex-wrap justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2 sm:mb-0">Tow Truck Inventory</h1>
        <button
          onClick={() => setIsFormVisible(!isFormVisible)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {isFormVisible ? "Cancel" : "Add Vehicle"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-semibold text-gray-700">Total Vehicles</h3>
          <p className="text-2xl font-bold text-blue-600">{vehicles.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-semibold text-gray-700">Active Vehicles</h3>
          <p className="text-2xl font-bold text-green-600">{vehicles.filter(v => v.status === "Active").length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-semibold text-gray-700">In Maintenance</h3>
          <p className="text-2xl font-bold text-yellow-600">{vehicles.filter(v => v.status === "Maintenance").length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-semibold text-gray-700">Out of Service</h3>
          <p className="text-2xl font-bold text-red-600">{vehicles.filter(v => v.status === "Out of Service").length}</p>
        </div>
      </div>

      {isFormVisible && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Add New Vehicle</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Number</label>
                <input
                  type="text"
                  name="vehicleNumber"
                  value={newVehicle.vehicleNumber}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="e.g. TT-108"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Type</label>
                <select
                  name="vehicleType"
                  value={newVehicle.vehicleType}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select Type</option>
                  {vehicleTypes.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  name="status"
                  value={newVehicle.status}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  {statuses.map((status, index) => (
                    <option key={index} value={status}>{status}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Make</label>
                <select
                  name="make"
                  value={newVehicle.make}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select Make</option>
                  {vehicleMakes.map((make, index) => (
                    <option key={index} value={make}>{make}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
                <input
                  type="text"
                  name="model"
                  value={newVehicle.model}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                <input
                  type="number"
                  name="year"
                  min="2000"
                  max="2030"
                  value={newVehicle.year}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">VIN</label>
                <input
                  type="text"
                  name="vin"
                  value={newVehicle.vin}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">License Plate</label>
                <input
                  type="text"
                  name="licensePlate"
                  value={newVehicle.licensePlate}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Mileage</label>
                <input
                  type="number"
                  name="mileage"
                  min="0"
                  value={newVehicle.mileage}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Service Date</label>
                <input
                  type="date"
                  name="lastService"
                  value={newVehicle.lastService}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Next Service Date</label>
                <input
                  type="date"
                  name="nextService"
                  value={newVehicle.nextService}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
                <select
                  name="assignedTo"
                  value={newVehicle.assignedTo}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Not Assigned</option>
                  {drivers.map((driver, index) => (
                    <option key={index} value={driver}>{driver}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fuel Type</label>
                <select
                  name="fuelType"
                  value={newVehicle.fuelType}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  {fuelTypes.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Location</label>
                <select
                  name="location"
                  value={newVehicle.location}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  {locations.map((loc, index) => (
                    <option key={index} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center mt-4">
                <input
                  type="checkbox"
                  name="gpsEnabled"
                  id="gpsEnabled"
                  checked={newVehicle.gpsEnabled}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <label htmlFor="gpsEnabled" className="ml-2 block text-sm text-gray-700">
                  GPS Tracking Enabled
                </label>
              </div>
              
              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  name="notes"
                  value={newVehicle.notes}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Additional information about this vehicle"
                ></textarea>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Save Vehicle
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Status:</span>
              <button 
                onClick={() => setStatusFilter("all")}
                className={`px-3 py-1 rounded-lg ${statusFilter === "all" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}`}
              >
                All
              </button>
              <button 
                onClick={() => setStatusFilter("active")}
                className={`px-3 py-1 rounded-lg ${statusFilter === "active" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700"}`}
              >
                Active
              </button>
              <button 
                onClick={() => setStatusFilter("maintenance")}
                className={`px-3 py-1 rounded-lg ${statusFilter === "maintenance" ? "bg-yellow-500 text-white" : "bg-gray-100 text-gray-700"}`}
              >
                Maintenance
              </button>
              <button 
                onClick={() => setStatusFilter("out of service")}
                className={`px-3 py-1 rounded-lg ${statusFilter === "out of service" ? "bg-red-600 text-white" : "bg-gray-100 text-gray-700"}`}
              >
                Out of Service
              </button>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Type:</span>
              <button 
                onClick={() => setTypeFilter("all")}
                className={`px-3 py-1 rounded-lg ${typeFilter === "all" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}`}
              >
                All
              </button>
              {vehicleTypes.map((type, index) => (
                <button 
                  key={index}
                  onClick={() => setTypeFilter(type.toLowerCase())}
                  className={`px-3 py-1 rounded-lg ${typeFilter === type.toLowerCase() ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}`}
                >
                  {type}
                </button>
              ))}
            </div>
            
            <div className="w-full md:w-64">
              <input
                type="text"
                placeholder="Search vehicles..."
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle #</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Make/Model</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mileage</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredVehicles.map((vehicle) => {
                // Calculate service days
                const nextServiceDays = daysUntilNextService(vehicle.nextService);
                
                return (
                  <tr key={vehicle.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{vehicle.vehicleNumber}</div>
                      <div className="text-sm text-gray-500">{vehicle.year}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{vehicle.vehicleType}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{vehicle.make} {vehicle.model}</div>
                      <div className="text-xs text-gray-500">VIN: {vehicle.vin.substring(vehicle.vin.length - 6)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${vehicle.status === 'Active' ? 'bg-green-100 text-green-800' : ''}
                        ${vehicle.status === 'Maintenance' ? 'bg-yellow-100 text-yellow-800' : ''}
                        ${vehicle.status === 'Out of Service' ? 'bg-red-100 text-red-800' : ''}
                        ${vehicle.status === 'Reserved' ? 'bg-blue-100 text-blue-800' : ''}
                        ${vehicle.status === 'In Transit' ? 'bg-purple-100 text-purple-800' : ''}
                      `}>
                        {vehicle.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {vehicle.mileage.toLocaleString()} mi
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">Next: {vehicle.nextService || "N/A"}</div>
                      {typeof nextServiceDays === "number" && (
                        <div className={`text-xs ${
                          nextServiceDays < 0 ? 'text-red-600' : 
                          nextServiceDays <= 7 ? 'text-yellow-600' : 
                          'text-green-600'
                        }`}>
                          {nextServiceDays < 0 ? `Overdue by ${Math.abs(nextServiceDays)} days` : 
                           nextServiceDays === 0 ? 'Due today' : 
                           `Due in ${nextServiceDays} days`}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {vehicle.assignedTo || "Unassigned"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={() => setSelectedVehicle(vehicle)} 
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        View
                      </button>
                      <a href="#" className="text-gray-600 hover:text-gray-900">Edit</a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredVehicles.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            No vehicles found matching your criteria.
          </div>
        )}
      </div>
      
      {selectedVehicle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">
                  Vehicle Details: {selectedVehicle.vehicleNumber}
                </h2>
                <button 
                  onClick={() => setSelectedVehicle(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500">Vehicle Type</span>
                  <span className="text-lg font-semibold">{selectedVehicle.vehicleType}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500">Status</span>
                  <span className={`text-lg font-semibold ${
                    selectedVehicle.status === 'Active' ? 'text-green-600' : 
                    selectedVehicle.status === 'Maintenance' ? 'text-yellow-600' : 
                    'text-red-600'
                  }`}>
                    {selectedVehicle.status}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500">Make & Model</span>
                  <span className="text-lg font-semibold">{selectedVehicle.make} {selectedVehicle.model}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500">Year</span>
                  <span className="text-lg font-semibold">{selectedVehicle.year}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500">VIN</span>
                  <span className="text-lg font-semibold">{selectedVehicle.vin}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500">License Plate</span>
                  <span className="text-lg font-semibold">{selectedVehicle.licensePlate}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500">Current Mileage</span>
                  <span className="text-lg font-semibold">{selectedVehicle.mileage.toLocaleString()} mi</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500">Fuel Type</span>
                  <span className="text-lg font-semibold">{selectedVehicle.fuelType}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500">Last Service</span>
                  <span className="text-lg font-semibold">{selectedVehicle.lastService || "N/A"}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500">Next Service</span>
                  <span className="text-lg font-semibold">{selectedVehicle.nextService || "N/A"}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500">Assigned To</span>
                  <span className="text-lg font-semibold">{selectedVehicle.assignedTo || "Unassigned"}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500">Current Location</span>
                  <span className="text-lg font-semibold">{selectedVehicle.location}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500">GPS Tracking</span>
                  <span className="text-lg font-semibold">{selectedVehicle.gpsEnabled ? "Enabled" : "Disabled"}</span>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Notes</h3>
                <p className="bg-gray-50 p-3 rounded-lg">
                  {selectedVehicle.notes || "No notes available"}
                </p>
              </div>
              
              <div className="flex justify-between">
                <button 
                  onClick={() => setSelectedVehicle(null)} 
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                >
                  Close
                </button>
                <div>
                  <button 
                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition mr-2"
                  >
                    Schedule Service
                  </button>
                  <button 
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Edit Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VehicleInventory;
