package org.meghna.orders.Controller;

import org.meghna.orders.model.order;
import org.meghna.orders.services.orderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.bind.annotation.CrossOrigin;
import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/orders")
public class OrderController {
    @Autowired
    private orderService orderService;

    @PostMapping
    public ResponseEntity<order> createOrder(@RequestBody order order) {
        order savedOrder = orderService.save(order);
        return ResponseEntity.ok(savedOrder);
    }

    @GetMapping("/{id}")
    public ResponseEntity<order> getOrderById(@PathVariable Long id) {
        order order = orderService.findById(id);
        if (order == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(order);
    }

    @GetMapping
    public ResponseEntity<List<order>> getAllOrders() {
        List<order> orders = orderService.findAll();
        return ResponseEntity.ok(orders);
    }
}