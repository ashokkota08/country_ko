package com.example.exception;

public class ProductSavingException extends RuntimeException{
	public ProductSavingException(String message) {
		super(message);
}
	public ProductSavingException(String message,Throwable cause) {
		super(message,cause);
	}

}
