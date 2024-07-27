import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Import the CSS file for styling

export function Home() {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <div className="home-page">
            <h1>HOME PAGE</h1>
            <button onClick={() => handleNavigate('/loc')} className="navigate-button">Go to POC</button>
            <button onClick={() => handleNavigate('/donar')} className="navigate-button">Go to Donor</button>
        </div>
    );
}

export default Home;
