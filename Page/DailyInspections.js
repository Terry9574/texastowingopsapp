import React, { useState } from 'react';

function DailyInspections() {
  const [inspections, setInspections] = useState([
    {
      id: 1,
      driverName: "Michael Johnson",
      vehicleNumber: "TT-102",
      date: "2025-08-08",
      status: "Completed",
      issues: "None",
      mileage: 45683,
      fuelLevel: "3/4"
    },
    {
      id: 2,
      driverName: "Sarah Williams",
      vehicleNumber: "TT-105",
      date: "2025-08-07",
      status: "Completed",
      issues: "Tire pressure low on rear left",
      mileage: 78932,
      fuelLevel: "1/2"
    },
    {
      id: 3,
      driverName: "David Martinez",
      vehicleNumber: "TT-103",
      date: "2025-08-08",
      status: "Pending",
      issues: "",
      mileage: 0,
      fuelLevel: ""
    },
    {
      id: 4,
      driverName: "Emily Rodriguez",
      vehicleNumber: "TT-107",
      date: "2025-08-08",
      status: "Completed",
      issues: "Windshield wiper fluid low",
      mileage: 34521,
      fuelLevel: "Full"
    },
    {
      id: 5,
      driverName: "James Taylor",
      vehicleNumber: "TT-101",
      date: "2025-08-07",
      status: "Issues Found",
      issues: "Check engine light on; Brakes squeaking",
      mileage: 92143,
      fuelLevel: "1/4"
    }
  ]);

  const [newInspection, setNewInspection] = useState({
    driverName: "",
    vehicleNumber: "",
    date: new Date().toISOString().split('T')[0],
    status: "Pending",
    issues: "",
    mileage: "",
    fuelLevel: ""
  });

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all"); // all, completed, pending, issues

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewInspection(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formattedInspection = {
      ...newInspection,
      id: inspections.length + 1,
      mileage: newInspection.mileage ? parseInt(newInspection.mileage) : 0,
    };
    
    setInspections([...inspections, formattedInspection]);
    setNewInspection({
      driverName: "",
      vehicleNumber: "",
      date: new Date().toISOString().split('T')[0],
      status: "Pending",
      issues: "",
      mileage: "",
      fuelLevel: ""
    });
    setIsFormVisible(false);
  };

  // Filter by search term
  const filteredBySearch = inspections.filter(inspection => 
    inspection.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inspection.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inspection.issues.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter by active tab
  const filteredInspections = filteredBySearch.filter(inspection => {
    if (activeTab === "all") return true;
    if (activeTab === "completed") return inspection.status === "Completed";
    if (activeTab === "pending") return inspection.status === "Pending";
    if (activeTab === "issues") return inspection.status === "Issues Found";
    return true;
  });

  // Sample data for dropdowns
  const vehicles = ["TT-101", "TT-102", "TT-103", "TT-105", "TT-107", "TT-109"];
  const drivers = ["Michael Johnson", "Sarah Williams", "David Martinez", "Emily Rodriguez", "James Taylor"];
  const fuelLevels = ["Empty", "1/4", "1/2", "3/4", "Full"];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Daily Vehicle Inspections</h1>
        <button
          onClick={() => setIsFormVisible(!isFormVisible)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {isFormVisible ? "Cancel" : "New Inspection"}
        </button>
      </div>

      {isFormVisible && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Add Vehicle Inspection</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Driver Name</label>
                <select
                  name="driverName"
                  value={newInspection.driverName}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select Driver</option>
                  {drivers.map((driver, index) => (
                    <option key={index} value={driver}>{driver}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Number</label>
                <select
                  name="vehicleNumber"
                  value={newInspection.vehicleNumber}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select Vehicle</option>
                  {vehicles.map((vehicle, index) => (
                    <option key={index} value={vehicle}>{vehicle}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Inspection Date</label>
                <input
                  type="date"
                  name="date"
                  value={newInspection.date}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mileage</label>
                <input
                  type="number"
                  name="mileage"
                  value={newInspection.mileage}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fuel Level</label>
                <select
                  name="fuelLevel"
                  value={newInspection.fuelLevel}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select Fuel Level</option>
                  {fuelLevels.map((level, index) => (
                    <option key={index} value={level}>{level}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  name="status"
                  value={newInspection.status}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="Issues Found">Issues Found</option>
                </select>
              </div>
              
              <div className="md:col-span-2 lg:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Issues/Notes</label>
                <textarea
                  name="issues"
                  value={newInspection.issues}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Document any issues or notes about the vehicle condition"
                ></textarea>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Save Inspection
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center">
              <button 
                onClick={() => setActiveTab("all")}
                className={`px-3 py-1 rounded-lg mr-2 ${activeTab === "all" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}`}
              >
                All
              </button>
              <button 
                onClick={() => setActiveTab("completed")}
                className={`px-3 py-1 rounded-lg mr-2 ${activeTab === "completed" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700"}`}
              >
                Completed
              </button>
              <button 
                onClick={() => setActiveTab("pending")}
                className={`px-3 py-1 rounded-lg mr-2 ${activeTab === "pending" ? "bg-yellow-600 text-white" : "bg-gray-100 text-gray-700"}`}
              >
                Pending
              </button>
              <button 
                onClick={() => setActiveTab("issues")}
                className={`px-3 py-1 rounded-lg ${activeTab === "issues" ? "bg-red-600 text-white" : "bg-gray-100 text-gray-700"}`}
              >
                Issues
              </button>
            </div>
            
            <div className="w-full md:w-64">
              <input
                type="text"
                placeholder="Search inspections..."
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Driver</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mileage</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fuel</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issues</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInspections.map((inspection) => (
                <tr key={inspection.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{inspection.driverName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{inspection.vehicleNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{inspection.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{inspection.mileage.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{inspection.fuelLevel}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${inspection.status === 'Completed' ? 'bg-green-100 text-green-800' : ''}
                      ${inspection.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                      ${inspection.status === 'Issues Found' ? 'bg-red-100 text-red-800' : ''}
                    `}>
                      {inspection.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate">
                      {inspection.issues || "None"}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredInspections.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            No inspection records found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
}

export default DailyInspections;
