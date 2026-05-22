package com.telusko.Spring.Contact.Book.Services;

import com.telusko.Spring.Contact.Book.DTO.SignUpDTO;
import com.telusko.Spring.Contact.Book.Model.User;
import com.telusko.Spring.Contact.Book.Repository.LoginAndSignupRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LoginAndSignupService {
    @Autowired
    private LoginAndSignupRepo loginAndSignupRepo;

    public User createSignup(User user){
        return loginAndSignupRepo.save(user);
    }

    public String login(SignUpDTO signUpDTO){
        Optional<User>user = loginAndSignupRepo.findByUserName(signUpDTO.userName());
        if(user.isPresent()){
            if(user.get().password.equals(signUpDTO.password()))
            {
                return "Login Successful";
            }else{
                return "Invalid Password";
            }
        }else{
            return "User Not Found";
        }
    }
}
