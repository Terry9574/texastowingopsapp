import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    if (isSignUp) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) alert(error.message);
      else alert('Check your email for verification link!');
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) alert(error.message);
    }
    
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <h2>{isSignUp ? 'Sign Up' : 'Log In'}</h2>
      <form onSubmit={handleAuth}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Log In'}
        </button>
      </form>
      <p onClick={() => setIsSignUp(!isSignUp)} className="auth-toggle">
        {isSignUp ? 'Already have an account? Log In' : "Don't have an account? Sign Up"}
      </p>
    </div>
  );
}

export default Auth;
