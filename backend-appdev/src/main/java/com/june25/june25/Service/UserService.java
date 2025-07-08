package com.june25.june25.Service;

import com.june25.june25.Entity.UserEntity;
import com.june25.june25.Repository.UserRepository;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepo;

    public UserService(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    public UserEntity register(UserEntity user) {
        // Here you would typically hash the password before saving
        return userRepo.save(user);
    }

    public UserEntity findByEmail(String email) {
        return userRepo.findByEmail(email).orElse(null);
    }

    public List<UserEntity> getAllUsers() {
        return userRepo.findAll();
    }

}