import React from 'react';
import { Link } from 'react-router-dom';

const PartCard = ({ part, id }) => {
  return (
    <Link to={`/part/${id}`}>
      <div className="bg-zinc-800 rounded-2xl p-4 shadow-soft hover:scale-[1.02] transition cursor-pointer">
        <img src={part.image} alt={part.name} className="w-full h-40 object-contain mb-3 rounded-xl bg-zinc-900 p-2" />
        <h3 className="text-lg font-semibold">{part.name}</h3>
        <p className="text-gray-400 text-sm">{part.description}</p>
        <p className="text-white font-bold mt-2 text-md">${part.price}</p>
      </div>
    </Link>
  );
};

export default PartCard;

