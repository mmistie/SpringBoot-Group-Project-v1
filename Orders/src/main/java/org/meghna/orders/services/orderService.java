package org.meghna.orders.services;

import jakarta.persistence.EntityNotFoundException;
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
                for (product product : order.getOrderItems()) {
                       totalPrice = totalPrice.add(product.getPrice().multiply(BigDecimal.valueOf(product.getStock())));
                   }
               order.setTotalPrice(totalPrice);
                return orderRepository.save(order);
    }

    public void deleteById(Long id) {
        orderRepository.deleteById(id);
    }

    public order findById(Long id) {
        return orderRepository.findById(id).orElse(null);
    }

    public List<order> findAll() {
        return (List<order>) orderRepository.findAll();
    }
}
