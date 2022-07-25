package com.company.server.controller;


import com.company.server.model.RefreshJwtRequest;
import com.company.server.model.User;
import org.slf4j.Logger;
import com.company.server.payload.request.JwtRequest;
import com.company.server.payload.response.JwtResponse;
import com.company.server.security.services.AuthService;
import lombok.RequiredArgsConstructor;

import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
    private static final Logger log = LoggerFactory.getLogger(AuthController.class);
    private final AuthService authService;

    @PostMapping(value="signup")
    public ResponseEntity<String> addUser(@RequestBody User user) {
        log.info("UserResourceImpl : register");
        authService.register(user);

        return ResponseEntity.ok("Successful registration");
    }

    @PostMapping("login")
    public ResponseEntity<JwtResponse> login(@RequestBody JwtRequest authRequest) {
        log.info("UserResourceImpl : Login");
        final JwtResponse token = authService.login(authRequest);
        return ResponseEntity.ok(token);
    }

    @PostMapping("token")
    public ResponseEntity<JwtResponse> getNewAccessToken(@RequestBody RefreshJwtRequest request) {
        final JwtResponse token = authService.getAccessToken(request.getRefreshToken());
        return ResponseEntity.ok(token);
    }

    @PostMapping("refresh")
    public ResponseEntity<JwtResponse> getNewRefreshToken(@RequestBody RefreshJwtRequest request) {
        final JwtResponse token = authService.refresh(request.getRefreshToken());
        return ResponseEntity.ok(token);
    }

}
