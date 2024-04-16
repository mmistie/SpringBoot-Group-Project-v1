package org.meghna.admin.controller;

import org.meghna.admin.service.AdminService;
import org.meghna.orders.model.order;
import org.meghna.orders.services.orderService;
import org.meghna.products.model.product;
import org.meghna.products.services.productservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private productservice productService;

    @Autowired
    private orderService orderservice;

    // Product management endpoints

    @GetMapping("/products")
    public ResponseEntity<List<product>> getAllProducts() {
        return ResponseEntity.ok(productService.findAll());
    }

    @PostMapping("/products")
    public ResponseEntity<product> createProduct(@RequestBody product product) {
        return ResponseEntity.ok(productService.save(product));
    }

    @PutMapping("/products/{id}")
    public ResponseEntity<product> updateProduct(@PathVariable Long id, @RequestBody product productDetails) {
        product product = productService.findById(id);
        if (product == null) {
            return ResponseEntity.notFound().build();
        }
        product.setName(productDetails.getName());
        product.setPrice(productDetails.getPrice());
        // Update other fields as needed
        product updatedProduct = productService.save(product);
        return ResponseEntity.ok(updatedProduct);
    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // Order management endpoints

    @GetMapping("/orders")
    public ResponseEntity<List<order>> getAllOrders() {
        return ResponseEntity.ok(orderservice.findAll());
    }
}
