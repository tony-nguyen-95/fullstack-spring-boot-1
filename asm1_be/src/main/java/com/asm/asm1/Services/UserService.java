package com.asm.asm1.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.asm.asm1.Models.User;
import com.asm.asm1.Repositories.UserRepository;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public void addUser(User user) {
        userRepository.save(user);
    }

    public User getUserById(int id) {
        return userRepository.findById(id);
    }

    public User login(String email, String password) {
        return userRepository.login(email, password);
    }

    public int updateUser(int id, String fullname, String phoneNumber, String address, String status, int roleId) {
        User existingUser = userRepository.findById(id);

        if (existingUser != null) {
            existingUser.setFullname(fullname);
            existingUser.setPhoneNumber(phoneNumber);
            existingUser.setAddress(address);
            existingUser.setStatus(status);
            existingUser.setRoleId(roleId);

            // Save the updated user back to the database
            return userRepository.updateById(id, existingUser);

        } else {
            throw new RuntimeException("User not found with id: " + id);
        }
    }

    public int deleteUser(int id) {
        return userRepository.deleteById(id);
    }

}
