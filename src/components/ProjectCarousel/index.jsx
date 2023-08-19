import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
const ProjectCarousel = ({ data }) => {
  return (
    <Swiper
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={false} modules={[Pagination, Autoplay]}>
      {
        data.map((item, index) => (
          <SwiperSlide key={index}>
            <img src={item} />
          </SwiperSlide>
        ))
      }

    </Swiper>
  )
}

export default ProjectCarousel
