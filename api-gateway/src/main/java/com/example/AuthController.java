package com.example;

import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequestMapping("/auth")
public class AuthController {
	@Autowired
	UserRepository repository;
	@Autowired
	private JwtUtil jwtUtil;
	@PostMapping("/register")
	public ResponseEntity<?> register(@RequestBody Map<String,String > request){
		String username = request.get("username");
		String password = request.get("password");
		
		 if (repository.findByUsername(username) != null) {
	            return new ResponseEntity<>("user already exists",HttpStatus.BAD_REQUEST);
	        }
		 Users user = new Users();
		 user.setUsername(username);
		 user.setPassword(password);
		 user.setRole("CUSTOMER");
		 repository.save(user);
		
		return new ResponseEntity<>("User registered succefully!",HttpStatus.OK);
	}
	@PostMapping("/login")					
	public ResponseEntity<?> login(@RequestBody Map<String,String> request){
		String username = request.get("username");
		String password = request.get("password");
		
		Users user = repository.findByUsername(username);
		if(user == null || !user.getPassword().equals(password)) {
			return new ResponseEntity<>("Invalid Username or Password",HttpStatus.UNAUTHORIZED);
		}
		
		String token = jwtUtil.generateToken(user.getUsername(),user.getRole());
		
		return ResponseEntity.ok(
				Map.of(
						"token",token,
						"username",user.getUsername(),
						"role",user.getRole()
						));
	}
}
