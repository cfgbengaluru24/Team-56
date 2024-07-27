import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box } from '@mui/material';
import './Home.css'; // Import the CSS file for styling
import About from './about'
import { getAuth } from 'firebase/auth';
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
        if (userEmail&&data=='poc') {
            navigate("/PocDashboard");
        } 
        else if(userEmail&&data=='donar'){
            navigate("/donar")
        }
        
        else {
            navigate(path); // Redirect to the same path if userEmail is not defined
        }
    };


    return (
            <>
                <Box
                    className="home-page"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    height="50vh"
                >
                    <Button
                        variant="contained"
                        size="large"
                        color="primary"
                        onClick={() => handleNavigate('/loc','poc')}
                        sx={{ 
                            mb: 2,
                            padding: '12px 24px',
                            fontSize: '1.25rem'
                        }}
                    >
                        Become a POC
                    </Button>
                    <Button
                        variant="contained"
                        size="large"
                        color="secondary"
                        onClick={() => handleNavigate('/loc','donar')}
                        sx={{ 
                            padding: '12px 24px',
                            fontSize: '1.25rem'
                        }}
                    >
                        Become a Donor
                    </Button>
                </Box>
    
                <About />
            </>
        );
    

}

export default Home;
