import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectCoverflow, Pagination, Navigation, Autoplay } from "swiper/modules";

import img_1 from "/img_1.jpg";
import img_2 from "/img_2.jpg";
import img_3 from "/img_3.jpg";
import img_4 from "/img_4.jpg";
import img_5 from "/img_5.jpg";


function CardSlider() {
  const slides = [
    { type: "image", src: img_1, alt: "Slide 1" },
    { type: "image", src: img_2, alt: "Slide 2" },
    { type: "image", src: img_3, alt: "Slide 3" },
    { type: "image", src: img_4, alt: "Slide 4" },
    { type: "image", src: img_5, alt: "Slide 5" },
  ];

  const minSlides = 6; // Minimum number of slides required for loop mode
  const slidesToShow = slides.length >= minSlides ? slides : [...slides, ...slides];

  return (
    <div className="max-w-7xl mx-auto py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Our Memories</h1>
      <Swiper
        className="swiper-container h-96 py-8 relative"
        spaceBetween={50}
        slidesPerView="auto"
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true, el: ".swiper-pagination" }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
          clickable: true,
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 300,
          modifier: 1,
          slideShadows: false,
        }}
        modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
      >
        {slidesToShow.map((slide, index) => (
          <SwiperSlide
            key={index}
            className="swiper-slide w-96 h-96 relative flex justify-center items-center"
          >
            <img
              src={slide.src}
              alt={slide.alt}
              className="w-80 h-80 rounded-2xl object-cover"
            />
          </SwiperSlide>
        ))}

        <div className="slider-controler flex justify-center items-center mt-8">
          <div className="swiper-button-prev slider-arrow bg-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center">
            <ion-icon name="arrow-back-outline" className="text-2xl text-gray-700"></ion-icon>
          </div>
          <div className="swiper-button-next slider-arrow bg-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center ml-4">
            <ion-icon name="arrow-forward-outline" className="text-2xl text-gray-700"></ion-icon>
          </div>
          <div className="swiper-pagination mt-4"></div>
        </div>
      </Swiper>
    </div>
  );
}

export default CardSlider;
