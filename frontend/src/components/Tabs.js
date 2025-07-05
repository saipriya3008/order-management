import React from 'react';

const statusOptions = [
  { label: 'All Orders', value: '' },
  { label: 'Completed', value: 'Completed' },
  { label: 'Continuing', value: 'Continuing' },
  { label: 'Restitute', value: 'Restitute' },
  { label: 'Cancelled', value: 'Canceled' }
];

const Tabs = ({ selectedStatus, onStatusChange }) => {
  return (
    <ul className="nav nav-tabs mb-3">
      {statusOptions.map((status) => {
        const isActive = selectedStatus.toLowerCase() === status.value.toLowerCase();
        return (
          <li className="nav-item" key={status.value}>
            <button
              className={`nav-link ${isActive ? 'custom-active-tab' : ''}`}
              style={{
                color: isActive ? '#4caf50' : '#000',
                fontWeight: isActive ? '600' : 'normal',
                backgroundColor: isActive ? '#e9f5ee' : '',
                borderBottom: isActive ? '2px solid #4caf50' : '2px solid transparent'
              }}
              onClick={() => onStatusChange(status.value)}
            >
              {status.label}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default Tabs;
