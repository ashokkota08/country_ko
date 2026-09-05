package com.example.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import jakarta.servlet.http.HttpServletRequest;

@RestControllerAdvice
public class GlobalExceptionHandler {
	@ExceptionHandler(ProductNotFoundException.class)
	public ResponseEntity<ErrorResponse> handleProductNotFound(ProductNotFoundException ex,HttpServletRequest request){
		
		ErrorResponse error = new ErrorResponse(HttpStatus.NOT_FOUND.value(),"Product Not Found",ex.getMessage(),request.getRequestURI());
		
		return new ResponseEntity<>(error,HttpStatus.NOT_FOUND);
	}
	
	@ExceptionHandler(ImageUploadException.class)
	public ResponseEntity<ErrorResponse> handleIoException(ImageUploadException ex,HttpServletRequest request){
		ErrorResponse error = new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(),"IO Exception",ex.getMessage(),request.getRequestURI());
		return new ResponseEntity<>(error,HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@ExceptionHandler(Exception.class)
	public ResponseEntity<ErrorResponse> handleGenericException(Exception e,HttpServletRequest request){
		ErrorResponse error = new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(),"Internal Server Error","Something went wrong. Please contact support.",request.getRequestURI());
		
		return new ResponseEntity<>(error,HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<Map<String, Object>> handleValidationErrors(
	        MethodArgumentNotValidException ex, HttpServletRequest request) {

	    Map<String, String> fieldErrors = new HashMap<>();
	    for (FieldError error : ex.getBindingResult().getFieldErrors()) {
	        fieldErrors.put(error.getField(), error.getDefaultMessage());
	    }

	    Map<String, Object> body = new HashMap<>();
	    body.put("status", HttpStatus.BAD_REQUEST.value());
	    body.put("error", "Validation Failed");
	    body.put("errors", fieldErrors);
	    body.put("path", request.getRequestURI());

	    return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
	}

}
