package com.company.server.payload.request;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class JwtRequest {
    private String email;
    private String password;
}
