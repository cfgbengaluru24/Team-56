import React, { useState, useEffect } from 'react';
import './Donate.css';
import { db, collection, addDoc } from '../../fbconfig'; // Import Firebase functions
import { getAuth } from 'firebase/auth';

const Donate = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [mobile, setMobile] = useState('');
  const [donations, setDonations] = useState([{ name: '', quantity: '', gender: 'NA' }]);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      setUserEmail(user.email);
    } else {
      console.log('No user is signed in');
    }
  }, []);

  const handleDonationChange = (index, field, value) => {
    const newDonations = [...donations];
    newDonations[index][field] = value;
    setDonations(newDonations);
  };

  const handleAddDonation = () => {
    setDonations([...donations, { name: '', quantity: '', gender: '' ,status:'pending'}]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    if (!userEmail) {
      alert('No user email found.');
      return;
    }

    // Prepare data for Firebase
    const formData = {
      donations: donations.map(donation => ({
        ...donation,
        email: userEmail, // Add user email to each donation entry
      }))
    };
    
    try {
      // Iterate over each donation and add it to Firestore
      for (const donation of donations) {
        // Prepare donation data with email
        const donationData = {
          ...donation,
          email: userEmail, // Add user email to each donation entry
        };
  
        // Add each donation as a new document in the "tracking" collection
        const docRef = await addDoc(collection(db, 'tracking'), donationData);
        console.log('Document written with ID: ', docRef.id);
      }
  
      alert('Thank you for your donation!');
    } catch (e) {
      console.error('Error adding document: ', e);
      alert('Failed to submit donation.');
    }
  };

  return (
    <div className="donar-page">
      <h1>Thank You for Donating for a Noble Cause</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          required
        />
        {donations.map((donation, index) => (
          <div key={index} className="donation-entry">
            <input
              type="text"
              placeholder="Donation Name"
              value={donation.name}
              onChange={(e) => handleDonationChange(index, 'name', e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Quantity"
              value={donation.quantity}
              onChange={(e) => handleDonationChange(index, 'quantity', e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Gender"
              value={donation.gender}
              onChange={(e) => handleDonationChange(index, 'gender', e.target.value)}
            />
          </div>
        ))}
        <button type="button" onClick={handleAddDonation}>Add More</button>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Donate;
