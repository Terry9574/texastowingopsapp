import React, { useState, useEffect } from 'react';
import TrainingCard from './training/TrainingCard';
import TrainingForm from './training/TrainingForm';

const TrainingLogs = () => {
  const [showForm, setShowForm] = useState(false);
  const [trainingLogs, setTrainingLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Sample data for development
  useEffect(() => {
    const sampleData = [
      {
        id: 1,
        title: 'Safety Protocol Training',
        date: '2023-06-15',
        description: 'Annual safety procedures review covering emergency protocols and equipment handling.',
        instructor: 'John Smith',
        completed: true
      },
      {
        id: 2,
        title: 'Heavy Vehicle Operation',
        date: '2023-07-22',
        description: 'Training on proper operation of heavy towing vehicles and equipment.',
        instructor: 'Michael Johnson',
        completed: true
      },
      {
        id: 3,
        title: 'Customer Service Skills',
        date: '2023-08-10',
        description: 'Workshop on communication, conflict resolution, and professional customer interaction.',
        instructor: 'Sarah Williams',
        completed: false
      }
    ];
    
    setTrainingLogs(sampleData);
    setIsLoading(false);
  }, []);
  
  const handleAddTraining = (newTraining) => {
    // Add ID to new training (would normally be done by backend)
    const trainingWithId = {
      ...newTraining,
      id: trainingLogs.length + 1,
      completed: false
    };
    
    setTrainingLogs([...trainingLogs, trainingWithId]);
    setShowForm(false);
  };
  
  const handleToggleForm = () => {
    setShowForm(!showForm);
  };
  
  const handleMarkComplete = (id) => {
    setTrainingLogs(trainingLogs.map(log => 
      log.id === id ? {...log, completed: true} : log
    ));
  };
  
  if (isLoading) {
    return <div className="container mx-auto p-4">Loading training logs...</div>;
  }
  
  return (
    <div className="container mx-auto p-4">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Training Logs</h1>
        <button 
          onClick={handleToggleForm}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {showForm ? 'Cancel' : 'Add New Training'}
        </button>
      </div>
      
      {showForm && (
        <div className="mb-8 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Add New Training</h2>
          <TrainingForm onSubmit={handleAddTraining} />
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trainingLogs.map(log => (
          <TrainingCard 
            key={log.id} 
            training={log} 
            onMarkComplete={handleMarkComplete} 
          />
        ))}
      </div>
      
      {trainingLogs.length === 0 && !showForm && (
        <div className="text-center py-8">
          <p className="text-gray-500">No training logs found. Click 'Add New Training' to create one.</p>
        </div>
      )}
    </div>
  );
};

export default TrainingLogs;
