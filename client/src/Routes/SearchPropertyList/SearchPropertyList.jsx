import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import './SearchPropertyList.css';
import { db } from '../../fbconfig';
import greenvalley from '../../assets/greenvalley.png';
import greenhorn from '../../assets/greenhorn.png';
import sanmati from '../../assets/sanmati.png';
import omsai from '../../assets/omsai.png';
import blueribbon from '../../assets/blueribbon.png';
import mermaid from '../../assets/mermaid.png';
import sreesai from '../../assets/sreesai.png';
import PropertyCard2 from '../../components/PropertyCard2/PropertyCard2';

const images = {
  greenvalley,
  greenhorn,
  sanmati,
  omsai,
  blueribbon,
  mermaid,
  sreesai,
};

const propertyTypeOptions = [
  { value: 'rent', label: 'Rent' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'buy', label: 'Buy' },
  { value: 'pg/co-living', label: 'PG/Co-living' },
  { value: 'plot', label: 'Plot' },
];

const SearchPropertyList = () => {
  const { propertyType, pincode } = useParams();
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [sortOrder, setSortOrder] = useState('priceLowToHigh');
  const [minBudget, setMinBudget] = useState('');
  const [maxBudget, setMaxBudget] = useState('');
  const [features, setFeatures] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPropertyType, setCurrentPropertyType] = useState(propertyType);
  const [currentPincode, setCurrentPincode] = useState(pincode);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const similarQ = query(
          collection(db, 'property'),
          where('propertyType', '==', currentPropertyType),
          where('pincode', '==', currentPincode)
        );
        const snapshot = await getDocs(similarQ);
        const properties = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setProperties(properties);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, [currentPropertyType, currentPincode]);

  useEffect(() => {
    filterProperties();
  }, [sortOrder, minBudget, maxBudget, features, searchTerm, properties]);

  const filterProperties = () => {
    let filtered = [...properties];

    if (minBudget) {
      filtered = filtered.filter((property) => property.rent >= Number(minBudget));
    }
    if (maxBudget) {
      filtered = filtered.filter((property) => property.rent <= Number(maxBudget));
    }
    if (features.length > 0) {
      filtered = filtered.filter((property) =>
        features.every((feature) => property.features.includes(feature))
      );
    }
    if (searchTerm) {
      const searchTermInsensitive = searchTerm.toLowerCase();
      filtered = filtered.filter((property) =>
        property.address_insensitive.includes(searchTermInsensitive)
      );
    }
    if (sortOrder === 'priceLowToHigh') {
      filtered.sort((a, b) => a.rent - b.rent);
    } else if (sortOrder === 'priceHighToLow') {
      filtered.sort((a, b) => b.rent - a.rent);
    }

    setFilteredProperties(filtered);
  };

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    setFeatures((prev) =>
      e.target.checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  return (
    <div className="search-property-list">
      <div className="filters">
        <h3>Property Type</h3>
        <select
          value={currentPropertyType}
          onChange={(e) => setCurrentPropertyType(e.target.value)}
        >
          {propertyTypeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <h3>Pincode</h3>
        <input
          type="text"
          placeholder="Enter pincode"
          value={currentPincode}
          onChange={(e) => setCurrentPincode(e.target.value)}
        />

        <h3>Search by Address</h3>
        <input
          type="text"
          placeholder="Enter address"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <h3>Sort by</h3>
        <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
          <option value="priceLowToHigh">Price: Low to High</option>
          <option value="priceHighToLow">Price: High to Low</option>
        </select>

        <h3>Budget</h3>
        <div className="budget-inputs">
          <input
            type="number"
            placeholder="Min"
            value={minBudget}
            onChange={(e) => setMinBudget(e.target.value)}
          />
          <input
            type="number"
            placeholder="Max"
            value={maxBudget}
            onChange={(e) => setMaxBudget(e.target.value)}
          />
        </div>

        <h3>Features</h3>
        {[
          'Air Conditioning',
          'WiFi',
          'Laundry',
          'Pet Friendly',
          'Pool',
          'Gym',
          'Parking',
          'Study Area',
          'Balcony',
          'Garden',
        ].map((feature) => (
          <label key={feature}>
            <input
              type="checkbox"
              value={feature}
              onChange={handleCheckboxChange}
            />
            {feature}
          </label>
        ))}
      </div>

      <div className="property-list">
        <h2>Showing {filteredProperties.length} Properties for {currentPropertyType}</h2>
        <PropertyCard2 properties={filteredProperties} />
      </div>
    </div>
  );
};

export default SearchPropertyList;
