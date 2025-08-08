import React from 'react';

function Handbook() {
  return (
    <div className="handbook-container">
      <h1 className="handbook-title">Company Handbook</h1>
      <p className="handbook-intro">
        Welcome to the Texas Towing Ops handbook. This document contains important safety 
        and operational guidelines for all staff members.
      </p>
      
      <div className="handbook-section">
        <h2>Safety First</h2>
        <ul>
          <li>Always wear appropriate safety gear including high-visibility vests</li>
          <li>Inspect all equipment before use</li>
          <li>Follow proper lifting techniques to prevent injury</li>
          <li>Be aware of surroundings at all times, especially in high-traffic areas</li>
          <li>Maintain a safe distance from moving vehicles</li>
          <li>Use proper lighting and signals when working on roadways</li>
        </ul>
      </div>

      <div className="handbook-section">
        <h2>Vehicle Operations</h2>
        <ul>
          <li>Perform pre-trip inspections before each shift</li>
          <li>Report any vehicle maintenance issues immediately</li>
          <li>Follow all traffic laws and regulations</li>
          <li>Maintain proper documentation for all tows</li>
          <li>Secure all vehicles properly before transport</li>
        </ul>
      </div>

      <div className="handbook-section">
        <h2>Customer Service</h2>
        <ul>
          <li>Treat all customers with respect and professionalism</li>
          <li>Clearly explain procedures and costs</li>
          <li>Document all customer interactions</li>
          <li>Handle complaints according to company policy</li>
          <li>Maintain a clean and professional appearance</li>
        </ul>
      </div>
    </div>
  );
}

export default Handbook;
