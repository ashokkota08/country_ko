package com.example.razerpay;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.razorpay.RazorpayClient;

@Configuration
public class RazerpayConfig {
	
	@Value("${razorpay.key.id}")
    private String keyId;

    @Value("${razorpay.key.secret}")
    private String keySecret;
    @Bean
    public RazorpayClient razorpayclient()throws Exception {
    	return new RazorpayClient(keyId,keySecret);
    }
}
