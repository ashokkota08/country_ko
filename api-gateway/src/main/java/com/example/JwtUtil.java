package com.example;

import java.security.Key;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {
	@Value("${jwt.secret}")
	private String secret;
	
	private Key getSigninKey() {
		return Keys.hmacShaKeyFor(secret.getBytes());
	}
	
	//Generate Token for a user
	public String generateToken(String username,String role) {
		return Jwts.builder()
                .setSubject(username)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // 10 hours
                .signWith(getSigninKey(), SignatureAlgorithm.HS256)
                .compact();
	}
	
	public String extractUsername(String token) {
	    return getClaims(token).getSubject();  // ← was returning role, now returns subject
	}
	
	public String extractRole(String token) {
	    return getClaims(token).get("role", String.class);
	}
	 public boolean isTokenValid(String token) {
	        try {
	            return !getClaims(token).getExpiration().before(new Date());
	        } catch (Exception e) {
	            return false;
	        }
	    }
	 
	 private Claims getClaims(String token) {
	        return Jwts.parserBuilder()
	                .setSigningKey(getSigninKey())
	                .build()
	                .parseClaimsJws(token)
	                .getBody();
	    }

}

