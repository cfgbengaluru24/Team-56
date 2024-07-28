import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box } from '@mui/material';
import './Home.css'; // Import the CSS file for styling
import About from './about'
import { db } from '../../fbconfig';
import { getAuth } from 'firebase/auth';
<<<<<<< HEAD
import CardSlider from '../../components/CardSlider/CardSlider';
=======
import { collection, query, where, getDocs } from 'firebase/firestore';
>>>>>>> 9ab575887e466bdad5ce758d8bf128c37ee6b898
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

<<<<<<< HEAD
    const handleNavigate = (path, data) => {
        if (userEmail && data == 'poc') {
            navigate("/PocDashboard");
        }
        else if (userEmail && data == 'donor') {
=======
    const handleNavigate = (path,data) => {
        if (userEmail&&data=='poc'&&usertype=='loc') {
            navigate("/PocDashboard");
        } 
        else if(userEmail&&data=='donor'&&usertype=='donor'){
>>>>>>> 9ab575887e466bdad5ce758d8bf128c37ee6b898
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
