import React, { useState } from 'react';

function CustomerDatabase() {
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "James Wilson",
      phone: "(555) 123-4567",
      email: "james.wilson@example.com",
      address: "1234 Main St, Houston, TX 77002",
      type: "Individual",
      serviceHistory: 5,
      lastService: "2025-07-22",
      notes: "Prefers communication via text message.",
      membershipLevel: "Standard"
    },
    {
      id: 2,
      name: "Maria Garcia",
      phone: "(555) 234-5678",
      email: "maria.garcia@example.com",
      address: "789 Oak Dr, Houston, TX 77005",
      type: "Individual",
      serviceHistory: 3,
      lastService: "2025-08-01",
      notes: "Has roadside assistance with insurance.",
      membershipLevel: "Premium"
    },
    {
      id: 3,
      name: "Houston City Services",
      phone: "(555) 345-6789",
      email: "contact@houstoncityservices.com",
      address: "500 Municipal Plaza, Houston, TX 77003",
      type: "Business",
      serviceHistory: 12,
      lastService: "2025-07-30",
      notes: "Requires invoice with PO number.",
      membershipLevel: "Enterprise"
    },
    {
      id: 4,
      name: "Robert Brown",
      phone: "(555) 456-7890",
      email: "robert.brown@example.com",
      address: "456 Elm St, Houston, TX 77004",
      type: "Individual",
      serviceHistory: 1,
      lastService: "2025-06-15",
      notes: "New customer, first tow was from accident.",
      membershipLevel: "Standard"
    },
    {
      id: 5,
      name: "Jennifer Davis",
      phone: "(555) 567-8901",
      email: "jennifer.davis@example.com",
      address: "123 Pine Ave, Bellaire, TX 77401",
      type: "Individual",
      serviceHistory: 8,
      lastService: "2025-08-05",
      notes: "Has multiple vehicles.",
      membershipLevel: "Premium"
    },
    {
      id: 6,
      name: "Texas Auto Repair",
      phone: "(555) 678-9012",
      email: "service@texasautorepair.com",
      address: "876 Mechanic Blvd, Houston, TX 77008",
      type: "Business",
      serviceHistory: 25,
      lastService: "2025-08-07",
      notes: "Send monthly invoice. Preferred partner.",
      membershipLevel: "Enterprise"
    }
  ]);

  const [newCustomer, setNewCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    type: "Individual",
    notes: "",
    membershipLevel: "Standard"
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newCustomerRecord = {
      ...newCustomer,
      id: customers.length + 1,
      serviceHistory: 0,
      lastService: ""
    };
    
    setCustomers([...customers, newCustomerRecord]);
    setNewCustomer({
      name: "",
      phone: "",
      email: "",
      address: "",
      type: "Individual",
      notes: "",
      membershipLevel: "Standard"
    });
    setIsFormVisible(false);
  };

  // Filter customers based on search term and type filter
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm) ||
      customer.address.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesType = typeFilter === "all" || customer.type.toLowerCase() === typeFilter.toLowerCase();
    
    return matchesSearch && matchesType;
  });

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return dateString;
  };

  return (
    <div className="p-6">
      <div className="flex flex-wrap justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2 sm:mb-0">Customer Database</h1>
        <button
          onClick={() => setIsFormVisible(!isFormVisible)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {isFormVisible ? "Cancel" : "Add Customer"}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-semibold text-gray-700">Total Customers</h3>
          <p className="text-2xl font-bold text-blue-600">{customers.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-semibold text-gray-700">Individual Customers</h3>
          <p className="text-2xl font-bold text-green-600">
            {customers.filter(c => c.type === "Individual").length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-semibold text-gray-700">Business Customers</h3>
          <p className="text-2xl font-bold text-purple-600">
            {customers.filter(c => c.type === "Business").length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-semibold text-gray-700">Premium Members</h3>
          <p className="text-2xl font-bold text-amber-600">
            {customers.filter(c => c.membershipLevel !== "Standard").length}
          </p>
        </div>
      </div>

      {isFormVisible && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Add New Customer</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={newCustomer.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={newCustomer.phone}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="(555) 123-4567"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={newCustomer.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Customer Type</label>
                <select
                  name="type"
                  value={newCustomer.type}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="Individual">Individual</option>
                  <option value="Business">Business</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Membership Level</label>
                <select
                  name="membershipLevel"
                  value={newCustomer.membershipLevel}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="Standard">Standard</option>
                  <option value="Premium">Premium</option>
                  <option value="Enterprise">Enterprise</option>
                </select>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  name="address"
                  value={newCustomer.address}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  name="notes"
                  value={newCustomer.notes}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Additional information about this customer"
                ></textarea>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Save Customer
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setTypeFilter("all")}
                className={`px-3 py-1 rounded-lg ${typeFilter === "all" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}`}
              >
                All Customers
              </button>
              <button 
                onClick={() => setTypeFilter("individual")}
                className={`px-3 py-1 rounded-lg ${typeFilter === "individual" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700"}`}
              >
                Individuals
              </button>
              <button 
                onClick={() => setTypeFilter("business")}
                className={`px-3 py-1 rounded-lg ${typeFilter === "business" ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-700"}`}
              >
                Businesses
              </button>
            </div>
            
            <div className="w-full md:w-64">
              <input
                type="text"
                placeholder="Search customers..."
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service History</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                    <div className="text-xs text-gray-500">ID: {customer.id}</div>
                    <div className="text-xs">
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        customer.membershipLevel === 'Premium' ? 'bg-amber-100 text-amber-800' : 
                        customer.membershipLevel === 'Enterprise' ? 'bg-purple-100 text-purple-800' : 
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {customer.membershipLevel}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{customer.phone}</div>
                    <div className="text-sm text-gray-500">{customer.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${customer.type === 'Individual' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'}
                    `}>
                      {customer.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate" title={customer.address}>
                      {customer.address}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{customer.serviceHistory} services</div>
                    <div className="text-sm text-gray-500">Last: {formatDate(customer.lastService)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => setSelectedCustomer(customer)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      View
                    </button>
                    <button className="text-gray-600 hover:text-gray-900">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredCustomers.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            No customers found matching your criteria.
          </div>
        )}
      </div>
      
      {/* Customer Details Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">
                  Customer Details
                </h2>
                <button 
                  onClick={() => setSelectedCustomer(null)}
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
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{selectedCustomer.name}</h3>
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                      selectedCustomer.type === 'Individual' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'
                    }`}>
                      {selectedCustomer.type}
                    </span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    selectedCustomer.membershipLevel === 'Premium' ? 'bg-amber-100 text-amber-800' : 
                    selectedCustomer.membershipLevel === 'Enterprise' ? 'bg-purple-100 text-purple-800' : 
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {selectedCustomer.membershipLevel} Member
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-700 mb-2">Contact Information</h4>
                    <p className="text-sm mb-1"><span className="font-medium">Phone:</span> {selectedCustomer.phone}</p>
                    <p className="text-sm"><span className="font-medium">Email:</span> {selectedCustomer.email}</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-700 mb-2">Address</h4>
                    <p className="text-sm">{selectedCustomer.address}</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-700 mb-2">Service History</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600">Total Services:</span>
                      <span className="text-sm font-medium">{selectedCustomer.serviceHistory}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Last Service Date:</span>
                      <span className="text-sm font-medium">{formatDate(selectedCustomer.lastService)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-700 mb-2">Notes</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-800">{selectedCustomer.notes || "No notes available for this customer."}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between">
                <button 
                  onClick={() => setSelectedCustomer(null)} 
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                >
                  Close
                </button>
                <div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition mr-2">
                    Service History
                  </button>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                    Edit Customer
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

export default CustomerDatabase;
