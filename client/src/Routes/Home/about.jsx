import React from 'react';
import { Fade } from 'react-awesome-reveal';
import './about.css';

const About = () => {
  return (
    <div className="our-story-container">
      <Fade triggerOnce>
        <h1 className="our-story-title">Our Story</h1>
      </Fade>
      <Fade triggerOnce delay={500}>
        <p className="our-story-text">
          It all started with the humble eagerness among us, the faint but honest wish to make some change, to create an example in the society. This wish took a strong place of belief when the ailing patients of Saroj Mohan Cancer Hospital prayed for our well being, with a handful of us making an attempt to make them smile. Their sympathetic gestures took all of us into contemplation. Thus we, with a common sense of purpose, and with god’s grace were driven to forming an organization that speaks for us, “Let’s intend to spread smiles”.
        </p>
      </Fade>
      <Fade triggerOnce delay={1000}>
        <p className="our-story-text">
          Registered under West Bengal Registration Act, 1961, registration number: ‘3/2D/24337 of 2014-15’, 7 years ago, since then we have conducted more than 35+ events till date. From feeding hungry souls, to supporting kids at orphanage, to provide drinking water facility at oldage home, we have never stopped. Thankfully, with noble souls by our side, we have been able to conduct free medical checkups and medicine distribution, sponsor education of needy fellows, reconstruction of homes which were washed off in floods. We have helped critical patients in their surgery, we have stood by cancer patients for their treatment.
        </p>
      </Fade>
      <Fade triggerOnce delay={1500}>
        <p className="our-story-text">
          In the 7th year as well, Aspire and Glee has taken up the challenge to feed every hungry soul in the time of grave crisis, requesting you to be with us. Together, we can spread more smiles. #inittogether
        </p>
      </Fade>
    </div>
  );
};

export default About;
