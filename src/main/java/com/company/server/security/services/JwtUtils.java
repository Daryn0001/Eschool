package com.company.server.security.services;

import com.company.server.model.JwtAuthentication;
import com.company.server.model.ERole;
import io.jsonwebtoken.Claims;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;


@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class JwtUtils {

    public static JwtAuthentication generate(Claims claims) {
        final JwtAuthentication jwtInfoToken = new JwtAuthentication();
        jwtInfoToken.setRoles(getRoles(claims));
        jwtInfoToken.setName(claims.get("name", String.class));
        jwtInfoToken.setEmail(claims.getSubject());
        return jwtInfoToken;
    }

    private static Set<ERole> getRoles(Claims claims) {
        final String roles = claims.get("roles", String.class);
        Set<ERole> role = new HashSet<>();
        role.add(ERole.valueOf(roles));
        return role;
    }
}
