package com.asm.asm1.Controllers;

import com.asm.asm1.Models.Post;
import com.asm.asm1.Services.PostService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@WebServlet("/api/post")
public class PostServlet extends HttpServlet {

    private PostService postService;

    public void setPostService(PostService postService) {
        this.postService = postService;
    }

    // Handle GET request to retrieve all posts
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        List<Post> posts = postService.getAllPosts();

        ObjectMapper objectMapper = new ObjectMapper();
        String jsonPosts = objectMapper.writeValueAsString(posts);

        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        out.print(jsonPosts);
        out.flush();
    }

    // Handle POST request to add a new post
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
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

        // Extract fields from the request body
        String name = jsonNode.get("name").asText();
        String image = jsonNode.get("image").asText();
        String description = jsonNode.get("description").asText();

        // Create a new post
        Post newPost = new Post(name, image, description);
        postService.addPost(newPost);

        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        out.print("{\"message\": \"Post added successfully\"}");
        out.flush();
    }

    // Handle PUT request to update an existing post
    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
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

        // Extract fields from the request body
        int id = jsonNode.get("id").asInt();
        String name = jsonNode.get("name").asText();
        String image = jsonNode.get("image").asText();
        String description = jsonNode.get("description").asText();

        // Update the post using the service
        boolean updated = postService.updatePost(id, new Post(name, image, description));

        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        if (updated) {
            response.setStatus(HttpServletResponse.SC_OK);
            out.print("{\"message\": \"Post updated successfully\"}");
        } else {
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            out.print("{\"message\": \"Post not found\"}");
        }
        out.flush();
    }

    // Handle DELETE request to delete an existing post
    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        int id = Integer.parseInt(request.getParameter("id"));

        boolean deleted = postService.deletePost(id);

        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        if (deleted) {
            response.setStatus(HttpServletResponse.SC_OK);
            out.print("{\"message\": \"Post deleted successfully\"}");
        } else {
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            out.print("{\"message\": \"Post not found\"}");
        }
        out.flush();
    }
}
