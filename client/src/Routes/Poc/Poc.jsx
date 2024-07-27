import React, { useState } from 'react';
import './Poc.css'; // Assuming you want to style this page
import SignUp from '../../components/Signup/Signup'; // Import the SignUp component
import Login from '../../components/Login/Login'; // Import the Login component

const Poc = () => {
  const [showLogin, setShowLogin] = useState(true); // State to toggle between Login and SignUp

  const switchToSignUp = () => {
    setShowLogin(false); // Switch to SignUp
  };

  const switchToLogin = () => {
    setShowLogin(true); // Switch to Login
  };

  return (
    <div className="poc-container">
      {showLogin ? (
        <Login setshowLogin={setShowLogin} switchToSignUp={switchToSignUp} />
      ) : (
        <SignUp setshowLogin={setShowLogin} switchToLogin={switchToLogin} />
      )}
    </div>
  );
};

export default Poc;
