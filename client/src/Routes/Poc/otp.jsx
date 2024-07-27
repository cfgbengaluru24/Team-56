import { Button, Card, CardContent, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import { auth } from '../../fbconfig.js';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

const OtpVerification = () => {
  const [phone, setPhone] = useState(91);
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  console.log()
  const setupRecaptcha = () => {
    try {
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha', {
          size: 'invisible',
          callback: (response) => {
            console.log("reCAPTCHA solved", response);
          },
          'expired-callback': () => {
            console.log("reCAPTCHA expired");
          }
        }, auth);
    
        console.log("RecaptchaVerifier initialized successfully");
      } catch (error) {
        console.error("Error initializing RecaptchaVerifier:", error);
      }
  };

  const handleSendOtp = () => {
    setupRecaptcha();
    const phoneNumber = `+${phone}`;
    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        setConfirmationResult(confirmationResult);
      }).catch((error) => {
        console.error("Error during signInWithPhoneNumber", error);
      });
  };

  const handleVerifyOtp = () => {
    if (!confirmationResult) return;

    confirmationResult.confirm(otp).then((result) => {
      // User signed in successfully.
      const user = result.user;
      console.log("User signed in: ", user);
    }).catch((error) => {
      // User couldn't sign in (bad verification code?)
      console.error("Error during confirm", error);
    });
  };

  return (
    <div>
      <h3>OTP Verification</h3>
      <div id="recaptcha-container"></div>
      <input
        type="text"
        placeholder="Enter phone number with country code"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button onClick={handleSendOtp}>Send OTP</button>
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button onClick={handleVerifyOtp}>Verify OTP</button>
    </div>
  );
};

export default OtpVerification;