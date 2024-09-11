package com.asm.asm1.Controllers;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.*;

import com.asm.asm1.Models.Booking;
import com.asm.asm1.Services.BookingService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebServlet("/api/booking")
public class BookingServlet extends HttpServlet {

    private BookingService bookingService;

    public void setBookingService(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Retrieve the list of tours from the service
        List<Booking> bookings = bookingService.getAllBookings();

        // Convert the list of tours to JSON
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonTours = objectMapper.writeValueAsString(bookings);

        // Set the content type to application/json
        response.setContentType("application/json");

        // Write the JSON to the response
        PrintWriter out = response.getWriter();
        out.print(jsonTours);
        out.flush();
    }

    // For user
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
        int userId = jsonNode.get("userId").asInt();
        int tourId = jsonNode.get("tourId").asInt();
        int adults = jsonNode.get("adults").asInt();
        int children = jsonNode.get("children").asInt();

        // Create a new Tour object
        Booking newBooking = new Booking(userId, tourId, adults, children);

        // Add the new tour using the service
        bookingService.addBooking(newBooking);

        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        out.print("{\"message\": \"Booking added successfully\"}");
        out.flush();
    }

    // Update just status
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
        String status = jsonNode.get("status").asText();

        // Update the status of booking using the service
        int rowsAffected = bookingService.updateBookingStatus(id, status);

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

}
