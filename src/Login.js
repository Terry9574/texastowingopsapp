import React, { useState } from 'react';

function Login({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const handleLogin = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    
    // For testing/demo purposes - allow any login
    const user = {
      email,
      full_name: email.split('@')[0],
      custom_role: 'owner',
      company_name: 'Texas Towing Ops',
      logo_url: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?w=100&h=100&fit=crop&crop=center'
    };
    
    // Store in localStorage
    localStorage.setItem('user', JSON.stringify(user));
    
    // Update app state
    setUser(user);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <span className="text-2xl text-white">🚚</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Texas Towing Ops</h1>
          <p className="text-slate-600">Sign in to your account</p>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-6">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
              <p>{error}</p>
            </div>
          )}
          
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-slate-700 text-sm font-medium mb-2" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-slate-700 text-sm font-medium mb-2" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Sign In
              </button>
            </div>
          </form>
          
          <div className="mt-4 text-center">
            <p className="text-sm text-slate-600">
              Demo mode: Enter any email and password
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
