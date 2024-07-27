import React from 'react';
import { FaHome } from 'react-icons/fa';
import './PropLoader.css';

const PropLoader = () => {
    return (
        <div className="loader-container">
            <div className="loader-bar">
                <div className="loader-fill">
                    <FaHome className="loader-icon" />
                </div>
            </div>
        </div>
    );
};

export default PropLoader;
