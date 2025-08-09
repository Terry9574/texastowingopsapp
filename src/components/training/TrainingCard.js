import React from 'react';

const TrainingCard = ({ training, onMarkComplete }) => {
  const { id, title, date, description, instructor, completed } = training;
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${completed ? 'border-green-500' : 'border-yellow-500'}`}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        {completed ? (
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
            Completed
          </span>
        ) : (
          <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
            Pending
          </span>
        )}
      </div>
      
      <p className="text-sm text-gray-600 mb-4">{formatDate(date)}</p>
      <p className="text-gray-700 mb-4">{description}</p>
      <p className="text-sm font-medium mb-6">Instructor: {instructor}</p>
      
      {!completed && (
        <button
          onClick={() => onMarkComplete(id)}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Mark as Completed
        </button>
      )}
    </div>
  );
};

export default TrainingCard;
