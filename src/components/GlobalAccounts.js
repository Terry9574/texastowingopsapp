import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import '../styles/GlobalAccounts.css';

function GlobalAccounts() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newAccount, setNewAccount] = useState({
    company_name: '',
    owner_name: '',
    email: '',
    phone: '',
    subscription_tier: 'basic',
    status: 'active'
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchAccounts();
  }, []);

  async function fetchAccounts() {
    try {
      setLoading(true);
      // This will need to be connected to your Supabase database
      // For now using mock data
      const mockAccounts = [
        {
          id: 1,
          company_name: 'ABC Towing Services',
          owner_name: 'John Smith',
          email: 'john@abctowing.com',
          phone: '(512) 555-1234',
          subscription_tier: 'premium',
          status: 'active',
          created_at: '2025-06-15'
        },
        {
          id: 2,
          company_name: 'QuickTow Inc.',
          owner_name: 'Sarah Johnson',
          email: 'sarah@quicktow.com',
          phone: '(713) 555-5678',
          subscription_tier: 'basic',
          status: 'active',
          created_at: '2025-07-02'
        },
        {
          id: 3,
          company_name: 'Austin Road Assistance',
          owner_name: 'Mike Wilson',
          email: 'mike@austinroad.com',
          phone: '(512) 555-9876',
          subscription_tier: 'standard',
          status: 'suspended',
          created_at: '2025-05-20'
        }
      ];
      setAccounts(mockAccounts);
    } catch (error) {
      console.error('Error fetching accounts:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleInputChange = (e) => {
    setNewAccount({
      ...newAccount,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // In a real app, this would save to Supabase
    const newAccountWithId = {
      ...newAccount,
      id: accounts.length + 1,
      created_at: new Date().toISOString().split('T')[0]
    };
    
    setAccounts([...accounts, newAccountWithId]);
    setNewAccount({
      company_name: '',
      owner_name: '',
      email: '',
      phone: '',
      subscription_tier: 'basic',
      status: 'active'
    });
    setShowForm(false);
  };

  return (
    <div className="global-accounts">
      <div className="page-header">
        <h1>Global Account Management</h1>
        <div className="header-actions">
          <button 
            className="add-account-btn"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Cancel' : 'Add New Account'}
          </button>
        </div>
      </div>
      
      <div className="admin-badge">
        <i className="fas fa-key"></i>
        <div className="admin-message">global_admin_access</div>
        <div className="admin-description">You have access to manage all client accounts</div>
      </div>
      
      {showForm && (
        <div className="account-form-container">
          <h2>Create New Account</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Company Name</label>
              <input
                type="text"
                name="company_name"
                value={newAccount.company_name}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Owner Name</label>
              <input
                type="text"
                name="owner_name"
                value={newAccount.owner_name}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={newAccount.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={newAccount.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Subscription Tier</label>
                <select
                  name="subscription_tier"
                  value={newAccount.subscription_tier}
                  onChange={handleInputChange}
                >
                  <option value="basic">Basic</option>
                  <option value="standard">Standard</option>
                  <option value="premium">Premium</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Status</label>
                <select
                  name="status"
                  value={newAccount.status}
                  onChange={handleInputChange}
                >
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
            </div>
            
            <div className="form-actions">
              <button type="submit" className="submit-btn">Create Account</button>
            </div>
          </form>
        </div>
      )}
      
      <div className="accounts-list">
        <h2>All Client Accounts</h2>
        
        {loading ? (
          <p>Loading accounts...</p>
        ) : (
          <table className="accounts-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Owner</th>
                <th>Contact</th>
                <th>Subscription</th>
                <th>Status</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map(account => (
                <tr key={account.id}>
                  <td>{account.company_name}</td>
                  <td>{account.owner_name}</td>
                  <td>
                    {account.email}<br />
                    {account.phone}
                  </td>
                  <td>
                    <span className={`subscription-badge ${account.subscription_tier}`}>
                      {account.subscription_tier}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${account.status}`}>
                      {account.status}
                    </span>
                  </td>
                  <td>{account.created_at}</td>
                  <td>
                    <div className="account-actions">
                      <button className="action-btn view-btn">
                        <i className="fas fa-eye"></i>
                      </button>
                      <button className="action-btn edit-btn">
                        <i className="fas fa-edit"></i>
                      </button>
                      <button className="action-btn login-btn">
                        <i className="fas fa-sign-in-alt"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default GlobalAccounts;
