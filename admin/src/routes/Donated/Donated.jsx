import React, { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../fbconfig'; // Adjust the import path according to your project structure
import './Donated.css';
import axios from 'axios';

const Donated = () => {
  const [donatedItems, setDonatedItems] = useState([]);

  useEffect(() => {
    const fetchDonatedItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'donated'));
        const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setDonatedItems(items);
      } catch (error) {
        console.error('Error fetching donated items:', error);
      }
    };

    fetchDonatedItems();
  }, []);

  const handleServe = async (item) => {
    try {
      // Add to served collection
      await addDoc(collection(db, 'served'), {
        clothType: item.clothType,
        gender: item.gender,
        mail: item.email,
        quantity: item.quantity
      });

      // Delete from donated collection
      await deleteDoc(doc(db, 'donated', item.id));

      // Update state to remove the deleted item
      setDonatedItems(donatedItems.filter(donatedItem => donatedItem.id !== item.id));

      // Send WhatsApp message
      const phoneNumber = '9483746823'; // The phone number to send the message to without the 'whatsapp:' prefix
      const currentTime = new Date().toLocaleString();
      const message = `Dear Donor,\n\nWe are pleased to inform you that your donation of ${item.clothType} for ${item.gender} has been successfully served.\n\nQuantity: ${item.quantity}\nTime: ${currentTime}\n\nThank you for your generous contribution.\n\nSincerely,\nAspire and Glee`;

      const response = await axios.post('http://localhost:3001/send-whatsapp', {
        phoneNumber,
        message,
      });

      if (response.status !== 200) {
        throw new Error('Failed to send WhatsApp message');
      }

      console.log('WhatsApp message sent:', response.data);
    } catch (error) {
      console.error('Error handling serve:', error.message);
    }
  };

  return (
    <div className="donated-container">
      <h1>Donated Items</h1>
      <table className="donated-table">
        <thead>
          <tr>
            <th>Cloth Type</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {donatedItems.map((item, index) => (
            <tr key={index}>
              <td>{item.clothType}</td>
              <td>{item.gender}</td>
              <td>{item.email}</td>
              <td>{item.quantity}</td>
              <td>
                <button onClick={() => handleServe(item)}>Served</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Donated;
