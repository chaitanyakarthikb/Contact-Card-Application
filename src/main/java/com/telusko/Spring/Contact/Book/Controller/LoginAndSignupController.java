package com.telusko.Spring.Contact.Book.Controller;

import com.telusko.Spring.Contact.Book.DTO.SignUpDTO;
import com.telusko.Spring.Contact.Book.Model.User;
import com.telusko.Spring.Contact.Book.Services.LoginAndSignupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/api/user")
@CrossOrigin()
public class LoginAndSignupController {
    @Autowired
    private LoginAndSignupService loginAndSignupService;
    @PostMapping("/signup")
    public ResponseEntity<User> createSignup(@RequestBody SignUpDTO signUpDTO){
        User user = new User();
        user.userName = signUpDTO.userName();
        user.password = signUpDTO.password();
        return ResponseEntity.ok(loginAndSignupService.createSignup(user));
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody SignUpDTO signUpDTO){
        return ResponseEntity.ok(loginAndSignupService.login(signUpDTO));
    }
}
