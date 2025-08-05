import React from 'react';
import { supabase } from '../supabaseClient';

function Header({ currentPage, setCurrentPage, session }) {
  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">Texas Towing Ops & Handbook</div>
        {session ? (
          <>
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
              <div className="nav-item" onClick={handleSignOut}>
                Sign Out
              </div>
            </nav>
          </>
        ) : (
          <div>Please log in</div>
        )}
      </div>
    </header>
  );
}

export default Header;
