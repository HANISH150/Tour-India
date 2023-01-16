import React from 'react'
import './SwiperImages.css'
// import Swiper core and required modules
import { Navigation ,Autoplay } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

//importing images array
import imagesArray from './ImageArray';


function SwiperImages() {
  return (
    <>
    <div className="container m-5 mx-auto swiper-fit p-4">
    <Swiper
        //breakpoints
        breakpoints={{
          0:{
            slidesPerView:1
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1000: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
          1200: {
            slidesPerView : 4,
            spaceBetween : 50
          }
        }}

        modules={[Navigation,Autoplay]}
        rewind={true}
        navigation={false}
        className="mySwiper"
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}

      >

        {
          imagesArray.map((data,id)=>
            <SwiperSlide key={id} className='text-center'>
              <div className="container">
              <img src={data} alt="image not found!!" style={{height:150,width:250,borderRadius:10}} />
              </div>
            </SwiperSlide>
          )
        }
      </Swiper>
    </div>
    </>
  )
}

export default SwiperImages
