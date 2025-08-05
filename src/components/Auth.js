import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import '../styles/Auth.css';

function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [isAdminLogin, setIsAdminLogin] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    if (isSignUp) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role: isAdminLogin ? 'admin' : 'user',
          }
        }
      });
      
      if (error) {
        alert(error.message);
      } else {
        alert('Check your email for verification link!');
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        alert(error.message);
      }
    }
    
    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <div className="app-logo">
            <img src="/logo.png" alt="Texas Towing Ops" />
            <h1>Texas Towing Ops</h1>
          </div>
          <p className="app-description">Professional Handbook & Operations Management</p>
          <p className="app-version">Version 2.0.0</p>
        </div>
        
        <div className="auth-form-container">
          <h2>{isSignUp ? 'Create an Account' : 'Login to Your Account'}</h2>
          <form onSubmit={handleAuth}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            {isSignUp && (
              <div className="admin-login-toggle">
                <label>
                  <input 
                    type="checkbox" 
                    checked={isAdminLogin} 
                    onChange={() => setIsAdminLogin(!isAdminLogin)} 
                  />
                  Register as Administrator
                </label>
              </div>
            )}
            
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Please wait...' : isSignUp ? 'Sign Up' : 'Log In'}
            </button>
          </form>
          
          <div className="auth-footer">
            <p onClick={() => setIsSignUp(!isSignUp)} className="auth-toggle">
              {isSignUp ? 'Already have an account? Log In' : "Don't have an account? Sign Up"}
            </p>
            
            {!isSignUp && (
              <p className="forgot-password">
                Forgot your password?
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
export default Auth;
