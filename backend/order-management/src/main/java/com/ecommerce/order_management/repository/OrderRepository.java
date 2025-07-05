package com.ecommerce.order_management.repository;


import com.ecommerce.order_management.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {

}

