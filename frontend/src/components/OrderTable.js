import React from 'react';

const OrderTable = ({ orders }) => {
  return (
    <table className="table table-bordered">
      <thead className="table-dark">
        <tr>
          <th>ID</th>
          <th>Order ID</th>
          <th>Customer</th>
          <th>Order</th>
          <th>Delivery Date</th>
          <th>Delivery Pricing</th>
          <th>Delivery Status</th>
        </tr>
      </thead>
      <tbody>
        {orders.length === 0 ? (
          <tr>
            <td colSpan="7" className="text-center">No orders found</td>
          </tr>
        ) : (
          orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.orderId}</td>
              <td>{order.customer}</td>
              <td>{order.item}</td>
              <td>{order.deliveryDate}</td>
              <td>{order.deliveryPrice}</td>
              <td>{order.status}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default OrderTable;
