import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box } from '@mui/material';
import './Home.css'; // Import the CSS file for styling
import About from './about'
import { getAuth } from 'firebase/auth';
import CardSlider from '../../components/CardSlider/CardSlider';
export function Home() {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            setUserEmail(user.email);
        } else {
            console.log('No user is signed in');
        }
    }, []);

    const handleNavigate = (path,data) => {
        if (userEmail&&data=='poc'&&usertype=='loc') {
            navigate("/PocDashboard");
        } 
        else if(userEmail&&data=='donor'&&usertype=='donor'){
            navigate("/donor")
        }

        else {
            navigate(`${path}?data=${data}`); // Redirect to the same path if userEmail is not defined
        }
    };


    return (
        <>
            <div className="relative w-full h-screen mb-4">
                <div className="relative w-full h-[90vh]">
                    <img
                        src="red.jpg"
                        alt="Background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
                        <div className="text-black text-4xl font-bold text-center mb-20 mt-20">
                            Let's Intend To Spread Smiles
                        </div>
                        <div className="flex gap-4 ">
                            <Button
                                variant="contained"
                                size="large"
                                color="primary"
                                onClick={() => handleNavigate('/loc', 'poc')}
                                sx={{
                                    fontSize: '1.2rem',
                                    padding: '12px 24px',
                                    minWidth: '200px'
                                }}
                            >
                                Become a POC
                            </Button>
                            <Button
                                variant="contained"
                                size="large"
                                color="secondary"
                                onClick={() => handleNavigate('/loc', 'donor')}
                                sx={{
                                    fontSize: '1.2rem',
                                    padding: '12px 24px',
                                    minWidth: '200px'
                                }}
                            >
                                Become a Donor
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <About />
            <CardSlider/>
        </>
    );


}

export default Home;
