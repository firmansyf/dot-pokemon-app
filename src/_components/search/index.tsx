import React from 'react';

interface SearchInputProps {
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange, placeholder = "Type character name", label = "Search" }) => {
  return (
    <div className="flex flex-col">
      {label && <label className="leading-7 text-sm text-gray-600">{label}</label>}
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete="off"
        className="bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:bg-transparent text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
      />
    </div>
  );
};

export default SearchInput;
