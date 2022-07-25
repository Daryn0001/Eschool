package com.company.server.security.services;

import com.company.server.exceptions.AuthException;
import com.company.server.exceptions.BadRequestException;
import com.company.server.model.ERole;
import com.company.server.model.JwtAuthentication;
import com.company.server.model.User;
import com.company.server.payload.request.JwtRequest;

import com.company.server.payload.response.JwtResponse;
import com.company.server.service.UserServiceImpl;
import com.company.server.web.response.SuccessResponse;
import io.jsonwebtoken.Claims;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthService {
    private static final String USER_IS_NOT_FOUND_MESSAGE = "Пользователь не найден";
    private final UserServiceImpl userService;
    private final Map<String, String> refreshStorage = new HashMap<>();
    private final JwtProvider jwtProvider;

    public ResponseEntity<SuccessResponse> register(@NonNull User user){
        if(!ObjectUtils.isEmpty(userService.getByEmail(user.getEmail()))) {
            throw  new BadRequestException("A user already exist");
        }
        user.setRole(ERole.ADMIN);
        return new ResponseEntity<> (
                new SuccessResponse(userService.create(user), ""),
                HttpStatus.OK
        );
    }
    public JwtResponse login(@NonNull JwtRequest authRequest) {
        final User user = userService.getByEmail(authRequest.getEmail());
        if (ObjectUtils.isEmpty(user)){
            throw new AuthException(USER_IS_NOT_FOUND_MESSAGE);
        }
        if (user.getPassword().equals(authRequest.getPassword())) {
            final String accessToken = jwtProvider.generateAccessToken(user);
            final String refreshToken = jwtProvider.generateRefreshToken(user);
            refreshStorage.put(user.getEmail(), refreshToken);
            return new JwtResponse(accessToken, refreshToken);
        } else {
            throw new AuthException(USER_IS_NOT_FOUND_MESSAGE);
        }
    }

    public JwtResponse getAccessToken(@NonNull String refreshToken) {
        if (jwtProvider.validateRefreshToken(refreshToken)) {
            final Claims claims = jwtProvider.getRefreshClaims(refreshToken);
            final String email = claims.getSubject();
            final String saveRefreshToken = refreshStorage.get(email);
            if (saveRefreshToken != null && saveRefreshToken.equals(refreshToken)) {
                final User user = userService.getByEmail(email);
                if (ObjectUtils.isEmpty(user)){
                    throw new AuthException(USER_IS_NOT_FOUND_MESSAGE);
                }
                final String accessToken = jwtProvider.generateAccessToken(user);
                return new JwtResponse(accessToken, null);
            }
        }
        return new JwtResponse(null, null);
    }

    public JwtResponse refresh(@NonNull String refreshToken) {
        if (jwtProvider.validateRefreshToken(refreshToken)) {
            final Claims claims = jwtProvider.getRefreshClaims(refreshToken);
            final String email = claims.getSubject();
            final String saveRefreshToken = refreshStorage.get(email);
            if (saveRefreshToken != null && saveRefreshToken.equals(refreshToken)) {
                final User user = userService.getByEmail(email);
                if (ObjectUtils.isEmpty(user)){
                    throw new AuthException(USER_IS_NOT_FOUND_MESSAGE);
                }
                final String accessToken = jwtProvider.generateAccessToken(user);
                final String newRefreshToken = jwtProvider.generateRefreshToken(user);
                refreshStorage.put(user.getEmail(), newRefreshToken);
                return new JwtResponse(accessToken, newRefreshToken);
            }
        }
        throw new AuthException("Невалидный JWT токен");
    }

    public JwtAuthentication getAuthInfo() {
        return (JwtAuthentication) SecurityContextHolder.getContext().getAuthentication();
    }

}
