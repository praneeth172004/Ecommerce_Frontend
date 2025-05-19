import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const AddtocartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const increaseQuantity = (id,title) => {
  setCart(prev =>
    prev.map(item =>
      item.id === id && item.title ==title ? { ...item, quantity: item.quantity + 1 } : item
    )
  );
};

const decreaseQuantity = (id,title) => {
  setCart(prev =>
    prev.map(item =>
      item.id === id && item.title==title
        ? { ...item, quantity: item.quantity - 1 }
        : item
    )
    .filter(item => item.quantity > 0)
  );

};

  return (
    <CartContext.Provider value={{ cart, setCart,decreaseQuantity,increaseQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
