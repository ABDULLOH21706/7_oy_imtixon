import React from 'react';

interface FilterTabsProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  filters: { label: string; value: string }[];
}

const FilterTabs: React.FC<FilterTabsProps> = ({ activeFilter, onFilterChange, filters }) => (
  <div className="py-3">
    {filters.map((filter) => (
      <button
        key={filter.value}
        onClick={() => onFilterChange(filter.value)}
        className={`px-4 py-2 rounded-t ${
          activeFilter === filter.value ? 'border-b-2 border-blue-500 text-blue-400' : 'text-gray-400'
        }`}
      >
        {filter.label}
      </button>
    ))}
  </div>
);

export default FilterTabs;
