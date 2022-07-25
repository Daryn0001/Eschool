package com.company.server.model;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;

@RequiredArgsConstructor
public enum ERole implements GrantedAuthority {
    USER("USER"),
    ADMIN("ADMIN");

    private final String vale;

    @Override
    public String getAuthority() {
        return vale;
    }
}
