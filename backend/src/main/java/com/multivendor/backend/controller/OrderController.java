package com.multivendor.backend.controller;

import com.multivendor.backend.entity.Order;
import com.multivendor.backend.entity.OrderItem;
import com.multivendor.backend.repository.OrderItemRepository;
import com.multivendor.backend.repository.OrderRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;

    public OrderController(
            OrderRepository orderRepository,
            OrderItemRepository orderItemRepository) {

        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
    }

    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody OrderRequest request) {

        Order order = new Order();

        order.setUserId(request.getUserId());
        order.setTotalAmount(request.getTotalAmount());

        if (request.getStatus() == null || request.getStatus().isEmpty()) {
            order.setStatus("PENDING");
        } else {
            order.setStatus(request.getStatus());
        }

        Order savedOrder = orderRepository.save(order);

        // Save order items
        if (request.getItems() != null) {

            for (OrderItem item : request.getItems()) {

                item.setOrderId(savedOrder.getId());

                orderItemRepository.save(item);
            }
        }

        return ResponseEntity.ok(savedOrder);
    }

    @GetMapping
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @GetMapping("/user/{userId}")
    public List<Order> getOrdersByUser(@PathVariable Long userId) {

        return orderRepository.findAll()
                .stream()
                .filter(order ->
                        order.getUserId() != null &&
                        order.getUserId().equals(userId))
                .toList();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getOrderById(@PathVariable Long id) {

        return orderRepository.findById(id)
                .map(order -> {

                    List<OrderItem> items =
                            orderItemRepository.findByOrderId(order.getId());

                    OrderResponse response =
                            new OrderResponse(order, items);

                    return ResponseEntity.ok(response);
                })
                .orElseGet(() ->
                        ResponseEntity.notFound().build());
    }


    // Request class
    public static class OrderRequest {

        private Long userId;

        private Double totalAmount;

        private String status;

        private List<OrderItem> items;


        public Long getUserId() {
            return userId;
        }

        public void setUserId(Long userId) {
            this.userId = userId;
        }

        public Double getTotalAmount() {
            return totalAmount;
        }

        public void setTotalAmount(Double totalAmount) {
            this.totalAmount = totalAmount;
        }

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }

        public List<OrderItem> getItems() {
            return items;
        }

        public void setItems(List<OrderItem> items) {
            this.items = items;
        }
    }


    // Response class
    public static class OrderResponse {

        private Order order;

        private List<OrderItem> items;


        public OrderResponse(Order order, List<OrderItem> items) {
            this.order = order;
            this.items = items;
        }

        public Order getOrder() {
            return order;
        }

        public List<OrderItem> getItems() {
            return items;
        }
    }
}