import React from 'react';

const FilterBar = ({ filters, onFilterChange, onSearch, onReset }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ ...filters, [name]: value.trim() });
  };

  return (
    <div className="mb-3">
      <div className="row g-2 mb-2">
        <div className="col"><input name="orderId" className="form-control" placeholder="Order ID" value={filters.orderId} onChange={handleChange} /></div>
        <div className="col"><input name="customer" className="form-control" placeholder="Customer" value={filters.customer} onChange={handleChange} /></div>
        <div className="col"><input name="item" className="form-control" placeholder="Order" value={filters.item} onChange={handleChange} /></div>
        <div className="col"><input name="fromDate" type="date" className="form-control" value={filters.fromDate} onChange={handleChange} /></div>
        <div className="col"><input name="toDate" type="date" className="form-control" value={filters.toDate} onChange={handleChange} /></div>
        <div className="col"><input name="minPrice" type="number" className="form-control" placeholder="Min Price" value={filters.minPrice} onChange={handleChange} /></div>
        <div className="col"><input name="maxPrice" type="number" className="form-control" placeholder="Max Price" value={filters.maxPrice} onChange={handleChange} /></div>
      </div>

      <div>
        <button className="btn btn-primary me-2" onClick={onSearch}>Search</button>
        <button className="btn btn-secondary" onClick={onReset}>Reset</button>
      </div>
    </div>
  );
};

export default FilterBar;
