package com.example.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.model.Products;
import com.example.service.ProductService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;


//@CrossOrigin(origins = "${app.cors.allowed-origins}")
@RestController
public class ProductController {
	@Autowired
	ProductService service;
	@PostMapping("/save")
	public String saveProduct(@RequestParam String name,@RequestParam double price,@RequestParam MultipartFile img_path) throws IOException {
		Products product = new Products();
		product.setName(name);
		product.setPrice(price);
		//p.setImg_path(img_path);
		Products response = service.save(product,img_path);
		if(response != null) {
			return "Product saved!";
		}
		return "Error in saving product";
	}
	
	@GetMapping("/order/{id}")
	public Products getProduct(@PathVariable int id) {
		Products result = service.findProduct(id);
		if(result != null) {
		return result;
		}
		return null;
	}
	
	@GetMapping("/All")
	public List<Products> getAllProducts() {
		
		return service.findAll();
	}
	@DeleteMapping("/delete")
	public String delete(@RequestParam("pname") String pname) {
	int  rowsdeleted = service.deleteByname(pname);
	if(rowsdeleted >0) {
		return "Product deleted !";
	}
	return "Error in deletion";
	}
}
