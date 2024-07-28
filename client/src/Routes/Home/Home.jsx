// src/Routes/Home/Home.jsx

import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import './Home.css';
import About from './about';
import { LanguageContext } from '../../Context/LanguageContext';

export function Home() {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const {language, setLanguage} = useContext(LanguageContext);

    const handleNavigate = (path) => {
        navigate(path);
    };

    const changeLanguage = (lng) => {
        if(language!==lng){
        i18n.changeLanguage(lng);
        setLanguage(lng)}
    };

    useEffect(()=>{
        i18n.changeLanguage(language);
    },[language])

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
                    {t('become_a_poc')}
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
                    {t('become_a_donor')}
                </Button>
                
                {/* Language Switcher Buttons */}
                <Box mt={4}>
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={() => changeLanguage('en')}
                        sx={{
                            marginRight: 2
                        }}
                    >
                        English
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={() => changeLanguage('bn')}
                    >
                        বাংলা
                    </Button>
                </Box>
            </Box>
            <About />
        </>
    );
}

export default Home;
