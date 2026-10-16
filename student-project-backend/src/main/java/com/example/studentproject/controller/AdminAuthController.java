package com.example.studentproject.controller;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminAuthController {

    @Value("${ADMINGMAIL}")
    private String configuredEmail;

    @Value("${ADMINPASSWORD}")
    private String configuredPassword;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest){

        if(configuredEmail.equals(loginRequest.getEmail())&&configuredPassword.equals(loginRequest.getPassword())){
            return ResponseEntity.ok("Success");
        }
        else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
        }
    }
}

class LoginRequest{
    private String email;
    private String password;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}