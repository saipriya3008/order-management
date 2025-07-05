package com.ecommerce.order_management.entity;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String orderId;
    private String customer;
    private String item;

    private LocalDate deliveryDate;

    private Double deliveryPrice;

    private String status; // Completed, Continuing, Restitute, Canceled
}

