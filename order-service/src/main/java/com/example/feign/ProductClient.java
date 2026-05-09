package com.example.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.example.model.ProductResponseDTO;


@FeignClient("PRODUCT-SERVICE")
public interface ProductClient {
	@GetMapping("/order/{id}")
	ProductResponseDTO  getProduct(@PathVariable int id);
}
