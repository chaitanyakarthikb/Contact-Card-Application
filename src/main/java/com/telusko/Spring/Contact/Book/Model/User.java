package com.telusko.Spring.Contact.Book.Model;

import jakarta.persistence.*;

@Entity(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public int id;
    @Column(unique = true)
    public String userName;
    public String password;
}
