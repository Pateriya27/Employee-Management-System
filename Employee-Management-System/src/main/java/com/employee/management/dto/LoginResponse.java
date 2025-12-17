package com.employee.management.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {
    private String message;
    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private boolean success;
}

