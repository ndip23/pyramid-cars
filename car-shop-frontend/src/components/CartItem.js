// src/components/CartItem.js
import React from 'react';

const CartItem = ({ item, index, remove }) => {
  return (
    <div className="flex justify-between items-center py-2 border-b border-zinc-700">
      <div>
        <p className="font-medium">{item.name}</p>
        <p className="text-gray-400 text-sm">${item.price}</p>
      </div>
      <button onClick={() => remove(index)} className="text-red-400">Remove</button>
    </div>
  );
};

export default CartItem;
