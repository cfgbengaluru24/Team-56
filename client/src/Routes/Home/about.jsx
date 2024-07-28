import React from 'react';
import { Fade } from 'react-awesome-reveal';

const About = () => {
  return (
    <div className="flex flex-col items-center text-center p-6 font-sans">
      <Fade triggerOnce>
        <h1 className="text-4xl font-bold mb-4 text-gray-800">WHAT WE DO</h1>
      </Fade>
      <Fade triggerOnce delay={500}>
        <p className="text-lg text-gray-600 mb-4 max-w-2xl">
          Our journey began with a humble eagerness among us and a sincere wish to create positive change and set an example in society. This belief was solidified when the ailing patients of Saroj Mohan Cancer Hospital prayed for our well-being after we made a small effort to bring smiles to their faces. Their compassionate gestures inspired us deeply, leading to the formation of an organization dedicated to spreading smiles and making a difference.
        </p>
      </Fade>
      <Fade triggerOnce delay={1000}>
        <p className="text-lg text-gray-600 mb-4 max-w-2xl">
          Registered under the West Bengal Registration Act, 1961, with registration number ‘3/2D/24337 of 2014-15’, we have been active for 7 years, conducting over 35 events to date. Our efforts have included feeding the hungry, supporting children in orphanages, and providing drinking water facilities at old age homes. With the support of generous individuals, we have conducted free medical checkups and medicine distribution, sponsored education for needy students, and rebuilt homes destroyed by floods. We have also assisted critical patients with surgeries and stood by cancer patients throughout their treatment.
        </p>
      </Fade>
      <Fade triggerOnce delay={1000}>
        <p className="text-lg text-gray-600 mb-4 max-w-2xl">
        Our commitment to spreading smiles and making a meaningful impact remains unwavering. Together, we can continue to bring hope and support to those in need.
        To know more about us click 
          <a href="https://aspireandglee.com/free-clothes-bank/" className="text-blue-500 underline"> here</a>.
        </p>
      </Fade>
    </div>
  );
};

export default About;