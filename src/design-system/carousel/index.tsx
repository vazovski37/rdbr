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
    <div className="relative">
      <Swiper
        slidesPerView={4}
        spaceBetween={20} // Add 20px space between slides
        navigation={{
          nextEl: '.swiper-button-two',
          prevEl: '.swiper-button-one',
        }}
        modules={[Navigation]}
        className="swiper-container rounded-lg overflow-hidden"
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
      <div className="swiper-button-one absolute top-1/2 -left-12 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-lg cursor-pointer z-10">
        <span className="material-symbols-outlined">arrow_back</span>
      </div>
      <div className="swiper-button-two absolute top-1/2 -right-12 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-lg cursor-pointer z-10">
        <span className="material-symbols-outlined">arrow_forward</span>
      </div>
    </div>
  );
};

export default Carousel;
