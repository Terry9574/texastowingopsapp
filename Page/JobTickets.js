import React, { useState } from 'react';

function JobTickets() {
  const [tickets, setTickets] = useState([
    {
      id: "T-10251",
      customerName: "James Wilson",
      phoneNumber: "(555) 123-4567",
      vehicleMake: "Honda",
      vehicleModel: "Accord",
      vehicleYear: "2020",
      vehicleColor: "Silver",
      location: "1234 Main St, Houston, TX",
      serviceType: "Jump Start",
      assignedTo: "Michael Johnson",
      status: "Completed",
      priority: "Normal",
      createdAt: "2025-08-08 08:15:00",
      completedAt: "2025-08-08 09:05:00",
      paymentMethod: "Credit Card",
      totalAmount: 85.00,
      notes: "Customer was very satisfied with the quick response."
    },
    {
      id: "T-10252",
      customerName: "Maria Garcia",
      phoneNumber: "(555) 234-5678",
      vehicleMake: "Toyota",
      vehicleModel: "Camry",
      vehicleYear: "2019",
      vehicleColor: "Blue",
      location: "789 Oak Dr, Houston, TX",
      serviceType: "Tow",
      assignedTo: "Sarah Williams",
      status: "In Progress",
      priority: "High",
      createdAt: "2025-08-08 09:30:00",
      completedAt: "",
      paymentMethod: "Pending",
      totalAmount: 120.00,
      notes: "Vehicle needs to be towed to customer's preferred mechanic."
    },
    {
      id: "T-10253",
      customerName: "Robert Brown",
      phoneNumber: "(555) 345-6789",
      vehicleMake: "Ford",
      vehicleModel: "F-150",
      vehicleYear: "2022",
      vehicleColor: "Black",
      location: "456 Elm St, Houston, TX",
      serviceType: "Tire Change",
      assignedTo: "David Martinez",
      status: "Pending",
      priority: "Normal",
      createdAt: "2025-08-08 10:00:00",
      completedAt: "",
      paymentMethod: "Cash",
      totalAmount: 95.00,
      notes: "Customer has a spare tire ready."
    },
    {
      id: "T-10254",
      customerName: "Jennifer Davis",
      phoneNumber: "(555) 456-7890",
      vehicleMake: "Chevrolet",
      vehicleModel: "Malibu",
      vehicleYear: "2021",
      vehicleColor: "Red",
      location: "Interstate 45 North, Mile Marker 35",
      serviceType: "Tow",
      assignedTo: "Emily Rodriguez",
      status: "Completed",
      priority: "Urgent",
      createdAt: "2025-08-08 07:45:00",
      completedAt: "2025-08-08 08:30:00",
      paymentMethod: "Insurance",
      totalAmount: 150.00,
      notes: "Vehicle broke down on highway. Towed to dealership."
    },
    {
      id: "T-10255",
      customerName: "Michael Thompson",
      phoneNumber: "(555) 567-8901",
      vehicleMake: "BMW",
      vehicleModel: "X5",
      vehicleYear: "2023",
      vehicleColor: "White",
      location: "987 Pine Rd, Houston, TX",
      serviceType: "Lockout",
      assignedTo: "James Taylor",
      status: "In Progress",
      priority: "High",
      createdAt: "2025-08-08 11:15:00",
      completedAt: "",
      paymentMethod: "Credit Card",
      totalAmount: 75.00,
      notes: "Customer locked keys in the vehicle while it was running."
    }
  ]);

  const [newTicket, setNewTicket] = useState({
    customerName: "",
    phoneNumber: "",
    vehicleMake: "",
    vehicleModel: "",
    vehicleYear: "",
    vehicleColor: "",
    location: "",
    serviceType: "",
    assignedTo: "",
    status: "Pending",
    priority: "Normal",
    createdAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
    completedAt: "",
    paymentMethod: "Pending",
    totalAmount: "",
    notes: ""
  });

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedTicket, setSelectedTicket] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTicket(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const ticketId = `T-${10255 + Math.floor(Math.random() * 1000)}`;
    const formattedTicket = {
      ...newTicket,
      id: ticketId,
      totalAmount: parseFloat(newTicket.totalAmount) || 0,
    };
    
    setTickets([formattedTicket, ...tickets]);
    setNewTicket({
      customerName: "",
      phoneNumber: "",
      vehicleMake: "",
      vehicleModel: "",
      vehicleYear: "",
      vehicleColor: "",
      location: "",
      serviceType: "",
      assignedTo: "",
      status: "Pending",
      priority: "Normal",
      createdAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
      completedAt: "",
      paymentMethod: "Pending",
      totalAmount: "",
      notes: ""
    });
    setIsFormVisible(false);
  };

  // Filter tickets by search term and status
  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = 
      ticket.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.vehicleMake.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.vehicleModel.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = statusFilter === "all" || ticket.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  // Sample data for dropdowns
  const serviceTypes = ["Tow", "Jump Start", "Tire Change", "Lockout", "Fuel Delivery", "Winching", "Battery Replacement"];
  const drivers = ["Michael Johnson", "Sarah Williams", "David Martinez", "Emily Rodriguez", "James Taylor"];
  const priorities = ["Low", "Normal", "High", "Urgent"];
  const statuses = ["Pending", "In Progress", "Completed", "Cancelled"];
  const paymentMethods = ["Cash", "Credit Card", "Insurance", "Corporate Account", "Pending"];
  const years = Array.from({length: 30}, (_, i) => (new Date().getFullYear() - i).toString());

  // Helper function to format timestamp
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "";
    
    // If already formatted, return as is
    if (timestamp.includes("-") && timestamp.includes(":")) {
      return timestamp;
    }
    
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  // Get counts by status
  const pendingCount = tickets.filter(t => t.status === "Pending").length;
  const inProgressCount = tickets.filter(t => t.status === "In Progress").length;
  const completedCount = tickets.filter(t => t.status === "Completed").length;

  // Calculate average response time (for completed tickets)
  const calculateAverageResponseTime = () => {
    const completedTickets = tickets.filter(t => t.status === "Completed" && t.completedAt);
    
    if (completedTickets.length === 0) return "N/A";
    
    let totalMinutes = 0;
    
    completedTickets.forEach(ticket => {
      const startTime = new Date(ticket.createdAt);
      const endTime = new Date(ticket.completedAt);
      const diffMinutes = Math.round((endTime - startTime) / (1000 * 60));
      totalMinutes += diffMinutes;
    });
    
    const avgMinutes = Math.round(totalMinutes / completedTickets.length);
    
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
        <h1 className="text-2xl font-bold text-gray-800 mb-2 sm:mb-0">Driver Calls</h1>
        <button
          onClick={() => setIsFormVisible(!isFormVisible)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {isFormVisible ? "Cancel" : "New Call"}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
          <h3 className="font-semibold text-gray-700">Total Calls Today</h3>
          <p className="text-2xl font-bold text-blue-600">{tickets.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-yellow-500">
          <h3 className="font-semibold text-gray-700">Pending</h3>
          <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-indigo-500">
          <h3 className="font-semibold text-gray-700">In Progress</h3>
          <p className="text-2xl font-bold text-indigo-600">{inProgressCount}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500">
          <h3 className="font-semibold text-gray-700">Avg Response Time</h3>
          <p className="text-2xl font-bold text-green-600">{calculateAverageResponseTime()}</p>
        </div>
      </div>

      {isFormVisible && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Create New Ticket</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
                <input
                  type="text"
                  name="customerName"
                  value={newTicket.customerName}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={newTicket.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="(555) 123-4567"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
                <select
                  name="serviceType"
                  value={newTicket.serviceType}
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Make</label>
                <input
                  type="text"
                  name="vehicleMake"
                  value={newTicket.vehicleMake}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Model</label>
                <input
                  type="text"
                  name="vehicleModel"
                  value={newTicket.vehicleModel}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                <select
                  name="vehicleYear"
                  value={newTicket.vehicleYear}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select Year</option>
                  {years.map((year, index) => (
                    <option key={index} value={year}>{year}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Color</label>
                <input
                  type="text"
                  name="vehicleColor"
                  value={newTicket.vehicleColor}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select
                  name="priority"
                  value={newTicket.priority}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  {priorities.map((priority, index) => (
                    <option key={index} value={priority}>{priority}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Assign To</label>
                <select
                  name="assignedTo"
                  value={newTicket.assignedTo}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Unassigned</option>
                  {drivers.map((driver, index) => (
                    <option key={index} value={driver}>{driver}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                <select
                  name="paymentMethod"
                  value={newTicket.paymentMethod}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  {paymentMethods.map((method, index) => (
                    <option key={index} value={method}>{method}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount ($)</label>
                <input
                  type="number"
                  name="totalAmount"
                  min="0"
                  step="0.01"
                  value={newTicket.totalAmount}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  name="location"
                  value={newTicket.location}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Address or location description"
                  required
                />
              </div>
              
              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  name="notes"
                  value={newTicket.notes}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Additional information about this call"
                ></textarea>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Create Ticket
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
                onClick={() => setStatusFilter("in progress")}
                className={`px-3 py-1 rounded-lg ${statusFilter === "in progress" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700"}`}
              >
                In Progress
              </button>
              <button 
                onClick={() => setStatusFilter("completed")}
                className={`px-3 py-1 rounded-lg ${statusFilter === "completed" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700"}`}
              >
                Completed
              </button>
              <button 
                onClick={() => setStatusFilter("cancelled")}
                className={`px-3 py-1 rounded-lg ${statusFilter === "cancelled" ? "bg-red-600 text-white" : "bg-gray-100 text-gray-700"}`}
              >
                Cancelled
              </button>
            </div>
            
            <div className="w-full md:w-64">
              <input
                type="text"
                placeholder="Search tickets..."
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{ticket.id}</div>
                    <div className={`text-xs ${
                      ticket.priority === 'Urgent' ? 'text-red-600 font-semibold' : 
                      ticket.priority === 'High' ? 'text-orange-600' : 
                      ticket.priority === 'Low' ? 'text-green-600' : 
                      'text-blue-600'
                    }`}>
                      {ticket.priority} Priority
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{ticket.customerName}</div>
                    <div className="text-sm text-gray-500">{ticket.phoneNumber}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{ticket.serviceType}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{ticket.vehicleMake} {ticket.vehicleModel}</div>
                    <div className="text-xs text-gray-500">{ticket.vehicleYear} • {ticket.vehicleColor}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate" title={ticket.location}>
                      {ticket.location}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {ticket.assignedTo || (
                      <span className="text-yellow-500">Unassigned</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${ticket.status === 'Completed' ? 'bg-green-100 text-green-800' : ''}
                      ${ticket.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                      ${ticket.status === 'In Progress' ? 'bg-indigo-100 text-indigo-800' : ''}
                      ${ticket.status === 'Cancelled' ? 'bg-red-100 text-red-800' : ''}
                    `}>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {formatTimestamp(ticket.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => setSelectedTicket(ticket)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredTickets.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            No tickets found matching your criteria.
          </div>
        )}
      </div>
      
      {/* Ticket Details Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">
                  Ticket Details: {selectedTicket.id}
                </h2>
                <button 
                  onClick={() => setSelectedTicket(null)}
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
                    ${selectedTicket.status === 'Completed' ? 'bg-green-100 text-green-800' : ''}
                    ${selectedTicket.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                    ${selectedTicket.status === 'In Progress' ? 'bg-indigo-100 text-indigo-800' : ''}
                    ${selectedTicket.status === 'Cancelled' ? 'bg-red-100 text-red-800' : ''}
                  `}>
                    {selectedTicket.status}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold
                    ${selectedTicket.priority === 'Urgent' ? 'bg-red-100 text-red-800' : ''}
                    ${selectedTicket.priority === 'High' ? 'bg-orange-100 text-orange-800' : ''}
                    ${selectedTicket.priority === 'Normal' ? 'bg-blue-100 text-blue-800' : ''}
                    ${selectedTicket.priority === 'Low' ? 'bg-green-100 text-green-800' : ''}
                  `}>
                    {selectedTicket.priority} Priority
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-700 mb-2">Customer Information</h3>
                    <p className="text-gray-800 font-medium">{selectedTicket.customerName}</p>
                    <p className="text-gray-600">{selectedTicket.phoneNumber}</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-700 mb-2">Vehicle Information</h3>
                    <p className="text-gray-800 font-medium">{selectedTicket.vehicleYear} {selectedTicket.vehicleMake} {selectedTicket.vehicleModel}</p>
                    <p className="text-gray-600">Color: {selectedTicket.vehicleColor}</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-700 mb-2">Service Details</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Service Type:</span>
                      <span className="font-medium">{selectedTicket.serviceType}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Assigned To:</span>
                      <span className="font-medium">{selectedTicket.assignedTo || "Unassigned"}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Payment Method:</span>
                      <span className="font-medium">{selectedTicket.paymentMethod}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Amount:</span>
                      <span className="font-medium">${selectedTicket.totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-700 mb-2">Location</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-800">{selectedTicket.location}</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-700 mb-2">Timeline</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Created:</span>
                      <span className="font-medium">{formatTimestamp(selectedTicket.createdAt)}</span>
                    </div>
                    {selectedTicket.completedAt && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Completed:</span>
                        <span className="font-medium">{formatTimestamp(selectedTicket.completedAt)}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-700 mb-2">Notes</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-800">{selectedTicket.notes || "No additional notes"}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between">
                <button 
                  onClick={() => setSelectedTicket(null)} 
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                >
                  Close
                </button>
                <div>
                  {selectedTicket.status !== "Completed" && (
                    <button 
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition mr-2"
                    >
                      Mark as Completed
                    </button>
                  )}
                  <button 
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Edit Ticket
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

export default JobTickets;
