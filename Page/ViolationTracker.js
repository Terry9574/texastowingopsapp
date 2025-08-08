import React, { useState } from 'react';

function ViolationTracker() {
  const [violations, setViolations] = useState([
    {
      id: 1,
      driverName: "Michael Johnson",
      violationType: "Speeding",
      date: "2025-07-15",
      location: "Interstate 10, mile marker 732",
      points: 3,
      fine: 210.50,
      description: "15 mph over posted limit in construction zone",
      status: "Pending",
      courtDate: "2025-09-05",
      appealDeadline: "2025-08-15",
      resolved: false,
      documents: 1
    },
    {
      id: 2,
      driverName: "Sarah Williams",
      violationType: "Improper Lane Change",
      date: "2025-06-22",
      location: "Highway 290, Houston",
      points: 2,
      fine: 150.00,
      description: "Failed to signal lane change",
      status: "Paid",
      courtDate: "",
      appealDeadline: "2025-07-22",
      resolved: true,
      documents: 2
    },
    {
      id: 3,
      driverName: "David Martinez",
      violationType: "Overweight",
      date: "2025-07-30",
      location: "Weigh station, I-45 North",
      points: 0,
      fine: 450.00,
      description: "Vehicle exceeded maximum weight by 1,200 lbs",
      status: "Pending",
      courtDate: "",
      appealDeadline: "2025-08-30",
      resolved: false,
      documents: 1
    },
    {
      id: 4,
      driverName: "Emily Rodriguez",
      violationType: "Log Book Violation",
      date: "2025-07-05",
      location: "DOT Inspection, San Antonio",
      points: 2,
      fine: 175.00,
      description: "Hours of service discrepancy",
      status: "Under Appeal",
      courtDate: "2025-08-12",
      appealDeadline: "2025-08-05",
      resolved: false,
      documents: 3
    },
    {
      id: 5,
      driverName: "James Taylor",
      violationType: "Equipment Violation",
      date: "2025-07-18",
      location: "Random Inspection, Dallas",
      points: 1,
      fine: 125.00,
      description: "Non-functioning rear marker light",
      status: "Paid",
      courtDate: "",
      appealDeadline: "2025-08-18",
      resolved: true,
      documents: 1
    }
  ]);

  const [newViolation, setNewViolation] = useState({
    driverName: "",
    violationType: "",
    date: "",
    location: "",
    points: 0,
    fine: 0,
    description: "",
    status: "Pending",
    courtDate: "",
    appealDeadline: "",
    resolved: false,
    documents: 0
  });

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;
    
    if (name === "points") {
      processedValue = parseInt(value) || 0;
    } else if (name === "fine") {
      processedValue = parseFloat(value) || 0;
    } else if (name === "resolved") {
      processedValue = e.target.checked;
    }
    
    setNewViolation(prev => ({ ...prev, [name]: processedValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Calculate appeal deadline if not specified
    let appealDeadline = newViolation.appealDeadline;
    if (!appealDeadline && newViolation.date) {
      const date = new Date(newViolation.date);
      date.setDate(date.getDate() + 30); // 30 days after violation by default
      appealDeadline = date.toISOString().split('T')[0];
    }
    
    const formattedViolation = {
      ...newViolation,
      id: violations.length + 1,
      appealDeadline: appealDeadline,
      documents: parseInt(newViolation.documents) || 0,
    };
    
    setViolations([...violations, formattedViolation]);
    setNewViolation({
      driverName: "",
      violationType: "",
      date: "",
      location: "",
      points: 0,
      fine: 0,
      description: "",
      status: "Pending",
      courtDate: "",
      appealDeadline: "",
      resolved: false,
      documents: 0
    });
    setIsFormVisible(false);
  };

  // Filter by search term and status
  const filteredViolations = violations.filter(violation => {
    const matchesSearch = 
      violation.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      violation.violationType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      violation.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      violation.description.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = 
      statusFilter === "all" || 
      (statusFilter === "resolved" && violation.resolved) ||
      (statusFilter === "unresolved" && !violation.resolved) ||
      (statusFilter === violation.status.toLowerCase());
    
    return matchesSearch && matchesStatus;
  });

  // Sample data for dropdowns
  const drivers = ["Michael Johnson", "Sarah Williams", "David Martinez", "Emily Rodriguez", "James Taylor"];
  const violationTypes = ["Speeding", "Improper Lane Change", "Log Book Violation", "Equipment Violation", "Overweight", "Parking Violation", "Cell Phone Use", "Failure to Yield", "Following Too Closely"];
  const statuses = ["Pending", "Paid", "Under Appeal", "Dismissed", "Convicted"];

  const calculatePoints = () => {
    return filteredViolations.reduce((total, violation) => total + violation.points, 0);
  };

  const calculateFines = () => {
    return filteredViolations.reduce((total, violation) => total + violation.fine, 0).toFixed(2);
  };

  return (
    <div className="p-6">
      <div className="flex flex-wrap justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2 sm:mb-0">Violation Tracker</h1>
        <button
          onClick={() => setIsFormVisible(!isFormVisible)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {isFormVisible ? "Cancel" : "Record Violation"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-semibold text-gray-700">Total Violations</h3>
          <p className="text-2xl font-bold text-blue-600">{filteredViolations.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-semibold text-gray-700">Total Points</h3>
          <p className="text-2xl font-bold text-yellow-600">{calculatePoints()}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-semibold text-gray-700">Total Fines</h3>
          <p className="text-2xl font-bold text-red-600">${calculateFines()}</p>
        </div>
      </div>

      {isFormVisible && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Record New Violation</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Driver Name</label>
                <select
                  name="driverName"
                  value={newViolation.driverName}
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Violation Type</label>
                <select
                  name="violationType"
                  value={newViolation.violationType}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select Violation Type</option>
                  {violationTypes.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Violation</label>
                <input
                  type="date"
                  name="date"
                  value={newViolation.date}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  name="location"
                  value={newViolation.location}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Street, city, or highway location"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Points</label>
                <input
                  type="number"
                  name="points"
                  min="0"
                  max="10"
                  value={newViolation.points}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fine Amount ($)</label>
                <input
                  type="number"
                  name="fine"
                  min="0"
                  step="0.01"
                  value={newViolation.fine}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  name="status"
                  value={newViolation.status}
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Court Date (if applicable)</label>
                <input
                  type="date"
                  name="courtDate"
                  value={newViolation.courtDate}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Appeal Deadline</label>
                <input
                  type="date"
                  name="appealDeadline"
                  value={newViolation.appealDeadline}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <p className="mt-1 text-xs text-gray-500">Defaults to 30 days after violation date if left blank</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Documents</label>
                <input
                  type="file"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  multiple
                  disabled
                />
                <p className="mt-1 text-xs text-gray-500">File upload functionality coming soon</p>
              </div>
              
              <div className="flex items-center mt-4">
                <input
                  type="checkbox"
                  name="resolved"
                  id="resolved"
                  checked={newViolation.resolved}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <label htmlFor="resolved" className="ml-2 block text-sm text-gray-700">
                  Mark as Resolved
                </label>
              </div>
              
              <div className="md:col-span-2 lg:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={newViolation.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Provide details about the violation"
                  required
                ></textarea>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Save Violation
              </button>
            </div>
          </form>
        </div>
      )}

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
                onClick={() => setStatusFilter("pending")}
                className={`px-3 py-1 rounded-lg ${statusFilter === "pending" ? "bg-yellow-500 text-white" : "bg-gray-100 text-gray-700"}`}
              >
                Pending
              </button>
              <button 
                onClick={() => setStatusFilter("paid")}
                className={`px-3 py-1 rounded-lg ${statusFilter === "paid" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700"}`}
              >
                Paid
              </button>
              <button 
                onClick={() => setStatusFilter("under appeal")}
                className={`px-3 py-1 rounded-lg ${statusFilter === "under appeal" ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-700"}`}
              >
                Under Appeal
              </button>
              <button 
                onClick={() => setStatusFilter("resolved")}
                className={`px-3 py-1 rounded-lg ${statusFilter === "resolved" ? "bg-green-500 text-white" : "bg-gray-100 text-gray-700"}`}
              >
                Resolved
              </button>
              <button 
                onClick={() => setStatusFilter("unresolved")}
                className={`px-3 py-1 rounded-lg ${statusFilter === "unresolved" ? "bg-red-500 text-white" : "bg-gray-100 text-gray-700"}`}
              >
                Unresolved
              </button>
            </div>
            
            <div className="w-full md:w-64">
              <input
                type="text"
                placeholder="Search violations..."
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Violation</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fine</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredViolations.map((violation) => (
                <tr key={violation.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{violation.driverName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{violation.violationType}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{violation.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      violation.points === 0 ? 'bg-green-100 text-green-800' : 
                      violation.points <= 2 ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {violation.points}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">${violation.fine.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${violation.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                      ${violation.status === 'Paid' ? 'bg-green-100 text-green-800' : ''}
                      ${violation.status === 'Under Appeal' ? 'bg-purple-100 text-purple-800' : ''}
                      ${violation.status === 'Dismissed' ? 'bg-blue-100 text-blue-800' : ''}
                      ${violation.status === 'Convicted' ? 'bg-red-100 text-red-800' : ''}
                    `}>
                      {violation.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 max-w-xs truncate" title={violation.description}>
                    {violation.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a href="#" className="text-blue-600 hover:text-blue-900 mr-3">View</a>
                    <a href="#" className="text-gray-600 hover:text-gray-900">Edit</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredViolations.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            No violations found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
}

export default ViolationTracker;
