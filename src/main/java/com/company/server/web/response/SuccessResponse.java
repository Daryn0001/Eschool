package com.company.server.web.response;

import lombok.*;


@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class SuccessResponse {
    private Object data;
    private String message;
}