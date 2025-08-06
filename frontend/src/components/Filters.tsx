import React, { useState } from 'react';

type FiltersProps = {
  onFilterChange: (filters: { type: string; region: string }) => void;
};

const Filters: React.FC<FiltersProps> = ({ onFilterChange }) => {
  const [type, setType] = useState('');
  const [region, setRegion] = useState('');

  const applyFilters = () => {
    onFilterChange({ type, region });
  };

  return (
    <div style={{ marginBottom: 16 }}>
      <select onChange={e => setType(e.target.value)} value={type}>
        <option value=''>Всі типи</option>
        <option value='ракета'>Ракета</option>
        <option value='дрон'>Дрон</option>
        <option value='артилерія'>Артилерія</option>
      </select>
      <select onChange={e => setRegion(e.target.value)} value={region} style={{ marginLeft: 8 }}>
        <option value=''>Всі області</option>
        <option value='Харківська'>Харківська</option>
        <option value='Київська'>Київська</option>
        {/* Додати інші області */}
      </select>
      <button onClick={applyFilters} style={{ marginLeft: 8 }}>Фільтрувати</button>
    </div>
  );
};

export default Filters;