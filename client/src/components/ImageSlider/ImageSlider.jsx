import React, { useState, useEffect } from 'react';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../fbconfig';
import SearchBar from '../SearchBar/SearchBar';
import MobileSearchBar from '../mobileSearchBar/mobileSearchBar';
import './ImageSlider.css';

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Automatically change slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % (images.length || 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  // Handle screen resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const goToPrevious = () => {
    setCurrentIndex(prevIndex => (prevIndex - 1 + (images.length || 1)) % (images.length || 1));
  };

  const goToNext = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % (images.length || 1));
  };

  // Handle case where images might be empty or undefined
  const currentImage = images && images.length > 0 ? images[currentIndex] : { url: '' };

  return (
    <>
      <h2 className="image-slider__title">Find a perfect home you love..!</h2>
      <p className="image-slider__subtitle">
        Wide Range of Properties From cozy apartments to luxurious villas, find the perfect home that suits your lifestyle
      </p>
      {isMobile && (
        <div className="image-slider__mobile-searchbar">
          <MobileSearchBar />
        </div>
      )}
      <div className="image-slider">
        {!isMobile && (
          <div className="image-slider__searchbar">
            <SearchBar />
          </div>
        )}
        <button className="image-slider__button" onClick={goToPrevious}>❮</button>
        {images.length > 0 && (
          <>
            <img
              src={currentImage.url || ''}
              alt={`Slide ${currentIndex}`}
              className="image-slider__image"
            />
            <button className="image-slider__button" onClick={goToNext}>❯</button>
          </>
        )}
      </div>
    </>
  );
};

export default ImageSlider;
