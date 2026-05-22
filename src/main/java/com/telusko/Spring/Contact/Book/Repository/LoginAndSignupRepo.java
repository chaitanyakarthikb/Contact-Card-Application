package com.telusko.Spring.Contact.Book.Repository;

import com.telusko.Spring.Contact.Book.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LoginAndSignupRepo extends JpaRepository<User,Integer> {
    Optional<User> findByUserName(String userName);

}
