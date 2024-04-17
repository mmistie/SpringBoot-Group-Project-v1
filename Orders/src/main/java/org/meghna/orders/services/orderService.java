package org.meghna.orders.services;

import jakarta.persistence.EntityNotFoundException;
import org.meghna.orders.model.OrderItem;
import org.meghna.orders.model.order;
import org.meghna.orders.repository.OrderRepository;
import org.meghna.products.model.product;
import org.meghna.products.repository.ProductRepository;
import org.meghna.products.services.productservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class orderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    public order save(order order) {
        BigDecimal totalPrice = BigDecimal.ZERO;
        for (OrderItem orderItem : order.getOrderItems()) {
            BigDecimal itemTotalPrice = orderItem.getProduct().getPrice().multiply(BigDecimal.valueOf(orderItem.getQuantity()));
            totalPrice = totalPrice.add(itemTotalPrice);
        }
        order.setTotalPrice(totalPrice);
        return orderRepository.save(order);
    }
    public order findById(Long id) {
        order order = orderRepository.findById(id).orElse(null);
        if (order != null) {
            order.getOrderItems().size(); // Trigger lazy loading of order items
        }
        return order;
    }

    public List<order> findAll() {
        List<order> orders = orderRepository.findAll();
        for (order order : orders) {
            order.getOrderItems().size(); // Trigger lazy loading of order items
        }
        return orders;
    }
}
