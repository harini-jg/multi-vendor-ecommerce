
package com.multivendor.backend.controller;

import com.multivendor.backend.entity.User;
import com.multivendor.backend.repository.UserRepository;
import com.multivendor.backend.service.JwtService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthController(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User user) {

        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Email already exists"));
        }

        user.setRole("CUSTOMER");

        user.setPassword(
                passwordEncoder.encode(user.getPassword())
        );

        User savedUser = userRepository.save(user);

        return ResponseEntity.ok(savedUser);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {

        User existingUser = userRepository
                .findByEmail(user.getEmail())
                .orElse(null);

        if (existingUser == null) {
            return ResponseEntity.status(404)
                    .body(Map.of("message", "User not found"));
        }

        if (!passwordEncoder.matches(
                user.getPassword(),
                existingUser.getPassword()
        )) {
            return ResponseEntity.status(401)
                    .body(Map.of("message", "Invalid password"));
        }

        String token = jwtService.generateToken(
            existingUser.getEmail(),
            existingUser.getRole()
        );

        Map<String, Object> response = new HashMap<>();

        response.put("id", existingUser.getId());
        response.put("name", existingUser.getName());
        response.put("email", existingUser.getEmail());
        response.put("role", existingUser.getRole());
        response.put("token", token);

        return ResponseEntity.ok(response);
    }
}