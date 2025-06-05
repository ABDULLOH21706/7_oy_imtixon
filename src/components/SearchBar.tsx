// components/SearchBar.tsx
import React from 'react';
import { FaSearch } from 'react-icons/fa';

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, placeholder = 'Qidirish...' }) => (
  <div className="flex items-center bg-neutral-800 rounded px-3 py-2">
    <FaSearch className="text-gray-400 mr-2" />
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="bg-transparent outline-none text-white"
    />
  </div>
);

export default SearchBar;
