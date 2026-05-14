package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.model.OrderDTO;
import com.example.model.Orders;
import com.example.model.PaymentDTO;
import com.example.service.OrderService;

@CrossOrigin(origins="${app.cors.allowed-origins}")
@RestController
public class OrderController {
	@Autowired
	OrderService service;
	@PostMapping("/order")
	public Orders placeOrder(@RequestBody List<OrderDTO> order) {
		Orders response = service.getOrder(order);
		if(response !=null) {
			return response;
		}
		return null;
	}
	
	@PostMapping("/verfiyPayment")
	public String verifyPayment(@RequestBody PaymentDTO payment) {
		String resulst = service.verfiyPayment(payment);
		return resulst;
	}
}


