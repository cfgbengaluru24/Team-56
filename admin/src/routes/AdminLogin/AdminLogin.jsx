import React, { useState, useContext } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../fbconfig';
import { Context } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';
import './AdminLogin.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(Context);
  const auth = getAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Query Firestore for admin emails
      const adminQuery = query(collection(db, 'admin'), where('email', '==', email));
      const querySnapshot = await getDocs(adminQuery);

      if (!querySnapshot.empty) {
        // If there's a match, it means the user is an admin
        setUser(user);
        console.log('Login successful');

        // Navigate to the admin dashboard or any other page
        navigate('/');
      } else {
        setError('Unauthorized access');
        await auth.signOut(); // Sign out the user if not authorized
      }
    } catch (error) {
      setError('Login failed. Please check your email and password.');
      console.error('Error logging in: ', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login">
      <div className="login-container">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          {error && <p className="error">{error}</p>}
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading}>Login</button>
        </form>
        {loading && (
          <div className="loader-container">
            <TailSpin height="50" width="50" color="#f44336" ariaLabel="loading" />
            <span>Logging in...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;
