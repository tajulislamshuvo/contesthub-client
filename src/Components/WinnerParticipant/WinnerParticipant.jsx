import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../Spinner/Spinner';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import WinnerCard from './WinnerCard';


const WinnerParticipant = () => {
  const axiosSecure = useAxiosSecure();
  const { data: winners = [], isLoading } = useQuery({
    queryKey: ['winner', 'contestWinner'],
    queryFn: async () => {
      const res = await axiosSecure.get('/contest-winner');
      return res.data
    }
  })


  const uniqueWinners = winners.filter(
    (winner, index, self) =>
      index === self.findIndex(
        (w) => w.participantEmail === winner.participantEmail
      )
  );

  if (isLoading) {
    return <Spinner></Spinner>
  }
  return (
    <div className='my-14 mx-3'>
      <div className='text-center'>
        <h3 className='text-center text-4xl font-bold my-4'>Our recent winners</h3>

      </div>

      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        loop={true}
        centeredSlides={true}
        spaceBetween={3}
        // slidesPerView={3}
        breakpoints={{
          640: { slidesPerView: 1 },   // small devices
          768: { slidesPerView: 2 },   // medium devices
          1024: { slidesPerView: 3 },  // large devices
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: 1,
          depth: 0,
          scale: 0.8,
          modifier: 1,
          slideShadows: true,
        }}
        autoplay={{
          delay: 1600,
          disableOnInteraction: false,
        }}

        pagination={true}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper ">
        {
          uniqueWinners.map((winner, index) => <SwiperSlide key={winner._id}>
            <WinnerCard isLoading={isLoading} winner={winner} index={index} ></WinnerCard>
          </SwiperSlide>)
        }

      </Swiper>

    </div>
  );
};

export default WinnerParticipant;