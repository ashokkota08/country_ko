package com.example.exception;

import java.time.LocalDateTime;

/**
 * Every error this service returns will have this exact shape:
 *
 * {
 *   "timestamp": "2026-08-07T10:15:30",
 *   "status": 404,
 *   "error": "Product Not Found",
 *   "message": "Product not found with id: 55",
 *   "path": "/order"
 * }
 *
 * Why does this matter in a real job? Because the frontend team
 * (or a mobile team, or another backend team calling your API)
 * writes code that expects a PREDICTABLE error shape. If every
 * endpoint fails differently, integrating with your API becomes
 * guesswork. This is literally what interviewers mean by
 * "API contract."
 */

public class ErrorResponse {
	private LocalDateTime timestamp;
    private int status;
    private String error;
    private String message;
    private String path;
    
    public ErrorResponse(int status,String error,String message,String path) {
    	this.timestamp = LocalDateTime.now();
    	this.status = status;
    	this.error = error;
    	this.message = message;
    	this.path = path;
    }

	public LocalDateTime getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(LocalDateTime timestamp) {
		this.timestamp = timestamp;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public String getError() {
		return error;
	}

	public void setError(String error) {
		this.error = error;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}
    
}
