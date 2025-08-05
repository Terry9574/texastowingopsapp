import React, { useState } from 'react';
import './App.css';

// Import components
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  
  // Function to render different pages
  const renderPage = () => {
    switch(currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'safety':
        return <div className="page-content"><h1>Safety Guidelines</h1><p>Safety guidelines content will appear here.</p></div>;
      case 'training':
        return <div className="page-content"><h1>Training Logs</h1><p>Training logs content will appear here.</p></div>;
      case 'incidents':
        return <div className="page-content"><h1>Incident Reporting</h1><p>Incident reporting content will appear here.</p></div>;
      case 'licenses':
        return <div className="page-content"><h1>License Management</h1><p>License management content will appear here.</p></div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="main-content">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}

export default App;
