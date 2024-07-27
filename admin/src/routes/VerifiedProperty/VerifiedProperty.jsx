import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../fbconfig';
import './VerifiedProperty.css';
import { Container, Row, Col, Card, Form, Button, Modal, FormControl } from 'react-bootstrap';
import Carousel from 'react-slick';
import Toggle from 'react-toggle';
import axios from 'axios'; // Import axios for HTTP requests
import "react-toggle/style.css";

const VerifiedProperty = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchPincode, setSearchPincode] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState('');
  const [deleteMessage, setDeleteMessage] = useState('');
  const [selectedPropertyName, setSelectedPropertyName] = useState('');

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'property'));
        const propertiesList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProperties(propertiesList);
      } catch (error) {
        console.error("Error fetching properties: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const handleSpotlightChange = async (propertyId, currentSpotlight) => {
    try {
      const propertyRef = doc(db, 'property', propertyId);
      await updateDoc(propertyRef, { spotlight: !currentSpotlight });
      setProperties(properties.map(property =>
        property.id === propertyId ? { ...property, spotlight: !currentSpotlight } : property
      ));
    } catch (error) {
      console.error("Error updating spotlight: ", error);
    }
  };

  const handleDelete = (propertyId, propertyName) => {
    setSelectedPropertyId(propertyId);
    setSelectedPropertyName(propertyName);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteDoc(doc(db, 'property', selectedPropertyId));

      // Send delete message along with property details
      const selectedProperty = properties.find(property => property.id === selectedPropertyId);
      const payload = {
        email: selectedProperty.email,
        message: deleteMessage,
        propertyTitle: selectedPropertyName
      };

      // Make POST request to backend to send email
      await axios.post('https://houseliv-admin-api.vercel.app/send-email', payload);

      setProperties(properties.filter(property => property.id !== selectedPropertyId));
      setShowDeleteModal(false);
      setDeleteMessage('');
      setSelectedPropertyId('');
      setSelectedPropertyName('');
    } catch (error) {
      console.error("Error deleting property: ", error);
    }
  };

  const handleSearch = () => {
    if (searchPincode.trim() === '') {
      return;
    }

    setLoading(true);

    const fetchPropertiesByPincode = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'property'));
        const propertiesList = querySnapshot.docs
          .map(doc => ({
            id: doc.id,
            ...doc.data()
          }))
          .filter(property => property.pincode === searchPincode);
        setProperties(propertiesList);
      } catch (error) {
        console.error("Error fetching properties by pincode: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPropertiesByPincode();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <Container className="properties-list-container">
      <h1>Verified Properties</h1>
      <Form className="search-bar">
        <Form.Control 
          type="text" 
          placeholder="Search by Pincode" 
          value={searchPincode} 
          onChange={(e) => setSearchPincode(e.target.value)} 
        />
        <Button variant="primary" onClick={handleSearch}>Search</Button>
      </Form>
      <Row>
        {properties.map(property => (
          <Col key={property.id} xs={12} md={6} lg={4} className="mb-4">
            <Card className={`property-card ${property.spotlight ? 'spotlight' : ''}`}>
              <Carousel {...settings} className="property-images">
                {property.imageUrls.map((url, index) => (
                  <div key={index}>
                    <img src={url} alt={`Property ${index}`} className="img-fluid" />
                  </div>
                ))}
              </Carousel>
              <Card.Body>
                <Card.Title>{property.title}</Card.Title>
                <Card.Text>
                  <strong>City:</strong> {property.city}<br />
                  <strong>Address:</strong> {property.address}<br />
                  <strong>Description:</strong> {property.description}<br />
                  <strong>Rooms:</strong> {property.rooms}<br />
                  <strong>Bathrooms:</strong> {property.bathrooms}<br />
                  <strong>Space Size:</strong> {property.spaceSize}<br />
                  <strong>Monthly Rent:</strong> {property.rent}<br />
                  <strong>Features:</strong> {property.features.join(', ')}<br />
                  <strong>Pincode:</strong> {property.pincode}<br />
                </Card.Text>
                <div className="spotlight-toggle">
                  <label>
                    <Toggle
                      defaultChecked={property.spotlight}
                      icons={false}
                      onChange={() => handleSpotlightChange(property.id, property.spotlight)}
                    />
                    <span className="toggle-label">Spotlight</span>
                  </label>
                </div>
                <Button 
                  variant="danger" 
                  onClick={() => handleDelete(property.id, property.title)} 
                  className="mt-2"
                >
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Property</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="deleteMessage">
            <Form.Label>Reason for Deletion:</Form.Label>
            <FormControl
              as="textarea"
              rows={3}
              value={deleteMessage}
              onChange={(e) => setDeleteMessage(e.target.value)}
            />
          </Form.Group>
          <p>You are about to delete the property: <strong>{selectedPropertyName}</strong></p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Confirm Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default VerifiedProperty;
