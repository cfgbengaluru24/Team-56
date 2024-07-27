import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaPencilAlt } from 'react-icons/fa';
import { collection, query, where, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { signOut, deleteUser, getAuth, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { db } from '../../fbconfig';
import './UserProfile.css';
import cross_icon from '../../assets/cross_icon.png';

const UserProfile = () => {
  const { id } = useParams(); // Get the user ID from URL parameters
  const navigate = useNavigate();
  const auth = getAuth();

  const [userData, setUserData] = useState({
    displayName: '',
    email: '',
    photoURL: '',
    phone: ''
  });
  const [profilePicture, setProfilePicture] = useState('https://via.placeholder.com/150');
  const [properties, setProperties] = useState([]);
  const [propertiesUnderReview, setPropertiesUnderReview] = useState([]);
  const [editingPhone, setEditingPhone] = useState(false);
  const fileInputRef = useRef(null);

  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [authUserEmail, setAuthUserEmail] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState(null);
  const [showReauthConfirm, setShowReauthConfirm] = useState(false);
  const [reauthEmail, setReauthEmail] = useState('');
  const [reauthPassword, setReauthPassword] = useState('');

  // Fetch authenticated user's email
  useEffect(() => {
    const fetchAuthUserEmail = async () => {
      const user = auth.currentUser;
      if (user) {
        setAuthUserEmail(user.email);
      }
    };

    fetchAuthUserEmail();
  }, [auth]);

  // Fetch user data based on the user ID from URL parameters
  useEffect(() => {
    const fetchUserData = async () => {
      if (id) {
        try {
          const usersRef = collection(db, 'users');
          const q = query(usersRef, where('_id', '==', id));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            const userData = userDoc.data();
            setUserData(userData);
            setProfilePicture(userData.photoURL || 'https://via.placeholder.com/150');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, [id]);

  // Fetch properties where property.email matches user.email
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const propertiesRef = collection(db, 'property');
        const q = query(propertiesRef, where('email', '==', userData.email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const propertiesData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          }));
          setProperties(propertiesData);
        } else {
          console.log('No properties found for the user');
          setProperties([]);
        }
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    if (userData.email) {
      fetchProperties();
    }
  }, [userData.email]);

  // Fetch properties under review where property_to_verify.email matches user.email
  useEffect(() => {
    const fetchPropertiesUnderReview = async () => {
      try {
        const propertiesUnderReviewRef = collection(db, 'property_to_verify');
        const q = query(propertiesUnderReviewRef, where('email', '==', userData.email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const propertiesData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          }));
          setPropertiesUnderReview(propertiesData);
        } else {
          console.log('No properties under review found for the user');
          setPropertiesUnderReview([]);
        }
      } catch (error) {
        console.error('Error fetching properties under review:', error);
      }
    };

    if (userData.email) {
      fetchPropertiesUnderReview();
    }
  }, [userData.email]);

  const handleEdit = (propertyId) => {
    navigate(`/edit-property/${propertyId}`);
  };

  const handleDelete = (propertyId) => {
    setPropertyToDelete(propertyId);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteDoc(doc(db, 'property', propertyToDelete));
      setProperties(properties.filter(property => property.id !== propertyToDelete));
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error('Error deleting property:', error);
    }
  };

  const deletePropertyById = async (propertyId) => {
    try {
      await deleteDoc(doc(db, 'property', propertyId));
      console.log(`Property with ID ${propertyId} deleted successfully`);
    } catch (error) {
      console.error('Error deleting property:', error);
      throw error;
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setPropertyToDelete(null);
  };

  const handleProfilePictureUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteAccount = () => {
    setShowReauthConfirm(true);
  };

  const confirmReauth = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const credential = EmailAuthProvider.credential(reauthEmail, reauthPassword);
        await reauthenticateWithCredential(user, credential);
        console.log('User re-authenticated');

        // Delete user properties from 'property' collection
        for (const property of properties) {
          await deletePropertyById(property.id);
        }

        // Delete user properties from 'property_to_verify' collection
        for (const property of propertiesUnderReview) {
          await deletePropertyById(property.id);
        }

        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('_id', '==', id));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userDocRef = querySnapshot.docs[0].ref;
          await deleteDoc(userDocRef);
        } else {
          console.log('User document not found');
        }

        // Delete user from authentication
        await deleteUser(user);
        console.log('User deleted from authentication');

        navigate('/');
      } else {
        console.log('No user is currently logged in');
      }
    } catch (error) {
      console.error('Error re-authenticating or deleting account:', error);
      alert('Unable to delete account: Incorrect credentials');
    }
  };

  const cancelReauth = () => {
    setShowReauthConfirm(false);
    setReauthEmail('');
    setReauthPassword('');
  };

  const handleLogout = () => {
    return signOut(auth).then(() => {
      console.log('User signed out');
      navigate('/');
    }).catch((error) => {
      console.error('Sign out error', error);
      throw error; // rethrow the error to handle it in the main function
    });
  };

  const handlePropertyClick = (propertyId) => {
    navigate(`/property/${propertyId}`);
  };

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      <div className="profile-picture">
        <img src={profilePicture} alt="Profile" />
      </div>
      <div className="user-info">
        <div className="user-info-item">
          <label>Name:</label>
          <span>{userData.displayName}</span>
        </div>
        <div className="user-info-item">
          <label>Email:</label>
          <span>{userData.email}</span>
        </div>
        <div className="user-info-item">
          <label>Phone:</label>
          <span>{userData.phNO}</span>
        </div>
        <hr />
      </div>
      <h3>Your Properties</h3>
      <div className="properties">
        {properties.length > 0 ? (
          properties.map((property) => (
            <div
              key={property.id}
              className="property-item"
              onClick={() => handlePropertyClick(property.id)}
              style={{ cursor: 'pointer' }}
            >
              <span>{property.title}</span>
              {authUserEmail === userData.email && (
                <div className="property-buttons">
                  <button onClick={(e) => { e.stopPropagation(); handleEdit(property.id); }}>Edit</button>
                  <button onClick={(e) => { e.stopPropagation(); handleDelete(property.id); }}>Delete</button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>You haven't uploaded any properties yet.</p>
        )}
      </div>

      {/* Properties Under Review */}
      {propertiesUnderReview.length > 0 && (
        <>
          <h3>Properties Under Review</h3>
          <div className="properties">
            {propertiesUnderReview.map((property) => (
              <div
                key={property.id}
                className="property-item"
                style={{ cursor: 'pointer' }}
              >
                <span>{property.title}</span>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <div className="login-popup">
          <form className="login-popup-container" onSubmit={(e) => e.preventDefault()}>
            <div className="login-popup-title">
              <h2>Confirm Deletion</h2>
              <img onClick={cancelDelete} src={cross_icon} alt="Close" />
            </div>
            <p>Are you sure you want to delete this property?</p>
            <div className="login-popup-condition">
              <button type="button" onClick={confirmDelete}>Delete</button>
              <button type="button" onClick={cancelDelete}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Reauthentication Dialog */}
      {showReauthConfirm && (
        <div className="login-popup2">
          <form className="login-popup-container2" onSubmit={(e) => e.preventDefault()}>
            <div className="login-popup-title2">
              <h2>Verify Your Identity</h2>
              <img onClick={cancelReauth} src={cross_icon} alt="Close" />
            </div>
            <div className="login-popup-condition2">
              <input
                type="email"
                value={reauthEmail}
                placeholder='Email'
                onChange={(e) => setReauthEmail(e.target.value)}
                required
              />
              <input
                type="password"
                value={reauthPassword}
                placeholder='Password'
                onChange={(e) => setReauthPassword(e.target.value)}
                required
              />
              <button type="button" onClick={confirmReauth}>Verify and Delete</button>
              <button type="button" onClick={cancelReauth}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Footer Buttons */}
      {authUserEmail === userData.email && (
        <div className="footer-buttons">
          <button className="edit-profile-button" onClick={handleDeleteAccount}>Delete Account</button>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
