package com.asm.asm1.Controllers;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.*;

import com.asm.asm1.Models.Tour;
import com.asm.asm1.Services.TourService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebServlet("/api/tours")
public class TourServlet extends HttpServlet {

    private TourService tourService;

    public void setTourService(TourService tourService) {
        this.tourService = tourService;
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Retrieve the list of tours from the service
        List<Tour> tours = tourService.getAllTours();

        // Convert the list of tours to JSON
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonTours = objectMapper.writeValueAsString(tours);

        // Set the content type to application/json
        response.setContentType("application/json");

        // Write the JSON to the response
        PrintWriter out = response.getWriter();
        out.print(jsonTours);
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

        // System.out.println(jsonNode);

        // Extract fields
        String name = jsonNode.get("name").asText();
        String image = jsonNode.get("image").asText();
        String description = jsonNode.get("description").asText();
        Date startDate = objectMapper.convertValue(jsonNode.get("startDate"),
                Date.class);
        int durationDay = jsonNode.get("durationDay").asInt();
        double price = jsonNode.get("price").asDouble();
        String status = jsonNode.get("status").asText();
        String place = jsonNode.get("place").asText();

        // System.out.println(durationDay);

        // // Create a new Tour object
        Tour newTour = new Tour(name, image, description, startDate, durationDay,
                price, status, place);

        // // Add the new tour using the service
        tourService.addTour(newTour);

        // Send a response back with a success message
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        out.print("{\"message\": \"Tour added successfully\"}");
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
        String name = jsonNode.get("name").asText();
        String image = jsonNode.get("image").asText();
        String description = jsonNode.get("description").asText();
        Date startDate = objectMapper.convertValue(jsonNode.get("startDate"), Date.class);
        int durationDay = jsonNode.get("durationDay").asInt();
        double price = jsonNode.get("price").asDouble();
        String status = jsonNode.get("status").asText();
        String place = jsonNode.get("place").asText();

        // Update the tour using the service
        int rowsAffected = tourService.updateTour(id, name, image, description, startDate, durationDay, price, status,
                place);

        // Send a response back indicating success or failure
        PrintWriter out = resp.getWriter();
        if (rowsAffected > 0) {
            resp.setStatus(HttpServletResponse.SC_OK);
            out.print("{\"message\": \"Tour updated successfully\"}");
        } else {
            resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
            out.print("{\"message\": \"Tour not found\"}");
        }
        out.flush();
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        int id = Integer.parseInt(req.getParameter("id"));

        // Delete the tour using the service
        int rowsAffected = tourService.deleteTour(id);

        // Send a response back indicating success or failure
        PrintWriter out = resp.getWriter();
        if (rowsAffected > 0) {
            resp.setStatus(HttpServletResponse.SC_OK);
            out.print("{\"message\": \"Tour deleted successfully\"}");
        } else {
            resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
            out.print("{\"message\": \"Tour not found\"}");
        }
        out.flush();
    }
}
