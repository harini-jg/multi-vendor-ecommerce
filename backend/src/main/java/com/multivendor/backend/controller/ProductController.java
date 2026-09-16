package com.multivendor.backend.controller;

import com.multivendor.backend.entity.Product;
import com.multivendor.backend.repository.ProductRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {

    private final ProductRepository productRepository;

    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    // Get all products
    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // Add new product
    @PostMapping
    public ResponseEntity<Product> addProduct(
            @RequestBody Product product
    ) {
        Product savedProduct = productRepository.save(product);

        return ResponseEntity.ok(savedProduct);
    }

    // Update product
    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduct(
            @PathVariable Long id,
            @RequestBody Product product
    ) {

        return productRepository.findById(id)
                .map(existingProduct -> {

                    existingProduct.setName(product.getName());
                    existingProduct.setPrice(product.getPrice());
                    existingProduct.setCategory(product.getCategory());
                    existingProduct.setVendor(product.getVendor());
                    existingProduct.setDescription(product.getDescription());
                    existingProduct.setStock(product.getStock());

                    Product updatedProduct =
                            productRepository.save(existingProduct);

                    return ResponseEntity.ok(updatedProduct);
                })
                .orElseGet(() ->
                        ResponseEntity.notFound().build()
                );
    }

    // Delete product
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(
            @PathVariable Long id
    ) {

        if (!productRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        productRepository.deleteById(id);

        return ResponseEntity.ok(
                "Product deleted successfully"
        );
    }
}