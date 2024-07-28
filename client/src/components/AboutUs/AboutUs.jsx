import React from 'react';
import './AboutUs.css'; 
import aboutus1 from '../../assets/about1.png';
import aboutus2 from '../../assets/about2.png';
import aboutus3 from '../../assets/about3.png';
import { FaHome } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa";


const AboutUs = () => {
  const {language, setLanguage} = useContext(LanguageContext);
  const { t, i18n } = useTranslation();
  useEffect(()=>{
    i18n.changeLanguage(language);
},[language])
  return (
    <div className="about-us" id="about">
      <div className="about-us__text">
        <h4 className="about-us__subtitle">WHO ARE WE</h4>
        <h2 className="about-us__title">
          Assisting individuals in locating the appropriate real estate.
        </h2>
        <p className="about-us__description">
        Houseliv is dedicated to transforming the home buying, selling, and renting experience. With our comprehensive property listings, advanced search tools, and expert guidance, we help you find the perfect home effortlessly. Trust Houseliv to be your partner in making informed and confident real estate decisions.        </p>
        <div className="about-us__features">
          <div className="about-us__feature">
            <FaHome className="about-us__feature-icon" />
            <div>
              <h5>Find Your Perfect Rental Home</h5>
              <p>Explore a wide range of rental properties tailored to your needs. Use our advanced search filters to find a home that fits your lifestyle and budget</p>
            </div>
          </div>
          <div className="about-us__feature">
            <FaUserTie className="about-us__feature-icon" />
            <div>
              <h5>Sell Your Home with Ease</h5>
              <p>List your property on Houseliv and reach a wide audience of potential buyers. Our platform offers the tools and support you need for a successful sale</p>
            </div>
          </div>
        </div>
      </div>
      <div className="about-us__images">
        <div className="about-us__large-images">
          <img src={aboutus1} alt="Large 1" />
        </div>
        <div className="about-us__small-images">
          <img src={aboutus2} alt="Small 1" />
          <img src={aboutus3} alt="Small 2" />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
