import React, { useState, useEffect } from 'react';
import './App.css';
import { supabase } from './supabaseClient';

// Import components
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import Auth from './components/Auth';
import SafetyGuidelines from './components/SafetyGuidelines';
import TrainingLogs from './components/TrainingLogs';
import IncidentReports from './components/IncidentReports';
import LicenseManagement from './components/LicenseManagement';

function App() {
  const [session, setSession] = useState(null);
  const [currentPage, setCurrentPage] = useState('dashboard');
  
  useEffect(() => {
    // Check for active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Function to render different pages
  const renderPage = () => {
    switch(currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'safety':
        return <SafetyGuidelines />;
      case 'training':
        return <TrainingLogs />;
      case 'incidents':
        return <IncidentReports />;
      case 'licenses':
        return <LicenseManagement />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} session={session} />
      <main className="main-content">
        {!session ? <Auth /> : renderPage()}
      </main>
      <Footer />
    </div>
  );
}

export default App;
