import React, { useContext } from 'react';
import { Fade } from 'react-awesome-reveal';
import './about.css';
import { LanguageContext } from '../../Context/LanguageContext';
import { useTranslation } from 'react-i18next';

const About = () => {
  const {language, setLanguage} = useContext(LanguageContext);
  const { t, i18n } = useTranslation();

  return (
    
    <div className="our-story-container">
      <Fade triggerOnce>
        <h1 className="our-story-title">{t('our_story_title')}</h1>
      </Fade>
      <Fade triggerOnce delay={500}>
        <p className="our-story-text">
        {t('our_story_text_1')}
        </p>
      </Fade>
      <Fade triggerOnce delay={1000}>
        <p className="our-story-text">
        {t('our_story_text_2')}
        </p>
      </Fade>
      <Fade triggerOnce delay={1500}>
        <p className="our-story-text">
        {t('our_story_text_3')}
        </p>
      </Fade>
    </div>
  );
};

export default About;
