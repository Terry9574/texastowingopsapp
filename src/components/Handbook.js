import React from 'react';

function Handbook() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Company Handbook</h1>
      <p>Welcome to the Texas Towing Ops handbook. This document contains important safety and operational guidelines.</p>
      
      <div style={{ marginTop: '20px', backgroundColor: 'white', padding: '15px', borderRadius: '8px' }}>
        <h2>Safety First</h2>
        <ul>
          <li>Always wear appropriate safety gear including high-visibility vests</li>
          <li>Inspect all equipment before use</li>
          <li>Follow proper lifting techniques to prevent injury</li>
          <li>Be aware of surroundings at all times, especially in high-traffic areas</li>
        </ul>
      </div>
    </div>
  );
}

export default Handbook;
