package org.meghna.products.services;

import org.meghna.products.model.product;
import org.meghna.products.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class productservice {

        @Autowired
        private ProductRepository productRepository;

        public product save(product product) {
            return productRepository.save(product);
        }

        public void deleteById(Long id) {
            productRepository.deleteById(id);
        }

        public product findById(Long id) {
            return productRepository.findById(id).orElse(null);
        }

        public List<product> findAll() {
            return (List<product>) productRepository.findAll();
        }
    }
