package com.asm.asm1.Controllers;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.*;

import com.asm.asm1.Models.User;
import com.asm.asm1.Services.UserService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebServlet("/api/users")
public class UserServlet extends HttpServlet {

    private UserService userService;

    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Retrieve the list of users from the service
        List<User> users = userService.getAllUsers();

        // Convert the list of users to JSON
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonUsers = objectMapper.writeValueAsString(users);

        // Set the content type to application/json
        response.setContentType("application/json");

        // Write the JSON to the response
        PrintWriter out = response.getWriter();
        out.print(jsonUsers);
        out.flush();
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Read the request body
        StringBuilder stringBuilder = new StringBuilder();
        try (BufferedReader reader = request.getReader()) {
            String line;
            while ((line = reader.readLine()) != null) {
                stringBuilder.append(line);
            }
        }
        String requestBody = stringBuilder.toString();

        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(requestBody);

        // Extract fields
        String fullname = jsonNode.get("fullname").asText();
        String email = jsonNode.get("email").asText();
        String phoneNumber = jsonNode.get("phoneNumber").asText();
        String username = jsonNode.get("username").asText();
        String password = jsonNode.get("password").asText();
        int roleId = jsonNode.get("roleId").asInt();
        String address = jsonNode.get("address").asText();

        User newUser = new User(fullname, email, phoneNumber, address, username, password, roleId, "active");

        userService.addUser(newUser);

        // Send a response back with a success message
        PrintWriter out = response.getWriter();
        out.print("{\"message\": \"User added successfully\"}");
        out.flush();
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // Read the request body
        StringBuilder stringBuilder = new StringBuilder();
        try (BufferedReader reader = req.getReader()) {
            String line;
            while ((line = reader.readLine()) != null) {
                stringBuilder.append(line);
            }
        }
        String requestBody = stringBuilder.toString();

        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(requestBody);

        // Extract fields
        int id = jsonNode.get("id").asInt();
        String fullname = jsonNode.get("fullname").asText();
        String phoneNumber = jsonNode.get("phoneNumber").asText();
        String address = jsonNode.get("address").asText();
        String status = jsonNode.get("status").asText();
        int roleId = jsonNode.get("roleId").asInt();

        // Update the user using the service
        int rowsAffected = userService.updateUser(id, fullname, phoneNumber, address, status, roleId);

        // Send a response back indicating success or failure
        PrintWriter out = resp.getWriter();
        if (rowsAffected > 0) {
            resp.setStatus(HttpServletResponse.SC_OK);
            out.print("{\"message\": \"User updated successfully\"}");
        } else {
            resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
            out.print("{\"message\": \"User not found\"}");
        }
        out.flush();
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        int id = Integer.parseInt(req.getParameter("id"));

        // Delete the user using the service
        int rowsAffected = userService.deleteUser(id);

        // Send a response back indicating success or failure
        PrintWriter out = resp.getWriter();
        if (rowsAffected > 0) {
            resp.setStatus(HttpServletResponse.SC_OK);
            out.print("{\"message\": \"User deleted successfully\"}");
        } else {
            resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
            out.print("{\"message\": \"User not found\"}");
        }
        out.flush();
    }

}
