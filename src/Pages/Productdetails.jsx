import React, { useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useCart } from "../ContextApi/AddtocartProvider";
import { useProduct } from "../ContextApi/Product";
import { useData } from "../ContextApi/Datapassing";

export default function Productdetails() {
  const { pathname } = useLocation();
  const { cart, setCart } = useCart();
  const { productdata } = useProduct();
  const {data}=useData();
  console.log(productdata);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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

  if (!productdata) {
    return <div>Loading product details...</div>;
  }

  return (
    <div className="w-full max-w-[1140px] mx-auto min-h-screen bg-white">
      <main className="w-full mt-[100px] flex flex-col">
        {/* Breadcrumb */}
        <div className="w-full pl-[30px] text-black text-[18px] py-2">
          {`Account / ${data} / ${productdata.title}`}
        </div>

        {/* Main Product Section */}
        <div className="w-full max-w-[1100px] flex justify-around h-[700px] mt-[12px] mx-auto rounded-md shadow-md p-4">
          {/* Thumbnail Images */}
          {/* Add thumbnails here if needed */}

          {/* Main Product Image */}
          <div className="w-[60%] flex justify-center items-center h-[500px] mt-[20px]">
            <img
              src={productdata.imageUrl}
              alt="Main product"
              className="w-[500px] h-[500px] object-contain"
            />
          </div>

          {/* Product Details */}
          <div className="w-[20%] flex flex-col justify-start space-y-4">
            <h2 className="text-xl font-bold text-gray-800">
              {productdata.title}
            </h2>
            <p className="text-md text-gray-600">
              Category: {productdata.category}
            </p>
            <p className="text-lg text-red-500 font-semibold">
              ${productdata.price.toFixed(2)}
            </p>
            <p className="text-sm text-gray-500">{productdata.description}</p>
            <button
              className="mt-4 bg-amber-500 text-black font-semibold py-2 px-4 rounded hover:bg-amber-600 transition"
              onClick={() => handleAddToCart(productdata)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
