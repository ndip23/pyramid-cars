// src/components/Cart.js
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import CartItem from './CartItem';

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();
  const [open, setOpen] = useState(false);

  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-6 right-6 z-50 bg-white text-black px-4 py-2 rounded-xl shadow-xl hover:scale-105 transition"
      >
        🛒 Cart ({cartItems.length})
      </button>

      {open && (
        <div className="fixed right-0 top-0 h-full w-80 bg-zinc-900 text-white shadow-2xl z-40 p-6 transition-all">
          <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
          <div className="space-y-4">
            {cartItems.map((item, index) => (
              <CartItem item={item} key={index} index={index} remove={removeFromCart} />
            ))}
          </div>
          <p className="mt-6 text-lg font-semibold">Total: ${total}</p>
          <button className="mt-4 w-full bg-white text-black px-4 py-2 rounded-xl hover:scale-105 transition">
            Checkout
          </button>
        </div>
      )}
    </>
  );
};

export default Cart;
