import React, { useEffect, useState } from 'react';
import Tabs from './components/Tabs';
import FilterBar from './components/FilterBar';
import OrderTable from './components/OrderTable';
import axios from 'axios';

const App = () => {
  const [orders, setOrders] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    orderId: '',
    customer: '',
    item: '',
    fromDate: '',
    toDate: '',
    minPrice: '',
    maxPrice: '',
    searchTerm: '',
    status: ''
  });

  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const fetchOrders = (customFilters=filters) => {
    const params = {
      ...customFilters,
      page,
      size
    };

    if (customFilters.searchTerm && customFilters.searchTerm.trim() !== '') {
    params.searchTerm = customFilters.searchTerm.trim().toLowerCase();
  }
    console.log('Sending filters:', params);
    axios.get('http://localhost:8080/api/orders/filter', { params })
      .then(res => {
        console.log('API Data:', res.data);
        setOrders(res.data.content);
        setTotalPages(res.data.totalPages);
      })
      .catch(err => {
        console.error('Failed to fetch orders:', err);
      });
  };
  const handleSearch = () => {
  const searchTermTrimmed = filters.searchTerm.trim();

  const updatedFilters = {
    ...filters,
    searchTerm: searchTermTrimmed
  };

    setFilters(updatedFilters);     // update the state
    setPage(0);                     // reset pagination
    fetchOrders(updatedFilters);    // call API with updated filters
  };

  const handleReset = () => {
    setFilters({
      orderId: '',
      customer: '',
      item: '',
      fromDate: '',
      toDate: '',
      minPrice: '',
      maxPrice: '',
      searchTerm: '',
      status: ''
    });
    setPage(0);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    fetchOrders();
  }, [page]);

  return (
    <div className="container py-4">
      <h2 className="mb-4">Order Details</h2>

      {/* tabs */}
      <Tabs selectedStatus={filters.status} onStatusChange={(value)=>{
        const updatedFilters = { ...filters, status: value.toLowerCase() };
        setFilters(updatedFilters);
        setPage(0);
        fetchOrders(updatedFilters);
      }} />

      {/* Search Bar and filter button*/}
    <div className="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
      <div className='flex-grow-1'>
        <input
          type="text"
          className="form-control"
          placeholder="Search..."
          value={filters.searchTerm || ''}
          onChange={(e) => {
            setFilters({ ...filters, searchTerm: e.target.value });
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearch();
          }}
        />
      </div>
      <button
          className="btn btn-outline-dark"
          onClick={() => setShowFilters(!showFilters)}
        >
          Filter
        </button>

    </div>
    
        {/* Toggle Filter Button */}
    {/* <div className="mb-3">
      <button
        className="btn btn-outline-dark"
        onClick={() => setShowFilters(!showFilters)}
      >
        Filter
      </button>
    </div> */}

  {showFilters && (
    <FilterBar
      filters={filters}
      onFilterChange={setFilters}
      onSearch={handleSearch}
      onReset={handleReset}
    />
  )}

      <OrderTable orders={orders} />

      {/* Pagination Controls */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <button
          className="btn btn-outline-primary"
          disabled={page === 0}
          onClick={() => handlePageChange(page - 1)}
        >
          Previous
        </button>
        <span>Page {page + 1} of {totalPages}</span>
        <button
          className="btn btn-outline-primary"
          disabled={page + 1 >= totalPages}
          onClick={() => handlePageChange(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
