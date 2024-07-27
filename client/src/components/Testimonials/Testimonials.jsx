import React, { useState } from 'react';
import './Testimonials.css'; 


const testimonials = [
  {
    text: "Houseliv has revolutionized how we manage properties—simple, efficient, and essential for our operations",
   
  },
  {
    text: "Using Houseliv has streamlined our tenant interactions and maintenance processes, making everything seamless and stress-free.",
   
  },
  {
    text:"Tenants love the ease of paying rent and submitting maintenance requests through Houseliv—it's made renting a breeze."
  
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleTestimonialChange = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section className="testimonial">
      <div className="testimonial-container" id="testimonial">
        <div className="testimonial-left">
          <h3>TESTIMONIALS</h3>
          <h1>Look What Our Customers Say!</h1>
          <p>Transforming Property Management with Ease</p>
          <div className="testimonial-navigation">
            <button 
              className="nav-button" 
              onClick={() => handleTestimonialChange((currentIndex - 1 + testimonials.length) % testimonials.length)}
            >
              ←
            </button>
            <button 
              className="nav-button" 
              onClick={() => handleTestimonialChange((currentIndex + 1) % testimonials.length)}
            >
              →
            </button>
          </div>
        </div>
        <div className="testimonial-right">
          <div className="testimonial-card">
            <p className="quote">“</p>
            <p className="testimonial-text">{testimonials[currentIndex].text}</p>
            <div className="testimonial-author">
              {/* <img src={testimonials[currentIndex].image} alt={testimonials[currentIndex].author} className="author-image" /> */}
              <div className="author-info">
                {/* <h4>{testimonials[currentIndex].author}</h4> */}
                {/* <div className="rating">
                  {[...Array(testimonials[currentIndex].rating)].map((star, i) => (
                    <span key={i}>★</span>
                  ))}
                </div> */}
              </div>
            </div>
          </div>
          <div className="testimonial-indicators">
            {testimonials.map((_, index) => (
              <div 
                key={index} 
                className={`indicator ${currentIndex === index ? 'active' : ''}`} 
                onClick={() => handleTestimonialChange(index)}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
