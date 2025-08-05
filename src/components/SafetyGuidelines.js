import React from 'react';

function SafetyGuidelines() {
  return (
    <div className="page-content">
      <h1>Safety Guidelines</h1>
      
      <section className="safety-section">
        <h2>General Safety Protocols</h2>
        <ul>
          <li>Always wear appropriate PPE (Personal Protective Equipment)</li>
          <li>Perform vehicle inspection before beginning any towing operation</li>
          <li>Follow proper lifting and securing procedures</li>
          <li>Maintain at least 10 feet distance from electrical lines</li>
          <li>Use proper signaling and lighting when operating on roadways</li>
        </ul>
      </section>
      
      <section className="safety-section">
        <h2>Emergency Procedures</h2>
        <p>In case of emergency:</p>
        <ol>
          <li>Secure the scene</li>
          <li>Call emergency services if needed (911)</li>
          <li>Contact dispatch</li>
          <li>Document the incident</li>
        </ol>
      </section>
    </div>
  );
}

export default SafetyGuidelines;
