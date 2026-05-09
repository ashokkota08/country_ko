package com.example.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.model.Products;
import com.example.repository.ProductRepository;

import jakarta.transaction.Transactional;
@Service
public class ProductService {
	@Autowired
	ProductRepository repo;
	
	private final String UPLOAD_DIR = "uploads/";
	public Products save(Products product,MultipartFile image) throws IOException {
		
		File dir = new File(UPLOAD_DIR);
		if(!dir.exists()) {
			dir.mkdirs();
		}
		
		String filename = System.currentTimeMillis()+""+image.getOriginalFilename();
		Path filepath = Paths.get(UPLOAD_DIR+filename);
		
		Files.write(filepath,image.getBytes());
		
		product.setImg_path(filename);
		
		return repo.save(product);
	}
	public Products findProduct(int id) {
	
		return repo.findById(id).orElse(null);
	}
	public List<Products> findAll() {
	
		return repo.findAll();
	}
	
	@Transactional
	public int deleteByname(String name) {
		return repo.deleteByname(name);
		
		
	}

}
