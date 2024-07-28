import React, { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../fbconfig'; // Adjust the import path according to your project structure
import './Home.css';

const Tracking = () => {
  const [trackingItems, setTrackingItems] = useState([]);

  useEffect(() => {
    const fetchTrackingItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'tracking'));
        const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTrackingItems(items);
      } catch (error) {
        console.error('Error fetching tracking items:', error);
      }
    };

    fetchTrackingItems();
  }, []);

  const handleSubmit = async (item) => {
    try {
      // Add to donated collection
      await addDoc(collection(db, 'donated'), {
        name: item.clothType,
        gender: item.gender,
        email: item.email,
        quantity: item.quantity
      });

      // Delete from tracking collection
      await deleteDoc(doc(db, 'tracking', item.id));

      // Update state to remove the deleted item
      setTrackingItems(trackingItems.filter(trackingItem => trackingItem.id !== item.id));
    } catch (error) {
      console.error('Error handling submit:', error);
    }
  };

  return (
    <div className="tracking-container">
      <h1>Tracking Items</h1>
      <table className="tracking-table">
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
          {trackingItems.map((item, index) => (
            <tr key={index}>
              <td>{item.clothType}</td>
              <td>{item.gender}</td>
              <td>{item.email}</td>
              <td>{item.quantity}</td>
              <td>
                <button onClick={() => handleSubmit(item)}>Submitted</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tracking;
