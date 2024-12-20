package com.shop.api.products.controllers;

import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.shop.api.products.records.AllProdcutsDto;
import com.shop.api.products.records.SingleProductDto;
import com.shop.api.products.records.cart.ProductCart;
import com.shop.api.products.servers.ProductService;



@RequestMapping("/api")
@RestController
public class ProductContoller {

    private final ProductService productService;

    public ProductContoller(ProductService productService) {
        this.productService = productService;
    }

    

    @GetMapping("/products")
    public AllProdcutsDto getAllProducts(
        @RequestParam(required = false) String gender,
        @RequestParam(required = false) String category,
        @RequestParam(required = false) Double minPrice,
        @RequestParam(required = false) Double maxPrice,
        @RequestParam(required = false,defaultValue="0") int page
        ) {
        Pageable pageable = PageRequest.of(page, 9); 
        return productService.getAllProducts(gender, category, minPrice, maxPrice, pageable);
    }
    
    @GetMapping("/products/{id}")
    public ResponseEntity<SingleProductDto> getMethodName(
        @PathVariable(name = "id") String uid,
        @RequestHeader(required=false,name = "Authorization") String authHeader
        ) {
        try {
            return ResponseEntity.ok(productService.getSingleProduct(uid,authHeader));
        }
        catch (NullPointerException e) {
            return ResponseEntity.status(404).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }
        
    
    @PostMapping("/products/cart")
    public List<ProductCart> getCartProducts(
        @RequestBody List<String> Ids
    ) {

        return productService.getProductCarts(Ids);
    }

    @GetMapping("/products/search")
    public ResponseEntity<?> getProductsByQuery(
        @RequestParam(required=false,name="v",defaultValue="") String param
        ) {
            try {
                return ResponseEntity.ok(productService.getProductsByQuery(param));
            } catch (Exception e) {
                return ResponseEntity.status(500).body(e.getMessage());
            }
            
      
    }
    
}
