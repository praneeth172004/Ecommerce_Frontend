import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../ContextApi/AddtocartProvider';

export default function Cart() {
  const { cart, increaseQuantity, decreaseQuantity } = useCart();
  const navigate = useNavigate();

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );

  const shipping = 0;
  const total = subtotal + shipping;

  const handleReturnToShop = () => navigate('/');
 

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col mb-[15px]'>
      <main className='flex flex-col text-white justify-center items-center px-4'>
        <div className="text-black mt-[100px] w-full max-w-6xl text-[18px]">
          Home / My Account
        </div>

        <div className='w-full max-w-[900px] flex flex-col gap-6 mt-6 text-black'>
          <div className='grid grid-cols-4 text-center font-semibold bg-white shadow-md rounded-md p-4'>
            <div>Product</div>
            <div>Price</div>
            <div>Quantity</div>
            <div>Subtotal</div>
          </div>

          {cart.length === 0 ? (
            <div className="text-center p-10 bg-white rounded-md shadow-md">
              Your cart is empty.
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className='grid grid-cols-4 items-center text-center bg-white shadow-md rounded-md p-4'>
                <div className='flex items-center gap-3 justify-center'>
                  <img
                    src={item.imageUrl || item.image}
                    alt={item.title || item.name}
                    className='w-[40px] h-[40px] object-cover'
                  />
                  <span>{item.title || item.name}</span>
                </div>
                <div>₹{item.price}</div>
                <div className='flex items-center justify-center gap-2'>
                  <button
                    onClick={() => decreaseQuantity(item.id,item.title)}
                    className='px-2 py-1 bg-gray-300 rounded'
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item.id,item.title)}
                    className='px-2 py-1 bg-gray-300 rounded'
                  >
                    +
                  </button>
                </div>
                <div>₹{(item.price * (item.quantity || 1)).toFixed(2)}</div>
              </div>
            ))
          )}
        </div>

        <div className='w-full max-w-[900px] flex justify-between mt-[20px]'>
          <button
            onClick={handleReturnToShop}
            className='border-2 bg-white text-black px-4 py-2 rounded-md border-gray-300'
          >
            Return To Shop
          </button>
          
        </div>

        <div className='w-full max-w-[900px] flex justify-between mt-[15px] gap-4 flex-wrap'>
          <div className='w-full md:w-[48%] flex justify-between items-center'>
            <input
              type="text"
              placeholder='Coupon Code'
              className='flex-1 border-2 border-gray-300 px-3 py-2 rounded-md mr-2 placeholder:text-gray-400'
            />
            <button className='bg-red-400 text-white px-4 py-2 rounded-md border-2 border-gray-300'>
              Apply Coupon
            </button>
          </div>

          <div className='w-full md:w-[48%] bg-white text-black p-4 rounded-md shadow-md'>
            <h5 className='font-semibold text-lg mb-3'>Cart Total</h5>
            <div className='flex justify-between border-b py-2'>
              <span>Subtotal:</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className='flex justify-between border-b py-2'>
              <span>Shipping:</span>
              <span>{shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}</span>
            </div>
            <div className='flex justify-between font-semibold text-lg py-2'>
              <span>Total:</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            <button className='w-full mt-4 bg-black text-white py-2 rounded-md hover:opacity-90'>
              Proceed to Checkout
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
