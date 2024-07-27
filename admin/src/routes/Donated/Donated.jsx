import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../fbconfig'; // Adjust the import path according to your project structure
import './Donated.css';

const Donated = () => {
  const [donatedItems, setDonatedItems] = useState([]);

  useEffect(() => {
    const fetchDonatedItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'donated'));
        const items = querySnapshot.docs.map(doc => doc.data());
        setDonatedItems(items);
      } catch (error) {
        console.error('Error fetching donated items:', error);
      }
    };

    fetchDonatedItems();
  }, []);

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
          </tr>
        </thead>
        <tbody>
          {donatedItems.map((item, index) => (
            <tr key={index}>
              <td>{item.clothType}</td>
              <td>{item.gender}</td>
              <td>{item.mail}</td>
              <td>{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Donated;
