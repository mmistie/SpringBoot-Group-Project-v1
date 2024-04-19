package org.meghna.products.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import org.meghna.products.messaging.OrderPlacedEvent;
import org.meghna.products.model.Product;
import org.meghna.products.repository.ProductRepository;

@Component
public class OrderPlacedEventListener {

    private final ProductRepository productRepository;

    @Autowired
    public OrderPlacedEventListener(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @KafkaListener(topics = "OrderPlacedTopic", groupId = "products-group")
    public void handleOrderPlacedEvent(OrderPlacedEvent event) {
        // Logic to update product stock based on the received order details
        for (Long productId : event.getProductIds()) {
            // Retrieve the product from the repository
            Product product = productRepository.findById(productId).orElse(null);
            if (product != null) {
                // Update the product stock
                int currentStock = product.getStock();
                // Assuming productIds list contains product IDs with corresponding quantities
                int orderedQuantity = event.getProductIds().get(productId); // Assuming quantity is at the same index as product ID
                product.setStock(currentStock - orderedQuantity);
                // Save the updated product
                productRepository.save(product);
                System.out.println("Updated product stock for product ID " + productId);
            } else {
                System.out.println("Product not found for product ID " + productId);
            }
        }
    }
}
