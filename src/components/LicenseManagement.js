import React, { useState } from 'react';

function LicenseManagement() {
  const [licenses, setLicenses] = useState([
    { id: 1, employeeName: 'John Smith', licenseType: 'CDL Class A', licenseNumber: 'TX12345678', expiration: '2026-05-15', status: 'Active' },
    { id: 2, employeeName: 'Sarah Johnson', licenseType: 'Tow Operator', licenseNumber: 'TOW987654', expiration: '2025-11-30', status: 'Active' },
    { id: 3, employeeName: 'Mike Wilson', licenseType: 'CDL Class B', licenseNumber: 'TX55667788', expiration: '2025-09-22', status: 'Renewal Needed' }
  ]);
  
  const [newLicense, setNewLicense] = useState({
    employeeName: '',
    licenseType: '',
    licenseNumber: '',
    expiration: '',
    status: 'Active'
  });
  
  const handleInputChange = (e) => {
    setNewLicense({
      ...newLicense,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const newLicenseWithId = {
      ...newLicense,
      id: licenses.length + 1
    };
    setLicenses([...licenses, newLicenseWithId]);
    setNewLicense({ employeeName: '', licenseType: '', licenseNumber: '', expiration: '', status: 'Active' });
  };
  
  return (
    <div className="page-content">
      <h1>License Management</h1>
      
      <section className="form-section">
        <h2>Add New License</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Employee Name:</label>
            <input 
              type="text" 
              name="employeeName" 
              value={newLicense.employeeName} 
              onChange={handleInputChange} 
              required 
            />
          </div>
          
          <div className="form-group">
            <label>License Type:</label>
            <select 
              name="licenseType" 
              value={newLicense.licenseType} 
              onChange={handleInputChange} 
              required
            >
              <option value="">Select Type</option>
              <option value="CDL Class A">CDL Class A</option>
              <option value="CDL Class B">CDL Class B</option>
              <option value="CDL Class C">CDL Class C</option>
              <option value="Tow Operator">Tow Operator</option>
              <option value="TDLR License">TDLR License</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>License Number:</label>
            <input 
              type="text" 
              name="licenseNumber" 
              value={newLicense.licenseNumber} 
              onChange={handleInputChange} 
              required 
            />
          </div>
          
          <div className="form-group">
            <label>Expiration Date:</label>
            <input 
              type="date" 
              name="expiration" 
              value={newLicense.expiration} 
              onChange={handleInputChange} 
              required 
            />
          </div>
          
          <div className="form-group">
            <label>Status:</label>
            <select 
              name="status" 
              value={newLicense.status} 
              onChange={handleInputChange}
            >
              <option value="Active">Active</option>
              <option value="Renewal Needed">Renewal Needed</option>
              <option value="Expired">Expired</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>
          
          <button type="submit" className="submit-btn">Add License</button>
        </form>
      </section>
      
      <section className="logs-section">
        <h2>License Records</h2>
        <table className="logs-table">
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>License Type</th>
              <th>License Number</th>
              <th>Expiration Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {licenses.map(license => (
              <tr key={license.id}>
                <td>{license.employeeName}</td>
                <td>{license.licenseType}</td>
                <td>{license.licenseNumber}</td>
                <td>{license.expiration}</td>
                <td>{license.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default LicenseManagement;
