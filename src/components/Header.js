import React from 'react';

function Header({ currentPage, setCurrentPage }) {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">Texas Towing Ops & Handbook</div>
        <nav className="nav">
          <div 
            className={`nav-item ${currentPage === 'dashboard' ? 'active' : ''}`}
            onClick={() => setCurrentPage('dashboard')}
          >
            Dashboard
          </div>
          <div 
            className={`nav-item ${currentPage === 'safety' ? 'active' : ''}`}
            onClick={() => setCurrentPage('safety')}
          >
            Safety Guidelines
          </div>
          <div 
            className={`nav-item ${currentPage === 'training' ? 'active' : ''}`}
            onClick={() => setCurrentPage('training')}
          >
            Training Logs
          </div>
          <div 
            className={`nav-item ${currentPage === 'incidents' ? 'active' : ''}`}
            onClick={() => setCurrentPage('incidents')}
          >
            Incident Reports
          </div>
          <div 
            className={`nav-item ${currentPage === 'licenses' ? 'active' : ''}`}
            onClick={() => setCurrentPage('licenses')}
          >
            License Management
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
