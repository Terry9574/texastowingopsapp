import React, { useState } from 'react';

function IncidentReports() {
  const [incidents, setIncidents] = useState([
    { id: 1, date: '2025-07-18', location: 'I-35 North, Mile 283', type: 'Vehicle Damage', description: 'Minor scratch to customer vehicle during hookup', reportedBy: 'Mike Wilson' },
    { id: 2, date: '2025-07-22', location: 'Downtown Austin, 6th St', type: 'Employee Injury', description: 'Operator experienced minor back strain while securing vehicle', reportedBy: 'David Johnson' }
  ]);
  
  const [newIncident, setNewIncident] = useState({
    date: '',
    location: '',
    type: '',
    description: '',
    reportedBy: ''
  });
  
  const handleInputChange = (e) => {
    setNewIncident({
      ...newIncident,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const newIncidentWithId = {
      ...newIncident,
      id: incidents.length + 1
    };
    setIncidents([...incidents, newIncidentWithId]);
    setNewIncident({ date: '', location: '', type: '', description: '', reportedBy: '' });
  };
  
  return (
    <div className="page-content">
      <h1>Incident Reports</h1>
      
      <section className="form-section">
        <h2>Report New Incident</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Date:</label>
            <input 
              type="date" 
              name="date" 
              value={newIncident.date} 
              onChange={handleInputChange} 
              required 
            />
          </div>
          
          <div className="form-group">
            <label>Location:</label>
            <input 
              type="text" 
              name="location" 
              value={newIncident.location} 
              onChange={handleInputChange} 
              required 
            />
          </div>
          
          <div className="form-group">
            <label>Incident Type:</label>
            <select 
              name="type" 
              value={newIncident.type} 
              onChange={handleInputChange} 
              required
            >
              <option value="">Select Type</option>
              <option value="Vehicle Damage">Vehicle Damage</option>
              <option value="Property Damage">Property Damage</option>
              <option value="Employee Injury">Employee Injury</option>
              <option value="Customer Complaint">Customer Complaint</option>
              <option value="Near Miss">Near Miss</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Description:</label>
            <textarea 
              name="description" 
              value={newIncident.description} 
              onChange={handleInputChange}
              required
            ></textarea>
          </div>
          
          <div className="form-group">
            <label>Reported By:</label>
            <input 
              type="text" 
              name="reportedBy" 
              value={newIncident.reportedBy} 
              onChange={handleInputChange} 
              required 
            />
          </div>
          
          <button type="submit" className="submit-btn">Submit Report</button>
        </form>
      </section>
      
      <section className="logs-section">
        <h2>Recent Incidents</h2>
        <table className="logs-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Location</th>
              <th>Type</th>
              <th>Description</th>
              <th>Reported By</th>
            </tr>
          </thead>
          <tbody>
            {incidents.map(incident => (
              <tr key={incident.id}>
                <td>{incident.date}</td>
                <td>{incident.location}</td>
                <td>{incident.type}</td>
                <td>{incident.description}</td>
                <td>{incident.reportedBy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default IncidentReports;
