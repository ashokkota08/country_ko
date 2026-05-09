package com.example.model;

import jakarta.persistence.Entity;
import lombok.Data;

@Data
public class PaymentDTO {
	String razorpay_payment_id;
	String razorpay_order_id;
	String razorpay_signature;
	 
}
