import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import TrainingForm from './training/TrainingForm';
import TrainingCard from './training/TrainingCard';

function TrainingLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingLog, setEditingLog] = useState(null);
  
  // Example user for permissions
  const user = {
    id: '1',
    name: 'Test User',
    role: 'admin'
  };

  useEffect(() => {
    // This is where we would fetch training logs from Supabase
    // For now, we'll use sample data
    setLogs([
      { 
        id: 1, 
        employee_name: 'John Smith', 
        training_type: 'safety', 
        training_description: 'Safety Protocols', 
        training_date: '2025-07-15', 
        notes: 'Completed with excellence',
        hours_completed: 8,
        certification_number: 'CERT-123',
        expiration_date: '2026-07-15'
      },
      { 
        id: 2, 
        employee_name: 'Sarah Johnson', 
        training_type: 'equipment', 
        training_description: 'Equipment Operation', 
        training_date: '2025-07-20', 
        notes: 'Needs follow-up on winch operation',
        hours_completed: 6,
        certification_number: 'CERT-456',
        expiration_date: '2026-07-20'
      }
    ]);
    setLoading(false);
  }, []);

  const handleAddNew = () => {
    setEditingLog(null);
    setShowForm(true);
  };
  
  const handleCancel = () => {
    setShowForm(false);
    setEditingLog(null);
  };
  
  const handleSubmit = (formData) => {
    if (editingLog) {
      // Update existing log
      const updatedLogs = logs.map(log => 
        log.id === editingLog.id ? {...formData, id: log.id} : log
      );
      setLogs(updatedLogs);
    } else {
      // Add new log
      const newLog = {
        ...formData,
        id: logs.length + 1
      };
      setLogs([...logs, newLog]);
    }
    setShowForm(false);
    setEditingLog(null);
  };
  
  const handleEdit = (log) => {
    setEditingLog(log);
    setShowForm(true);
  };
  
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this training record?')) {
      setLogs(logs.filter(log => log.id !== id));
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Training Logs</h1>
        <button 
          onClick={handleAddNew}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          {showForm ? 'Cancel' : 'Add New Training'}
        </button>
      </div>
      
      {showForm && (
        <TrainingForm
          training={editingLog}
          user={user}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}
      
      {loading ? (
        <p>Loading logs...</p>
      ) : (
        <div className="space-y-4">
          {logs.length === 0 ? (
            <p>No training logs found. Add your first one!</p>
          ) : (
            logs.map(log => (
              <TrainingCard
                key={log.id}
                training={log}
                user={user}
                onEdit={() => handleEdit(log)}
                onDelete={() => handleDelete(log.id)}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default TrainingLogs;
