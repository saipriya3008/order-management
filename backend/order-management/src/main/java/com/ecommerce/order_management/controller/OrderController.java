
package com.ecommerce.order_management.controller;

import com.ecommerce.order_management.entity.Order;
import com.ecommerce.order_management.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping
    public Page<Order> getAllOrders(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("deliveryDate").descending());
        return orderService.getAllOrders(pageable);
    }

    @PostMapping
    public Order addOrder(@RequestBody @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Order order) {
        return orderService.addOrder(order);
    }

    @GetMapping("/status/{status}")
    public List<Order> getByStatus(@PathVariable String status) {
        return orderService.getOrdersByStatus(status);
    }
    @GetMapping("/filter")
    public Page<Order> filterOrders(
            @RequestParam(required = false) String orderId,
            @RequestParam(required = false) String customer,
            @RequestParam(required = false) String item,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) java.time.LocalDate fromDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) java.time.LocalDate toDate,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) String status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(required = false) String searchTerm
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return orderService.getFilteredOrders(orderId, customer, item, fromDate, toDate, minPrice, maxPrice, status, searchTerm,pageable);
    }

}
