import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import './App.css';
import './styles/fontawesome.css'; // We'll need to add FontAwesome icons
import Auth from './components/Auth';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import GlobalAccounts from './components/GlobalAccounts';
import Handbook from './components/Handbook';
import TrainingLogs from './components/TrainingLogs';
import DailyInspections from './components/DailyInspections';
import IncidentReports from './components/IncidentReports';
import LicenseVault from './components/LicenseVault';
import DispatchSystem from './components/DispatchSystem';
import DriverCalls from './components/DriverCalls';
import ImpoundFacility from './components/ImpoundFacility';
import CustomerBilling from './components/CustomerBilling';
import TowTruckInventory from './components/TowTruckInventory';

function App() {
  const [session, setSession] = useState(null);
  const [activePage, setActivePage] = useState('dashboard');
  const [userRole, setUserRole] = useState('user'); // 'user', 'admin', or 'global_admin'
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check for active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        fetchUserRole(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        if (session) {
          fetchUserRole(session.user.id);
        } else {
          setUserRole('user');
          setLoading(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);
  
  async function fetchUserRole(userId) {
    try {
      // This will need to be implemented with your Supabase setup
      const { data, error } = await supabase
        .from('user_profiles')
        .select('role')
        .eq('id', userId)
        .single();
        
      if (error) throw error;
      
      if (data) {
        setUserRole(data.role);
      } else {
        // Default to regular user if no profile found
        setUserRole('user');
      }
    } catch (error) {
      console.error('Error fetching user role:', error);
      setUserRole('user'); // Default to regular user on error
    } finally {
      setLoading(false);
    }
  }

  // Function to render current page content
  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard userRole={userRole} />;
      case 'global-accounts':
        return userRole === 'global_admin' ? <GlobalAccounts /> : <Dashboard userRole={userRole} />;
      case 'handbook':
        return <Handbook />;
      case 'training-logs':
        return <TrainingLogs userRole={userRole} />;
      case 'daily-inspections':
        return <DailyInspections userRole={userRole} />;
      case 'incident-reports':
        return <IncidentReports userRole={userRole} />;
      case 'license-vault':
        return <LicenseVault userRole={userRole} />;
      case 'dispatch-system':
        return <DispatchSystem userRole={userRole} />;
      case 'driver-calls':
        return <DriverCalls userRole={userRole} />;
      case 'impound-facility':
        return <ImpoundFacility userRole={userRole} />;
      case 'customer-billing':
        return <CustomerBilling userRole={userRole} />;
      case 'tow-truck-inventory':
        return <TowTruckInventory userRole={userRole} />;
      // Add more cases for other pages
      default:
        return <Dashboard userRole={userRole} />;
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="app">
      {!session ? (
        <Auth />
      ) : (
        <Layout activePage={activePage} setActivePage={setActivePage}>
          {renderPage()}
        </Layout>
      )}
    </div>
  );
}

export default App;);
  
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
