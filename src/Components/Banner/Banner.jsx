import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import slider1 from '/slider1.jpg'
import slider2 from '/slider2.jpg'
import slider4 from '/slider4.jpg'
import { Carousel } from 'react-responsive-carousel';


const Banner = () => {
  return (
    <Carousel autoPlay={true} infiniteLoop={true} showThumbs={false} interval={2500}>
      <div>
        <img src={slider1} className="w-full h-95 object-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent"></div>

        {/* text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 py-6">
          <h2 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg">
            “Create. Compete. Celebrate.”          </h2>
          <p className="mt-3 text-sm md:text-lg text-white/90 max-w-xl">
            ContestHub brings creators and competitors together on one seamless platform. Launch your own contests, participate in exciting challenges, and showcase your creative talent to a wider audience. Whether you're a designer, writer, innovator, or enthusiast, ContestHub gives you the space to shine and grow.          </p>
          <button to='/blog' className="mt-6 btn btn-primary hover:bg-[#1e40af] text-white border-none shadow-none">
            Explore Now
          </button>
        </div>


      </div>
      <div>
        <img src={slider2} className="w-full h-95 object-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

        {/* text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 py-7">
          <h2 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg">
            “Your Skils. Your Stage”
          </h2>
          <p className="mt-3 text-sm md:text-lg text-white/90 max-w-xl">
            Explore hundreds of contests across design, writing, business, gaming, and more. With secure registration, transparent judging, and dedicated dashboards for every role, ContestHub makes contest participation smooth, fun, and rewarding. Join today and unlock new opportunities to learn, earn, and connect.          </p>
          <button to='/blog' className="mt-6 btn btn-primary hover:bg-[#1e40af] text-white border-none shadow-none">
            Explore Now
          </button>
        </div>


      </div>
      <div>
        <img src={slider4} className="w-full h-95 object-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

        {/* text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6  py-6">
          <h2 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg">
            “Host Smarter. Compete Better.”          </h2>
          <p className="mt-3 text-sm md:text-lg text-white/90 max-w-xl">
            ContestHub empowers contest creators with powerful management tools while offering participants a simple, enjoyable experience. From payments to submissions, everything is streamlined and secure. Build your audience, improve your skills, and be part of a community that values creativity and fair competition.          </p>
          <button to='/blog' className="mt-6 btn btn-primary hover:bg-[#1e40af] text-white border-none shadow-none">
            Explore Now
          </button>
        </div>


      </div>
    </Carousel>
  );
};

export default Banner; <h2>This is banner</h2>