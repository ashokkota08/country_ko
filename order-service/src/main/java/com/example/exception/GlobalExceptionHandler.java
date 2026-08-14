package com.example.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import feign.FeignException;
import jakarta.servlet.http.HttpServletRequest;

/**
 * @RestControllerAdvice = @ControllerAdvice + @ResponseBody.
 * Spring scans the whole application, and ANY exception thrown
 * inside ANY @RestController in this service gets routed here
 * FIRST, before Spring's default generic 500 handler ever sees it.
 *
 * Order matters: Spring picks the MOST SPECIFIC @ExceptionHandler
 * that matches. So ProductNotFoundException goes to its own method
 * below, not the generic Exception.class one at the bottom.
 */

@RestControllerAdvice
public class GlobalExceptionHandler {
	
	@ExceptionHandler(ProductNotFoundException.class)
	public ResponseEntity<ErrorResponse> handleProductNotFound(ProductNotFoundException ex,HttpServletRequest request){
		
		ErrorResponse error = new ErrorResponse(HttpStatus.NOT_FOUND.value(),"Product Not Found",ex.getMessage(),request.getRequestURI());
		
		return new ResponseEntity<>(error,HttpStatus.NOT_FOUND);
	}
	
	@ExceptionHandler(PaymentException.class)
	public ResponseEntity<ErrorResponse> handlePaymentException(PaymentException ex,HttpServletRequest request){
		ErrorResponse error = new ErrorResponse(HttpStatus.BAD_GATEWAY.value(),"Payment Failed",ex.getMessage(),request.getRequestURI());
		
		return new ResponseEntity<>(error,HttpStatus.BAD_GATEWAY);
		
	}
    @ExceptionHandler(FeignException.class)
    public ResponseEntity<ErrorResponse> handleFeignException(
            FeignException ex, HttpServletRequest request) {
 
        ErrorResponse error = new ErrorResponse(
                HttpStatus.SERVICE_UNAVAILABLE.value(),
                "Downstream Service Unavailable",
                "Could not reach product-service. Please try again shortly.",
                request.getRequestURI()
        );
        return new ResponseEntity<>(error, HttpStatus.SERVICE_UNAVAILABLE); // 503
    }

	
    @ExceptionHandler(Exception.class)
	public ResponseEntity<ErrorResponse> handleGenericException(Exception e,HttpServletRequest request){
		ErrorResponse error = new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(),"Internal Server Error","Something went wrong. Please contact support.",request.getRequestURI());
		
		return new ResponseEntity<>(error,HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
}




