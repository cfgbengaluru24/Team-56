import React, { useContext, useState, useEffect } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/org.png';
import { Context } from '../../Context/AuthContext';
import { getAuth, signOut } from 'firebase/auth';
import ProfileLogo from '../ProfileLogo/ProfileLogo.jsx';
import { db } from '../../fbconfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { FaBars, FaTimes } from 'react-icons/fa';
import { LanguageContext } from '../../Context/LanguageContext.jsx';
import { useTranslation } from 'react-i18next';

const Navbar = ({ setshowLogin }) => {
  const { user, setUser } = useContext(Context);
  const auth = getAuth();
  const navigate = useNavigate();
  const [menu, setMenu] = useState("home");
  const [userId, setUserId] = useState(null);
  const [userType, setUserType] = useState(null); // New state to store user type
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const {language, setLanguage} = useContext(LanguageContext);
  const { t, i18n } = useTranslation();

  useEffect(()=>{
      i18n.changeLanguage(language);
  },[language])

  useEffect(() => {
    if (user && user.email) {
      const fetchUserId = async () => {
        try {
          const q = query(collection(db, 'users'), where('email', '==', user.email));
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            const userData = userDoc.data();
            setUserId(userData._id); // use `_id` to get the user ID from the data
            setUserType(userData.type); // Set the user type
            console.log('User type:', userData.type); // log the type of the user document
          }
        } catch (error) {
          console.error('Error fetching user ID:', error);
        }
      };
      fetchUserId();
    }
  }, [user]);

  const handleLogoutClick = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      signOut(auth)
        .then(() => {
          console.log("User signed out");
          setUser(null);
          navigate('/');
        })
        .catch((error) => {
          console.error("Sign out error", error);
        });
    }
  };

  const handleProfileClick = () => {
    if (userId) {
      navigate(`/profile/${userId}`);
    } else {
      console.error("User ID not found");
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className='navbar'>
      <Link to='/'>
        <img src={logo} alt="Logo" className='logo' />
      </Link>

      <div className={`navbar-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>{t('home')}</Link>
       
        <button
          className="add-listing-btn" style={{fontSize: "16px"}}
          onClick={() => {
            if (!user) {
              setshowLogin(true);
            } else {
              navigate("/add-listing");
            }
          }}
        >
          {t('protected_route')}
        </button>

        {userType === 'donor' && (
          <button
            className="donate-btn" style={{fontSize: "16px"}}
            onClick={() => navigate("/donate")}
          >
            Donate
          </button>
        )}
      </div>

      <div className="nav-bar-right">
        {user ? (
          <button onClick={handleProfileClick}><ProfileLogo /></button>
        ) : (
          <button onClick={() => setshowLogin(true)}>{t('login')}</button>
        )}
      </div>

      <button className='hamburger' onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </button>
    </div>
  );
};

export default Navbar;
