package com.example;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import com.example.controller.ProductController;
import com.example.exception.ProductNotFoundException;
import com.example.model.Products;
import com.example.repository.ProductRepository;
import com.example.service.ProductService;
import com.google.common.base.Optional;

@WebMvcTest(ProductController.class)
public class ProductControllerTest {
	@MockitoBean
	ProductService service;
	@Autowired
	private MockMvc mockmvc;
	    @Test
		void getproductwhenexists() throws Exception {
			
	    	Products fakeproducts = new Products();
	    	fakeproducts.setP_id(1);
	    	fakeproducts.setName("chicken 1kg");
	    	fakeproducts.setPrice(200);
	    	
	    	when(service.findProduct(1)).thenReturn(fakeproducts);
	    	
	    	mockmvc.perform(get("/order/1"))
	    	.andExpect(status().isOk())
	    	.andExpect(jsonPath("$.name").value("chicken 1kg"))
	    	.andExpect(jsonPath("$.price").value(200));
	    	
		}
	    @Test
	    void return404whennotexists() throws Exception {
	    	when(service.findProduct(111)).thenThrow(new ProductNotFoundException(111));
	    	mockmvc.perform(get("/order/111"))
	    	.andExpect(status().isNotFound())
	    	.andExpect(jsonPath("$.message").value("Product not found with id:111"));
	    }
	    
	    
}
