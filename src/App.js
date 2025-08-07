import React from 'react';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Texas Towing Ops</h1>
        <p>Professional Handbook & Operations Management</p>
      </header>
      <main className="app-content">
        <div className="login-box">
          <h2>Welcome</h2>
          <p>Simple demo version</p>
          <button className="login-button">
            Demo Login
          </button>
        </div>
      </main>
      <footer className="app-footer">
        <p>© 2025 Texas Towing Ops & Handbook</p>
      </footer>
    </div>
  );
}

export default App;
