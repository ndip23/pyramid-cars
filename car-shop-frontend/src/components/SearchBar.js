// src/components/SearchBar.js
import React from 'react';

const SearchBar = ({ query, setQuery }) => {
  return (
    <div className="flex justify-center mb-10">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search cars or parts..."
        className="w-full max-w-lg px-6 py-3 rounded-2xl bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-white"
      />
    </div>
  );
};

export default SearchBar;
