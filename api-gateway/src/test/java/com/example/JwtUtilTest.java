package com.example;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

public class JwtUtilTest {

	private JwtUtil jwtUtil;
	
	@BeforeEach
	void setUp() {
		jwtUtil = new JwtUtil();
		ReflectionTestUtils.setField(jwtUtil, "secret", "mySecretKey12345678901234567890123");
	}
	@Test
	void shouldGenerateToken() {
		//Arrange
		String username = "Ashok";
		String password = "Ashok@08";
		
		//Act
		String token = jwtUtil.generateToken(username, password);
		
		//Assert
		assertNotNull(token);
		assertTrue(token.length()>0);
	}
	
	@Test
	void shouldExtractUsernameFromToken() {
		String token = jwtUtil.generateToken("Ashok","CUSTOMER");
		
		String username = jwtUtil.extractUsername(token);
		
		assertEquals("Ashok",username);
	}
	
	void shouldExtractRoleFromToken() {
		String token = jwtUtil.generateToken("Ashok","ADMIN");
		
		String role = jwtUtil.extractRole(token);
		
		assertEquals("ASMIN",role);
	}
	
	@Test
	void shouldValidateCorrectToken() {
		String token = jwtUtil.generateToken("Ashok","CUSTOMER");
		
		boolean isvalid = jwtUtil.isTokenValid(token);
		
		assertTrue(isvalid);
		
		
	}
	@Test
	void shouldRejectInvalidToken() {
		String faketoken = "this is not valid token";
		boolean isvalid = jwtUtil.isTokenValid(faketoken);
		assertFalse(isvalid);
	}
}
