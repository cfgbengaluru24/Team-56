import React, { useState } from 'react';
import './Signup.css';
import cross_icon from '../../assets/cross_icon.png';
import { useNavigate } from 'react-router-dom';
import { auth, db, storage } from '../../fbconfig';
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification, deleteUser } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createAvatar } from '@dicebear/avatars';
import * as initials from '@dicebear/avatars-initials-sprites';
import { v4 as uuidv4 } from 'uuid';

const SignUp = ({ setshowLogin, switchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phNO, setphNo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [waitingForVerification, setWaitingForVerification] = useState(false);
  const [createdUser, setCreatedUser] = useState(null);
  const navigate = useNavigate();

  const colors = ['#ffcc00', '#00aeff', '#ff5733', '#4caf50'];

  function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
  }

  async function handleSignUp(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setCreatedUser(user);

      await updateProfile(user, {
        displayName: name,
        phoneNumber: phNO // Update profile with phone number
      });

      await sendEmailVerification(user);

      toast.info('Verification email sent. Please verify your email for successful signup');
      setWaitingForVerification(true);
      setLoading(false);

      const checkEmailVerified = setInterval(async () => {
        await user.reload();
        if (user.emailVerified) {
          clearInterval(checkEmailVerified);
          setshowLogin(false);
          setLoading(false);
          setWaitingForVerification(false);

          const avatarSvg = createAvatar(initials, {
            seed: user.email.charAt(0).toUpperCase(),
            backgroundColor: getRandomColor(),
            textColor: '#888888',
            size: 100,
            fontWeight: 100,
            fontFamily: "'Lato', 'Lato-Regular', 'Helvetica Neue'"
          });

          const svgBlob = new Blob([avatarSvg], { type: 'image/svg+xml' });
          const reader = new FileReader();
          reader.readAsDataURL(svgBlob);
          reader.onloadend = async () => {
            const base64data = reader.result;
            const storageRef = ref(storage, `userImages/${user.email}.svg`);
            await uploadString(storageRef, base64data, 'data_url');
            const imageUrl = await getDownloadURL(storageRef);

            await addDoc(collection(db, 'users'), {
              _id: uuidv4(),
              email: user.email,
              displayName: user.displayName,
              photoURL: imageUrl,
              phNO: phNO // Store phone number in Firestore
            });

            navigate('/home');
          };
        }
      }, 3000);

    } catch (error) {
      console.error(error);
      toast.error(error.message);
      setLoading(false);
      setWaitingForVerification(false);
      if (createdUser) {
        try {
          await deleteUser(createdUser);
          toast.warn('User account deleted due to signup error.');
        } catch (deleteError) {
          console.error('Error deleting user:', deleteError);
          toast.error('Error deleting user. Please try again.');
        }
      }
    }
  }

  async function handleClose() {
    if (createdUser && !createdUser.emailVerified) {
      try {
        await deleteUser(createdUser);
        toast.warn('User account deleted due to unverified email.');
      } catch (error) {
        console.error('Error deleting user:', error);
        toast.error('Error deleting user. Please try again.');
      }
    }
    setshowLogin(false);
  }

  return (
    <div className='login-popup'>
      <ToastContainer />
      <form className="login-popup-container" onSubmit={handleSignUp}>
        <div className="login-popup-title">
          <h2>Sign Up</h2>
          <img onClick={handleClose} src={cross_icon} alt="Close" />
        </div>
        <div className="login-popup-inputs">
          <input onChange={(e) => setName(e.target.value)} type="text" placeholder="Your name" required />
          <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" required />
          <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" required />
          <input onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder="Confirm password" required />
          <input onChange={(e) => setphNo(e.target.value)} type="number" placeholder="Your Phone number" required />
        </div>
        <button type="submit" disabled={loading || waitingForVerification}>
          {loading ? 'Creating Account...' : (waitingForVerification ? 'Waiting for Verification...' : 'Verify Account')}
        </button>
        {loading && <p>Signing up, please wait...</p>}
        {waitingForVerification && <p>Please verify your email to complete the registration.</p>}
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing I agree to the terms of use and privacy policy</p>
        </div>
        <p>Already have an account? <span onClick={switchToLogin}>Login here</span></p>
      </form>
    </div>
  );
}

export default SignUp;
