package org.meghna.products.controller;

import org.meghna.products.model.product;
import org.meghna.products.services.productservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
public class productController {
    @Autowired
    private productservice productService;

    @PostMapping
    public ResponseEntity<product> createProduct(@RequestBody product product) {
        product savedProduct = productService.save(product);
        return ResponseEntity.ok(savedProduct);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<product> getProductById(@PathVariable Long id) {
        product product = productService.findById(id);
        if (product == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(product);
    }

    @GetMapping
    public ResponseEntity<List<product>> getAllProducts() {
        List<product> products = productService.findAll();
        return ResponseEntity.ok(products);
    }
}