package com.example.service;

import java.util.List;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.example.feign.ProductClient;
import com.example.model.OrderDTO;
import com.example.model.Orders;
import com.example.model.PaymentDTO;
import com.example.model.ProductResponseDTO;
import com.example.repository.OrderRepository;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.razorpay.Utils;
@Service
public class OrderService {
	@Autowired
	OrderRepository repo;
	@Autowired
	RestTemplate restTemplate;
	@Autowired
	ProductClient client;
	@Autowired
	RazorpayClient razorpayclient;

	public Orders getOrder(List<OrderDTO> orderitems) {
	
		Orders orders = new Orders();
		double total_amount=0;
		
		//String URL = "http://localhost:8080/order/"+order.getId();
		//ProductResponseDTO response =restTemplate.getForObject(URL, ProductResponseDTO.class);
		
		for(OrderDTO items:orderitems) {
			ProductResponseDTO response = client.getProduct(items.getId());
			 total_amount += response.getPrice()*items.getQuantity();
			
		}
		//ProductResponseDTO response = client.getProduct(order.getId());
		
		//double total_amount = response.getPrice() * order.getQuantity();
		//if(total_amount<=499) {
			//total_amount += 40;
		//}
		
		if(total_amount <= 499) {
			total_amount += 40;
		}
		
		//Create ONE Razorpay order for the full amount
		Order razorpayOrder = createRazorpayOrder(total_amount);

		orders.setAmount(total_amount);
		orders.setRazorpayOrderId(razorpayOrder.get("id"));
		
		return repo.save(orders);
	}
	
	private Order createRazorpayOrder(double total_amount) {
		try {
			JSONObject options = new JSONObject();
			options.put("amount",(int)(total_amount*100));
			options.put("currency", "INR");
			options.put("receipt", "order_rcpt_001"+System.currentTimeMillis());
			
			return razorpayclient.orders.create(options);
		}catch(Exception e) {
			throw new RuntimeException("Razorpay order creation failed");
		}
	}

	public String verfiyPayment(PaymentDTO payment) {
		
		JSONObject obj = new JSONObject();
		obj.put("razorpay_order_id", payment.getRazorpay_order_id());
		obj.put("razorpay_payment_id", payment.getRazorpay_payment_id());
		obj.put("razorpay_signature", payment.getRazorpay_signature());
		
		 try {
			boolean isValid= Utils.verifyPaymentSignature(obj,"0vKWMWxjPB52VfCF5fXQtNZn");
			if(isValid) {
				return "Payment Verified !";
			}
			else {
				return "Payment Verification Failed";
			}
		} catch (RazorpayException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	
}
