package com.example.exception;
/**
 * Thrown when anything goes wrong talking to Razorpay — creating an
 * order, or verifying a payment signature.
 *
 * Why a separate exception from ProductNotFoundException?
 * Because they mean different things and should map to different
 * HTTP status codes:
 *   - ProductNotFoundException -> 404 (client asked for something
 *     that doesn't exist — client's "fault")
 *   - PaymentException -> 502 Bad Gateway (WE failed to talk to an
 *     external service — our/Razorpay's "fault", not the client's)
 *
 * This is the core idea of custom exceptions: each one carries
 * meaning, so the handler can react correctly instead of guessing.
 */

public class PaymentException extends RuntimeException{
	public PaymentException(String message) {
		super(message);
}
 public PaymentException(String message,Throwable cause) {
	 super(message,cause);
 }
}
