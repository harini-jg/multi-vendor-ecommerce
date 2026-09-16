package com.multivendor.backend.controller;

import com.multivendor.backend.entity.Order;
import com.multivendor.backend.repository.OrderRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    private final OrderRepository orderRepository;

    public OrderController(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    // Create Order
    @PostMapping
    public ResponseEntity<Order> createOrder(
            @RequestBody Order order
    ) {
        if (order.getStatus() == null ||
            order.getStatus().isEmpty()) {

            order.setStatus("PENDING");
        }

        Order savedOrder =
                orderRepository.save(order);

        return ResponseEntity.ok(savedOrder);
    }

    // Get all Orders
    @GetMapping
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    // Get orders by user
    @GetMapping("/user/{userId}")
    public List<Order> getOrdersByUser(
        @PathVariable Long userId
    ) {
        return orderRepository.findAll()
            .stream()
            .filter(order ->
                    order.getUserId().equals(userId)
            )
            .toList();
}
    // Get Order by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getOrderById(
            @PathVariable Long id
    ) {
        return orderRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() ->
                        ResponseEntity.notFound().build()
                );
    }
}
