import React from 'react';
import './Services.css';
import { FaSearch } from "react-icons/fa";
import { GoHome } from "react-icons/go";
import { FaBed } from "react-icons/fa";
const Services = () => {
    return (
        <div className="services" id="service">
            <h2 className="services__title">OUR SERVICES</h2>
            <h3 className="services__subtitle">What we provide to our customers</h3>
            <div className="services__container">
                <div className="services__card">
                    <div className="services__icon"><FaSearch /></div>
                    <h4 className="services__card-title">Buy a New Home</h4>
                    <p className="services__card-description">
                    Find your dream home with Houseliv. Our extensive database of new homes allows you to search by location, price range, and features. Get detailed property information, view high-quality photos, and connect with sellers to make your home buying process smooth and successful.                    </p>
                </div>
                <div className="services__card">
                    <div className="services__icon"><GoHome /></div>
                    <h4 className="services__card-title">Sell a House</h4>
                    <p className="services__card-description">
                    Sell your home quickly and effectively with Houseliv. Our platform offers a user-friendly interface to create detailed listings and reach a broad audience of potential buyers. Benefit from our marketing tools and resources to showcase your property and achieve the best sale price
                    </p>
                </div>
                <div className="services__card">
                    <div className="services__icon"><FaBed /></div>
                    <h4 className="services__card-title">Rent a House</h4>
                    <p className="services__card-description">
                    Explore a wide range of rental properties with Houseliv. Our platform allows you to filter by location, price, and amenities, making it easy to find the perfect rental home. Experience seamless property searching and connect directly with landlords and property managers                    </p>
                </div>
            </div>
        </div>
    );
};

export default Services;
