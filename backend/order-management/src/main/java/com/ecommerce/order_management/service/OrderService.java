package com.ecommerce.order_management.service;

import com.ecommerce.order_management.entity.Order;
import com.ecommerce.order_management.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.time.LocalDate;
import java.util.stream.Collectors;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    public Page<Order> getAllOrders(Pageable pageable) {
        return orderRepository.findAll(pageable);
    }

    public Order addOrder(Order order) {
        return orderRepository.save(order);
    }

    public List<Order> getOrdersByStatus(String status) {
        return orderRepository.findAll().stream()
                .filter(order -> order.getStatus().equalsIgnoreCase(status))
                .toList();
    }


    public Page<Order> getFilteredOrders(
            String orderId,
            String customer,
            String item,
            LocalDate fromDate,
            LocalDate toDate,
            Double minPrice,
            Double maxPrice,
            String status,
            String searchTerm,
            Pageable pageable) {
        final String finalOrderId=(orderId != null && !orderId.isBlank())?orderId.trim().toLowerCase():null;
        final String finalCustomer=(customer != null && !customer.isBlank())?customer.trim().toLowerCase():null;
        final String finalItem=(item != null && !item.isBlank())?item.trim().toLowerCase():null;
        final String finalStatus=(status != null && !status.isBlank())?status.trim().toLowerCase():null;
        final String finalSearch = (searchTerm != null && !searchTerm.isBlank()) ? searchTerm.trim().toLowerCase() : null;
        List<Order> allOrders = orderRepository.findAll();
        List<Order> filteredOrders = allOrders.stream()
                .filter(o -> finalSearch == null ||
                        o.getOrderId().toLowerCase().contains(finalSearch) ||
                        o.getCustomer().toLowerCase().contains(finalSearch) ||
                        o.getItem().toLowerCase().contains(finalSearch) ||
                        o.getStatus().toLowerCase().contains(finalSearch) ||                              // ✅ status
                        o.getDeliveryDate().toString().contains(finalSearch) ||                           // ✅ date as string
                        String.valueOf(o.getDeliveryPrice()).contains(finalSearch)
                )
                .filter(o -> finalOrderId == null || o.getOrderId().toLowerCase().contains(finalOrderId))
                .filter(o -> finalCustomer == null || o.getCustomer().toLowerCase().contains(finalCustomer))
//                .filter(o -> o.getCustomer().toLowerCase().contains("eve"))

                .filter(o -> finalItem == null || o.getItem().toLowerCase().contains(finalItem))
                .filter(o -> fromDate == null || !o.getDeliveryDate().isBefore(fromDate))
                .filter(o -> toDate == null || !o.getDeliveryDate().isAfter(toDate))
                .filter(o -> minPrice == null || o.getDeliveryPrice() >= minPrice)
                .filter(o -> maxPrice == null || o.getDeliveryPrice() <= maxPrice)
                .filter(o -> finalStatus == null || o.getStatus().toLowerCase().equals(finalStatus))
                .collect(Collectors.toList());

        int start = (int) pageable.getOffset();
        int end = Math.min(start + pageable.getPageSize(), filteredOrders.size());
        List<Order> pagedList = filteredOrders.subList(start, end);

        return new PageImpl<>(filteredOrders.subList(start, end), pageable, filteredOrders.size());
    }

}

