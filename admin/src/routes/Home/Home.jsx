import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../fbconfig'; // Adjust the import path according to your project structure
import './Home.css';

const Tracking = () => {
  const [trackingItems, setTrackingItems] = useState([]);

  useEffect(() => {
    const fetchTrackingItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'tracking'));
        const items = querySnapshot.docs.map(doc => doc.data());
        setTrackingItems(items);
      } catch (error) {
        console.error('Error fetching tracking items:', error);
      }
    };

    fetchTrackingItems();
  }, []);

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
          </tr>
        </thead>
        <tbody>
          {trackingItems.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.gender}</td>
              <td>{item.email}</td>
              <td>{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tracking;
