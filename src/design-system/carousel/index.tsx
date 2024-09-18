import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Card from '../card/index';

interface CarouselProps {
  items: Array<{
    id: number;
    image: string;
    price: number;
    city: { name: string };
    bedrooms: number;
    area: number;
    zip_code: string;
    is_rental: boolean;
  }>;
}

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  return (
    <div className="relative w-full">
      <Swiper
        
        slidesPerView={4}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        modules={[Navigation]}
        className="swiper-container"
      >
        {items.map((item) => (
          <SwiperSlide key={item.id}>
            <Card
              id={item.id}
              imageSrc={item.image}
              price={`${item.price.toLocaleString()} ₾`}
              location={item.city.name}
              bedrooms={item.bedrooms}
              area={`${item.area} მ²`}
              postalCode={item.zip_code}
              status={item.is_rental ? 'დაქირავება' : 'იყიდება'}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <div className="swiper-button-prev absolute top-1/2 -left-12 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-lg cursor-pointer z-10">
        <span className="material-icons">chevron_left</span>
      </div>
      <div className="swiper-button-next absolute top-1/2 -right-12 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-lg cursor-pointer z-10">
        <span className="material-icons">chevron_right</span>
      </div>
    </div>
  );
};

export default Carousel;
