import React, { useCallback } from 'react';
import { Camera, Laptop, Phone, Trash2 } from 'lucide-react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useCart } from '../ContextApi/AddtocartProvider';

export default function WishlistCard() {
  const carditems = [
    { id: 1, icon: 'laptop', title: 'Laptop', price: 200 },
    { id: 2, icon: 'phone', title: 'Phone', price: 150 },
    { id: 3, icon: 'camera', title: 'Camera', price: 300 },
    { id: 4, icon: 'laptop', title: 'MacBook', price: 1000 },
    { id: 5, icon: 'phone', title: 'iPhone', price: 800 },
  ];

  const getIcon = (icon) => {
    switch (icon) {
      case 'laptop': return <Laptop size={50} />;
      case 'phone': return <Phone size={50} />;
      case 'camera': return <Camera size={50} />;
      default: return null;
    }
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  const { cart, setCart } = useCart();

  const handleAddToCart = useCallback(
    (product) => {
      setCart((prevCart) => {
        const index = prevCart.findIndex(
          (item) => item.id === product.id && item.title === product.title
        );
        if (index >= 0) {
          const updatedCart = [...prevCart];
          updatedCart[index] = {
            ...updatedCart[index],
            quantity: (updatedCart[index].quantity || 1) + 1,
          };
          return updatedCart;
        } else {
          return [...prevCart, { ...product, quantity: 1 }];
        }
      });
    },
    [setCart]
  );

  return (
    <div className="w-full max-w-[1180px] mx-auto py-6 px-2 sm:px-4">
      <Slider {...settings}>
        {carditems.map((item) => (
          <div key={item.id} className="px-2 mb-[5px]">
            <div className="w-full h-[320px] bg-white rounded-2xl shadow hover:shadow-lg transition-all duration-300 flex flex-col">
              {/* Top - Discount & Delete */}
              <div className="relative bg-[#F9F9F9] h-[220px] rounded-t-2xl p-3 flex flex-col justify-between">
                <div className="flex justify-between">
                  <span className="bg-red-500 text-white text-xs font-semibold rounded-full px-2 py-1">
                    -35%
                  </span>
                  <button
                    className="text-gray-500 hover:text-red-600 transition"
                    title="Remove from Wishlist"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="flex justify-center items-center h-full">
                  <span className="text-gray-700">{getIcon(item.icon)}</span>
                </div>
              </div>

              {/* Bottom - Title & Price */}
              <div className="px-4 py-3 flex flex-col space-y-1">
                <div className="text-sm font-medium text-black truncate">{item.title}</div>
                <div className="text-sm font-semibold text-red-500">${item.price}</div>
                <div
                  className="text-sm font-semibold text-white bg-red-600 border rounded-sm w-fit p-[5px] cursor-pointer"
                  onClick={() => handleAddToCart(item)}
                >
                  Add to Cart
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
