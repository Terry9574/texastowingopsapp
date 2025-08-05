import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

function TrainingLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newLog, setNewLog] = useState({
    employeeName: '',
    trainingType: '',
    completionDate: '',
    notes: ''
  });

  useEffect(() => {
    // This is where we would fetch training logs from Supabase
    // For now, we'll use sample data
    setLogs([
      { id: 1, employeeName: 'John Smith', trainingType: 'Safety Protocols', completionDate: '2025-07-15', notes: 'Completed with excellence' },
      { id: 2, employeeName: 'Sarah Johnson', trainingType: 'Equipment Operation', completionDate: '2025-07-20', notes: 'Needs follow-up on winch operation' }
    ]);
    setLoading(false);
  }, []);

  const handleInputChange = (e) => {
    setNewLog({
      ...newLog,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here we would submit to Supabase
    // For now just add to local state
    const newLogWithId = {
      ...newLog,
      id: logs.length + 1
    };
    setLogs([...logs, newLogWithId]);
    setNewLog({ employeeName: '', trainingType: '', completionDate: '', notes: '' });
  };

  return (
    <div className="page-content">
      <h1>Training Logs</h1>
      
      <section className="form-section">
        <h2>Add New Training Record</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Employee Name:</label>
            <input 
              type="text" 
              name="employeeName" 
              value={newLog.employeeName} 
              onChange={handleInputChange} 
              required 
            />
          </div>
          
          <div className="form-group">
            <label>Training Type:</label>
            <select 
              name="trainingType" 
              value={newLog.trainingType} 
              onChange={handleInputChange} 
              required
            >
              <option value="">Select Type</option>
              <option value="Safety Protocols">Safety Protocols</option>
              <option value="Equipment Operation">Equipment Operation</option>
              <option value="Legal Requirements">Legal Requirements</option>
              <option value="Customer Service">Customer Service</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Completion Date:</label>
            <input 
              type="date" 
              name="completionDate" 
              value={newLog.completionDate} 
              onChange={handleInputChange} 
              required 
            />
          </div>
          
          <div className="form-group">
            <label>Notes:</label>
            <textarea 
              name="notes" 
              value={newLog.notes} 
              onChange={handleInputChange}
            ></textarea>
          </div>
          
          <button type="submit" className="submit-btn">Add Training Log</button>
        </form>
      </section>
      
      <section className="logs-section">
        <h2>Recent Training Logs</h2>
        {loading ? (
          <p>Loading logs...</p>
        ) : (
          <table className="logs-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Training Type</th>
                <th>Completion Date</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {logs.map(log => (
                <tr key={log.id}>
                  <td>{log.employeeName}</td>
                  <td>{log.trainingType}</td>
                  <td>{log.completionDate}</td>
                  <td>{log.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}

export default TrainingLogs;
