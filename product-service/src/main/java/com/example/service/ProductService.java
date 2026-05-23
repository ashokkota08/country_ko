package com.example.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.model.Products;
import com.example.repository.ProductRepository;

import jakarta.transaction.Transactional;
@Service
public class ProductService {
	@Autowired
	ProductRepository repo;
	@Autowired
	Cloudinary cloudinary;
	
	
	public Products save(Products product,MultipartFile image) throws IOException {
	
	Map uploadresult =	cloudinary.uploader().upload(image.getBytes(), ObjectUtils.emptyMap());
		
	String imageUrl =	(String) uploadresult.get("secure_url");
		
	product.setImg_path(imageUrl);
		
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
