import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box } from '@mui/material';
import './Home.css'; // Import the CSS file for styling
import About from './about'
export function Home() {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
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
                        onClick={() => handleNavigate('/loc')}
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
                        onClick={() => handleNavigate('/donar')}
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
