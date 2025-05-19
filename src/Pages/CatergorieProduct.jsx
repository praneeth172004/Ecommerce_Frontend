import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../ContextApi/Datapassing';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useCart } from '../ContextApi/AddtocartProvider';
import { useProduct } from '../ContextApi/Product';

export default function CategoryProduct() {
  const navigate = useNavigate();
  const { data, setdata } = useData();
  const [response, setResponse] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

  // Save selected category to localStorage on data change
  useEffect(() => {
    if (data) {
      localStorage.setItem('select', JSON.stringify(data));
    }
  }, [data]);

  // Load selectedCategory and fetch products on mount
  useEffect(() => {
    // Use null fallback for safe JSON parse
    const selected = JSON.parse(localStorage.getItem('select') || 'null');
    if (selected) {
      setSelectedCategory(selected);
      const fetchData = async () => {
        try {
          const choice = selected === 'Smart Tvs' ? 'smarttvs' : selected;
          const res = await axios.get(`${API_BASE_URL}/api/productscategories/${choice}`);
          setResponse(res.data);
        } catch (err) {
          console.error('Error fetching data:', err);
        }
      };
      fetchData();
    } else {
      setSelectedCategory('');
    }
  }, [API_BASE_URL]);
  const {productdata,setproductdata}=useProduct();
  
  // Navigate to product details with product data
  const handleProduct = useCallback(
    (product) => {
      setproductdata(product)
      // Pass selected product as state rather than whole response
      navigate('/productdetails', { state: product });
    },
    [navigate, setdata]
  );

  // Cart context
  const { cart, setCart } = useCart();

  // Add product to cart, with quantity logic
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
    <div className="w-full min-h-screen bg-white flex flex-col px-4 md:px-10 mt-[80px] mb-[15px]">
      <h2 className="text-[28px] md:text-[40px] font-bold mb-8 text-amber-700 text-center">
        {selectedCategory || 'Loading...'}
      </h2>

      <div className="flex flex-col gap-6 items-center">
        {response.length === 0 ? (
          <p className="text-gray-500 text-center">Loading products...</p>
        ) : (
          response.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="cursor-pointer flex flex-col md:flex-row w-full max-w-[800px] rounded-2xl shadow-lg p-4 gap-4 bg-white hover:shadow-xl transition-all duration-300"
            >
              <div
                className="w-full md:w-[280px] aspect-video overflow-hidden rounded-xl"
                onClick={() => handleProduct(item)}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 ease-in-out"
                />
              </div>

              <div className="flex flex-col justify-between flex-1">
                <div onClick={() => handleProduct(item)}>
                  <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <div className="text-lg font-bold text-amber-600">₹{item.price}</div>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
