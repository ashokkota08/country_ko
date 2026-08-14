package com.example.exception;

/**
 * Thrown when order-service asks product-service for a product
 * (via Feign) and that product either doesn't exist, or
 * product-service could not be reached at all.
 *
 * We extend RuntimeException (an "unchecked" exception) so we don't
 * have to add "throws ProductNotFoundException" to every method
 * signature up the call chain — Spring will let it bubble up to our
 * GlobalExceptionHandler automatically.
 */

public class ProductNotFoundException extends RuntimeException{ 

	public ProductNotFoundException(long productId) {
		super("Product not found with id:"+productId);
	}
	
	public ProductNotFoundException(String message) {
		super(message);
	}
	
	
}
