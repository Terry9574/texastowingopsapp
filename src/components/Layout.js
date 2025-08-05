import React from 'react';
import Sidebar from './Sidebar';
import '../styles/Layout.css';

function Layout({ children, activePage, setActivePage }) {
  return (
    <div className="app-layout">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <div className="main-content">
        {children}
      </div>
    </div>
  );
}

export default Layout;
