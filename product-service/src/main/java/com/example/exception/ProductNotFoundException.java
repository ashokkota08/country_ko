package com.example.exception;

public class ProductNotFoundException extends RuntimeException{ 

	public ProductNotFoundException(long productId) {
		super("Product not found with id:"+productId);
	}
	
	public ProductNotFoundException(String message) {
		super(message);
	}

}
