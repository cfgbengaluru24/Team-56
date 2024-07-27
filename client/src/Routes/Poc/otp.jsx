import React, { useState } from 'react';
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';
import { app } from '../../fbconfig'; // Adjust path if necessary

const auth = getAuth(app);

const Loc = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [error, setError] = useState('');

  // Initialize Recaptcha
  const setRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
      size: 'invisible',
      callback: (response) => {
        // reCAPTCHA solved - will proceed with OTP sending
      },
      'expired-callback': () => {
        // Response expired; ask user to re-submit
      }
    }, auth);
  };

  const handleSendOtp = async () => {
    try {
      setRecaptcha();
      const appVerifier = window.recaptchaVerifier;
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setVerificationId(confirmationResult.verificationId);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const credential = PhoneAuthProvider.credential(verificationId, otp);
      await signInWithCredential(auth, credential);
      alert('Phone number verified!');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Phone Number Authentication</h2>
      <div id="recaptcha-container"></div>
      <input
        type="text"
        placeholder="Enter phone number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <button onClick={handleSendOtp}>Send OTP</button>
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button onClick={handleVerifyOtp}>Verify OTP</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Loc;
