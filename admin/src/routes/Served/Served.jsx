import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../fbconfig'; // Adjust the import path according to your project structure
import './Served.css';

const Served = () => {
  const [servedItems, setServedItems] = useState([]);

  useEffect(() => {
    const fetchServedItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'served'));
        const items = querySnapshot.docs.map(doc => doc.data());
        setServedItems(items);
      } catch (error) {
        console.error('Error fetching served items:', error);
      }
    };

    fetchServedItems();
  }, []);

  return (
    <div className="served-container">
      <h1>Served Items</h1>
      <table className="served-table">
        <thead>
          <tr>
            <th>Cloth Type</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {servedItems.map((item, index) => (
            <tr key={index}>
              <td>{item.clothType}</td>
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

export default Served;
