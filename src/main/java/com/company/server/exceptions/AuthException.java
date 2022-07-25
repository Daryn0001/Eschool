package com.company.server.exceptions;

public class AuthException extends RuntimeException{
    public AuthException(String message) {
        super(message);
    }
}
