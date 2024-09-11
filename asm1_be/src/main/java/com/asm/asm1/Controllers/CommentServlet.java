package com.asm.asm1.Controllers;

import com.asm.asm1.Models.Comment;
import com.asm.asm1.Services.CommentService;
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

@WebServlet("/api/comments")
public class CommentServlet extends HttpServlet {

    private CommentService commentService;

    public void setCommentService(CommentService commentService) {
        this.commentService = commentService;
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Retrieve the post_id from the query parameter
        String postIdParam = request.getParameter("post_id");
        if (postIdParam == null) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }

        int postId = Integer.parseInt(postIdParam);
        List<Comment> comments = commentService.getCommentsByPostId(postId);

        // Convert the list of comments to JSON
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonComments = objectMapper.writeValueAsString(comments);

        // Set the content type to application/json
        response.setContentType("application/json");

        // Write the JSON to the response
        PrintWriter out = response.getWriter();
        out.print(jsonComments);
        out.flush();
    }

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
        int postId = jsonNode.get("postId").asInt();
        int userId = jsonNode.get("userId").asInt();
        String text = jsonNode.get("text").asText();
        int rate = jsonNode.get("rate").asInt();

        // Create the comment using the service
        int createdComment = commentService.createComment(postId, userId, text, rate);

        // Return the created comment as a JSON response
        String jsonCreatedComment = objectMapper.writeValueAsString(createdComment);
        response.setStatus(HttpServletResponse.SC_CREATED);
        PrintWriter out = response.getWriter();
        out.print(jsonCreatedComment);
        out.flush();
    }
}
