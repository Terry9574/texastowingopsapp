import React, { useState } from 'react';

function LicenseVault() {
  const [licenses, setLicenses] = useState([
    {
      id: 1,
      driverName: "Michael Johnson",
      licenseNumber: "TX-78943215",
      expiration: "2026-04-15",
      state: "Texas",
      type: "CDL Class A",
      endorsements: "Hazmat, Tanker",
      restrictions: "Corrective Lenses",
      status: "Active",
      medicalExpiration: "2025-10-22",
      lastUploaded: "2025-03-10",
      documentUrl: "#"
    },
    {
      id: 2,
      driverName: "Sarah Williams",
      licenseNumber: "TX-65432198",
      expiration: "2025-11-08",
      state: "Texas",
      type: "CDL Class B",
      endorsements: "Passenger",
      restrictions: "None",
      status: "Active",
      medicalExpiration: "2025-09-15",
      lastUploaded: "2025-04-22",
      documentUrl: "#"
    },
    {
      id: 3,
      driverName: "David Martinez",
      licenseNumber: "TX-12785634",
      expiration: "2025-09-30",
      state: "Texas",
      type: "CDL Class A",
      endorsements: "Hazmat, Tanker, Double/Triple",
      restrictions: "None",
      status: "Active",
      medicalExpiration: "2025-09-05",
      lastUploaded: "2025-02-18",
      documentUrl: "#"
    },
    {
      id: 4,
      driverName: "Emily Rodriguez",
      licenseNumber: "TX-98732145",
      expiration: "2025-10-12",
      state: "Texas",
      type: "CDL Class B",
      endorsements: "Passenger, School Bus",
      restrictions: "None",
      status: "Expiring Soon",
      medicalExpiration: "2025-08-25",
      lastUploaded: "2025-05-01",
      documentUrl: "#"
    },
    {
      id: 5,
      driverName: "James Taylor",
      licenseNumber: "TX-56473829",
      expiration: "2025-12-05",
      state: "Texas",
      type: "CDL Class A",
      endorsements: "Hazmat",
      restrictions: "Corrective Lenses",
      status: "Active",
      medicalExpiration: "2025-10-18",
      lastUploaded: "2025-04-30",
      documentUrl: "#"
    }
  ]);

  const [newLicense, setNewLicense] = useState({
    driverName: "",
    licenseNumber: "",
    expiration: "",
    state: "Texas",
    type: "",
    endorsements: "",
    restrictions: "None",
    status: "Active",
    medicalExpiration: "",
    lastUploaded: new Date().toISOString().split('T')[0],
    documentUrl: "#"
  });

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Calculate days until expiration
  const daysUntilExpiration = (expirationDate) => {
    const today = new Date();
    const expDate = new Date(expirationDate);
    const diffTime = expDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Calculate license status
  const calculateStatus = (expirationDate, medicalExpirationDate) => {
    const licenseExpDays = daysUntilExpiration(expirationDate);
    const medicalExpDays = daysUntilExpiration(medicalExpirationDate);
    
    if (licenseExpDays < 0 || medicalExpDays < 0) {
      return "Expired";
    } else if (licenseExpDays <= 30 || medicalExpDays <= 30) {
      return "Expiring Soon";
    } else {
      return "Active";
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLicense(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const status = calculateStatus(newLicense.expiration, newLicense.medicalExpiration);
    
    const formattedLicense = {
      ...newLicense,
      id: licenses.length + 1,
      status: status,
    };
    
    setLicenses([...licenses, formattedLicense]);
    setNewLicense({
      driverName: "",
      licenseNumber: "",
      expiration: "",
      state: "Texas",
      type: "",
      endorsements: "",
      restrictions: "None",
      status: "Active",
      medicalExpiration: "",
      lastUploaded: new Date().toISOString().split('T')[0],
      documentUrl: "#"
    });
    setIsFormVisible(false);
  };

  // Filter by search term and status
  const filteredLicenses = licenses.filter(license => {
    const matchesSearch = 
      license.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      license.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      license.type.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = statusFilter === "all" || license.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  // Sample data for dropdowns
  const drivers = ["Michael Johnson", "Sarah Williams", "David Martinez", "Emily Rodriguez", "James Taylor"];
  const licenseTypes = ["CDL Class A", "CDL Class B", "CDL Class C", "Regular Class C"];
  const endorsements = ["Hazmat", "Tanker", "Passenger", "School Bus", "Double/Triple"];
  const restrictions = ["None", "Corrective Lenses", "Automatic Transmission Only", "Intrastate Only"];
  const states = ["Texas", "Oklahoma", "Louisiana", "Arkansas", "New Mexico"];

  return (
    <div className="p-6">
      <div className="flex flex-wrap justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2 sm:mb-0">License Vault</h1>
        <button
          onClick={() => setIsFormVisible(!isFormVisible)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {isFormVisible ? "Cancel" : "Add License"}
        </button>
      </div>

      {isFormVisible && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Add New Driver License</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Driver Name</label>
                <select
                  name="driverName"
                  value={newLicense.driverName}
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
                <label className="block text-sm font-medium text-gray-700 mb-1">License Number</label>
                <input
                  type="text"
                  name="licenseNumber"
                  value={newLicense.licenseNumber}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="e.g. TX-12345678"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                <select
                  name="state"
                  value={newLicense.state}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  {states.map((state, index) => (
                    <option key={index} value={state}>{state}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">License Type</label>
                <select
                  name="type"
                  value={newLicense.type}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select License Type</option>
                  {licenseTypes.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">License Expiration</label>
                <input
                  type="date"
                  name="expiration"
                  value={newLicense.expiration}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Medical Card Expiration</label>
                <input
                  type="date"
                  name="medicalExpiration"
                  value={newLicense.medicalExpiration}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Endorsements</label>
                <select
                  multiple
                  name="endorsements"
                  value={newLicense.endorsements.split(", ").filter(e => e !== "")}
                  onChange={(e) => {
                    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
                    setNewLicense({
                      ...newLicense,
                      endorsements: selectedOptions.join(", ")
                    });
                  }}
                  className="w-full p-2 border border-gray-300 rounded-md h-24"
                >
                  {endorsements.map((endorsement, index) => (
                    <option key={index} value={endorsement}>{endorsement}</option>
                  ))}
                </select>
                <p className="mt-1 text-xs text-gray-500">Hold Ctrl/Cmd to select multiple</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Restrictions</label>
                <select
                  name="restrictions"
                  value={newLicense.restrictions}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  {restrictions.map((restriction, index) => (
                    <option key={index} value={restriction}>{restriction}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Upload Document</label>
                <input
                  type="file"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  disabled
                />
                <p className="mt-1 text-xs text-gray-500">File upload functionality coming soon</p>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Save License
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
                onClick={() => setStatusFilter("active")}
                className={`px-3 py-1 rounded-lg ${statusFilter === "active" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700"}`}
              >
                Active
              </button>
              <button 
                onClick={() => setStatusFilter("expiring soon")}
                className={`px-3 py-1 rounded-lg ${statusFilter === "expiring soon" ? "bg-yellow-500 text-white" : "bg-gray-100 text-gray-700"}`}
              >
                Expiring Soon
              </button>
              <button 
                onClick={() => setStatusFilter("expired")}
                className={`px-3 py-1 rounded-lg ${statusFilter === "expired" ? "bg-red-600 text-white" : "bg-gray-100 text-gray-700"}`}
              >
                Expired
              </button>
            </div>
            
            <div className="w-full md:w-64">
              <input
                type="text"
                placeholder="Search licenses..."
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">License</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Medical Card</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLicenses.map((license) => {
                // Recalculate status on render to ensure it's up to date
                const currentStatus = calculateStatus(license.expiration, license.medicalExpiration);
                const licenseDays = daysUntilExpiration(license.expiration);
                const medicalDays = daysUntilExpiration(license.medicalExpiration);
                
                return (
                  <tr key={license.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">{license.driverName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{license.licenseNumber}</div>
                      <div className="text-sm text-gray-500">{license.state}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{license.type}</div>
                      <div className="text-sm text-gray-500">
                        {license.endorsements ? (
                          <span title={license.endorsements}>Endorsements: {license.endorsements.length > 15 ? `${license.endorsements.substring(0, 15)}...` : license.endorsements}</span>
                        ) : "No endorsements"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{license.expiration}</div>
                      <div className={`text-xs ${
                        licenseDays < 0 ? 'text-red-600' : 
                        licenseDays <= 30 ? 'text-yellow-600' : 
                        'text-green-600'
                      }`}>
                        {licenseDays < 0 ? `Expired ${Math.abs(licenseDays)} days ago` : 
                         licenseDays === 0 ? 'Expires today' : 
                         `${licenseDays} days remaining`}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{license.medicalExpiration}</div>
                      <div className={`text-xs ${
                        medicalDays < 0 ? 'text-red-600' : 
                        medicalDays <= 30 ? 'text-yellow-600' : 
                        'text-green-600'
                      }`}>
                        {medicalDays < 0 ? `Expired ${Math.abs(medicalDays)} days ago` : 
                         medicalDays === 0 ? 'Expires today' : 
                         `${medicalDays} days remaining`}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${currentStatus === 'Active' ? 'bg-green-100 text-green-800' : ''}
                        ${currentStatus === 'Expiring Soon' ? 'bg-yellow-100 text-yellow-800' : ''}
                        ${currentStatus === 'Expired' ? 'bg-red-100 text-red-800' : ''}
                      `}>
                        {currentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a href="#" className="text-blue-600 hover:text-blue-900 mr-3">View</a>
                      <a href="#" className="text-green-600 hover:text-green-900 mr-3">Renew</a>
                      <a href="#" className="text-gray-600 hover:text-gray-900">Edit</a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredLicenses.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            No license records found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
}

export default LicenseVault;
