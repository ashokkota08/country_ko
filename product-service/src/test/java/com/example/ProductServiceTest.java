package com.example;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.example.exception.ProductNotFoundException;
import com.example.model.Products;
import com.example.repository.ProductRepository;
import com.example.service.ProductService;


@ExtendWith(MockitoExtension.class)
public class ProductServiceTest {
	@Mock
	private ProductRepository repo;
	
	@InjectMocks
	ProductService productservice;
	@Test
	void findproductwhenproductexistsreturnsproduct() {
		Products fakeproducts = new Products();
		fakeproducts.setP_id(1);
		fakeproducts.setName("chiken 1kg");
		fakeproducts.setPrice(200);
		
		when(repo.findById(1)).thenReturn(Optional.of(fakeproducts));
		
	Products result =	productservice.findProduct(1);
	
	assertEquals("chiken 1kg",result.getName());
	assertEquals(200,result.getPrice());
	
		
	}
	@Test
	void findproductwhenproductdoesnotexistsreturnsnull() {
		when(repo.findById(1)).thenReturn(Optional.empty());
		assertThrows(ProductNotFoundException.class, () -> {
			productservice.findProduct(1);
		});
}
	@Test
	void findallproducts() {
		Products p1 = new Products();
		p1.setP_id(1);
		p1.setName("chiken 1kg");
		p1.setPrice(200);
		
		Products p2 = new Products();
		p2.setP_id(2);
		p2.setName("chiken 2kg");
		p2.setPrice(400);
		
		when(repo.findAll()).thenReturn(java.util.Arrays.asList(p1,p2));
		
		List<Products> result =productservice.findAll();
		assertEquals("chiken 1kg",result.get(0).getName());
		assertEquals(200,result.get(0).getPrice());
		
		assertEquals("chiken 2kg",result.get(1).getName());
		assertEquals(400,result.get(1).getPrice());
		
	}
	
	
}
