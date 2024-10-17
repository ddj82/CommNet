package com.ex.commnetbe.Controller;


import com.ex.commnetbe.Dto.LoginDto;
import com.ex.commnetbe.Dto.ResponseDto;
import com.ex.commnetbe.Dto.SignUpDto;
import com.ex.commnetbe.Service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthService authService;

    @PostMapping("/signUp")
    public ResponseDto<?> signUp(@RequestBody SignUpDto requestBody) {
        return authService.signUp(requestBody);
    }

    @PostMapping("/login")
    public ResponseDto<?> login(@RequestBody LoginDto requestBody) {
        return authService.login(requestBody);
    }

    @PostMapping("/extendSession")
    public ResponseDto<?> extendSession(@RequestBody Map<String, String> requestBody) {
        return authService.extendSession(requestBody);
    }

    @PostMapping("/check")
    public ResponseDto<?> loginAuth(@RequestBody Map<String, String> requestBody) {
        return authService.loginAuth(requestBody);
    }

}