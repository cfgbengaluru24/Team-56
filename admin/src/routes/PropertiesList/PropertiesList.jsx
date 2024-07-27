import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../fbconfig';
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import Slider from 'react-slick'; // Import react-slick for carousel
import axios from 'axios'; // Import axios for making HTTP requests
import './PropertiesList.css'; // Importing CSS module for scoped styling

const PropertiesList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState('');
  const [rejectMessage, setRejectMessage] = useState('');
  const [sendingRejectMessage, setSendingRejectMessage] = useState(false);
  const [selectedPropertyName, setSelectedPropertyName] = useState('');

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'property_to_verify'));
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

  const handleApprove = async (property) => {
    try {
      const propertyRef = doc(db, 'property', property.id);
      await setDoc(propertyRef, property);
      await handleDelete(property.id);
    } catch (error) {
      console.error("Error approving property: ", error);
    }
  };

  const handleReject = (propertyId, propertyName) => {
    setSelectedPropertyId(propertyId);
    setSelectedPropertyName(propertyName);
    setShowRejectModal(true);
  };

  const handleRejectConfirm = async () => {
    try {
      setSendingRejectMessage(true);

      // Construct the payload for sending email
      const selectedProperty = properties.find(property => property.id === selectedPropertyId);
      const payload = {
        email: selectedProperty.email,
        message: rejectMessage,
        propertyTitle: selectedPropertyName
      };

      // Make a POST request to send email using nodemailer API
      await axios.post('https://houseliv-admin-api.vercel.app/send-delete-email', payload);

      // Delete the property from Firestore after sending email
      await handleDelete(selectedPropertyId);

      // Close the modal and reset state
      setShowRejectModal(false);
      setRejectMessage('');
      setSelectedPropertyId('');
      setSelectedPropertyName('');
    } catch (error) {
      console.error("Error sending reject message: ", error);
    } finally {
      setSendingRejectMessage(false);
    }
  };

  const handleDelete = async (propertyId) => {
    try {
      const propertyRef = doc(db, 'property_to_verify', propertyId);
      await deleteDoc(propertyRef);
      setProperties(properties.filter(property => property.id !== propertyId));
    } catch (error) {
      console.error("Error deleting property: ", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  // Slick carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <Container className="properties-list-container">
      <h1>Properties to Verify</h1>
      <Row>
        {properties.map(property => (
          <Col key={property.id} xs={12} md={6} lg={4} className="mb-4">
            <Card className="properties-list-card">
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
                </Card.Text>
                {property.imageUrls && property.imageUrls.length > 0 && (
                  <div className="property-images">
                    <Slider {...settings}>
                      {property.imageUrls.map((url, index) => (
                        <div key={index}>
                          <img src={url} alt={`Property ${index}`} className="img-fluid" />
                        </div>
                      ))}
                    </Slider>
                  </div>
                )}
                <br />
                <Card.Text>
                  <strong>Features:</strong> {property.features.join(', ')}<br />
                  <strong>Pincode:</strong> {property.pincode}<br />
                </Card.Text>
                <div className="button-group">
                  <Button variant="success" onClick={() => handleApprove(property)}>Approve</Button>
                  <Button variant="danger" onClick={() => handleReject(property.id, property.title)}>Reject</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Reject Modal */}
      <Modal show={showRejectModal} onHide={() => setShowRejectModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Reject Property</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="rejectMessage">
            <Form.Label>Reject Message:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={rejectMessage}
              onChange={(e) => setRejectMessage(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRejectModal(false)}>
            Close
          </Button>
          <Button variant="danger" onClick={handleRejectConfirm} disabled={sendingRejectMessage}>
            {sendingRejectMessage ? 'Sending...' : 'Send Rejection'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default PropertiesList;
