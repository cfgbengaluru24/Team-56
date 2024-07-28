import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box } from '@mui/material';
import './Home.css'; // Import the CSS file for styling
import About from './about'
import { db } from '../../fbconfig';
import { getAuth } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
export function Home() {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState('');
    const [usertype,setUserType]=useState('')
    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;
        const fetchUserId = async () => {
            try {
              const q = query(collection(db, 'users'), where('email', '==', user.email));
              const querySnapshot = await getDocs(q);
              if (!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0];
                const userData = userDoc.data();
                setUserType(userData.type); // use `_id` to get the user ID from the data
                console.log('User type:', usertype); // log the type of the user document
              }
            }catch (error) {
                console.error('Error fetching user ID:', error);
              } }
        fetchUserId();
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
                        onClick={() => handleNavigate('/loc','donor')}
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
