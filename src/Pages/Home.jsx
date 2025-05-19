import React from 'react';
import image1 from "../assets/allmobiles.jpeg";
import image2 from "../assets/laptop.jpg";
import image3 from "../assets/accessories.jpg"
import image4 from "../assets/watch.jpg"
import image5 from "../assets/headphone.jpg"
import image6 from "../assets/tv.jpg"
import image7 from "../assets/speaker.jpg"
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import WishlistCard from '../Components/WishlistCard';
import { useNavigate } from 'react-router-dom';
import './custom-slick.css';
import { useData } from '../ContextApi/Datapassing';

export default function Home() {
  const navigate = useNavigate();
  const {setdata}=useData();
  const menuItems = [
    { title: "Mobiles", image: image1 },
    { title: "Laptops", image: image2 },
    { title: "Accessories", image: image3 },
    { title: "Watches", image: image4 },
    { title: "Headphones", image: image5 },
    { title: "Tvs", image: image6 },
    { title: "Speakers", image: image7 },
  ];

  const handlecategoriex = async (name) => {
    
    setdata(name);
    
   
      localStorage.clear();
    
    
    navigate("/categorie");
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 569,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full min-h-screen bg-white mt-[80px] px-4 md:px-10 lg:px-20 ml-[2px]">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 text-amber-700">
        Shop by Category
      </h1>

      <Slider {...settings}>
        {menuItems.map((item, index) => (
          <div className='w-fit'>

          
          <div key={index} className="flex  justify-center px-2 " onClick={() => handlecategoriex(item.title)}>
            <div
              className="w-[280px] sm:w-[260px] md:w-[280px] lg:w-[300px] h-[300px] rounded-3xl shadow-md 
                         flex flex-col justify-center items-center transition-transform duration-300 ease-in-out 
                         hover:scale-105 cursor-pointer mb-4 bg-white"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-[160px] h-[160px] object-cover rounded-lg"
              />
              <div className="text-base sm:text-sm md:text-base font-semibold text-center text-gray-900 mt-5">
                {item.title}
              </div>
            </div>
          </div>
          </div>
        ))}
      </Slider>

      {/* This Month Section */}
      <div className="flex flex-col space-y-4 mt-16 w-full min-h-[500px] ">
        <div className="flex items-center space-x-3 px-1">
          <div className="h-12 w-6 bg-red-500 rounded"></div>
          <div className="text-red-600 text-xl sm:text-lg font-semibold">This Month</div>
        </div>
        <div className="">
          <WishlistCard />
        </div>
      </div>
    </div>
  );
}
