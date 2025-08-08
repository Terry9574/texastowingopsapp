import React, { useState } from 'react';

function TrainingLogs() {
  const [logs, setLogs] = useState([
    {
      id: 1,
      driverName: "Michael Johnson",
      trainingType: "Safety Procedures",
      completionDate: "2024-07-15",
      instructor: "Robert Smith",
      score: 95,
      status: "Completed"
    },
    {
      id: 2,
      driverName: "Sarah Williams",
      trainingType: "Equipment Operation",
      completionDate: "2024-07-12",
      instructor: "Robert Smith",
      score: 88,
      status: "Completed"
    },
    {
      id: 3,
      driverName: "David Martinez",
      trainingType: "Traffic Laws",
      completionDate: "",
      instructor: "Robert Smith",
      score: null,
      status: "Scheduled"
    },
    {
      id: 4,
      driverName: "Emily Rodriguez",
      trainingType: "Hazardous Materials",
      completionDate: "2024-06-28",
      instructor: "Amanda Wilson",
      score: 92,
      status: "Completed"
    },
    {
      id: 5,
      driverName: "James Taylor",
      trainingType: "Customer Service",
      completionDate: "2024-07-05",
      instructor: "Amanda Wilson",
      score: 90,
      status: "Completed"
    }
  ]);

  const [newLog, setNewLog] = useState({
    driverName: "",
    trainingType: "",
    completionDate: "",
    instructor: "",
    score: "",
    status: "Scheduled"
  });

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLog(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formattedLog = {
      ...newLog,
      id: logs.length + 1,
      score: newLog.score ? parseInt(newLog.score) : null,
    };
    
    setLogs([...logs, formattedLog]);
    setNewLog({
      driverName: "",
      trainingType: "",
      completionDate: "",
      instructor: "",
      score: "",
      status: "Scheduled"
    });
    setIsFormVisible(false);
  };

  const filteredLogs = logs.filter(log => 
    log.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.trainingType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const trainingTypes = [
    "Safety Procedures",
    "Equipment Operation",
    "Traffic Laws",
    "Hazardous Materials",
    "Customer Service",
    "Defensive Driving",
    "First Aid",
    "Emergency Protocols"
  ];

  const instructors = [
    "Robert Smith",
    "Amanda Wilson",
    "Thomas Brown",
    "Jennifer Davis"
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Training Logs</h1>
        <button
          onClick={() => setIsFormVisible(!isFormVisible)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {isFormVisible ? "Cancel" : "Add Training Log"}
        </button>
      </div>

      {isFormVisible && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Add New Training Log</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Driver Name</label>
                <input
                  type="text"
                  name="driverName"
                  value={newLog.driverName}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Training Type</label>
                <select
                  name="trainingType"
                  value={newLog.trainingType}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select Training Type</option>
                  {trainingTypes.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Completion Date</label>
                <input
                  type="date"
                  name="completionDate"
                  value={newLog.completionDate}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Instructor</label>
                <select
                  name="instructor"
                  value={newLog.instructor}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select Instructor</option>
                  {instructors.map((instructor, index) => (
                    <option key={index} value={instructor}>{instructor}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Score</label>
                <input
                  type="number"
                  name="score"
                  min="0"
                  max="100"
                  value={newLog.score}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  name="status"
                  value={newLog.status}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="Scheduled">Scheduled</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Failed">Failed</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Save Training Log
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b">
          <input
            type="text"
            placeholder="Search training logs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Driver</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Training Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Instructor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{log.driverName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{log.trainingType}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{log.completionDate || "Not completed"}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{log.instructor}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {log.score !== null ? `${log.score}%` : "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${log.status === 'Completed' ? 'bg-green-100 text-green-800' : ''}
                      ${log.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' : ''}
                      ${log.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' : ''}
                      ${log.status === 'Failed' ? 'bg-red-100 text-red-800' : ''}
                    `}>
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredLogs.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            No training logs found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}

export default TrainingLogs;
