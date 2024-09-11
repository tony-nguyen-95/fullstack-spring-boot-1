package com.asm.asm1.Models;

public class Booking {
    private int id;
    private int userId;
    private int tourId;
    private int adults;
    private int children;
    private String status; // e.g., "confirmed", "pending", etc.
    private String createdDate;
    private String username;
    private String image;
    private String nameTour;
    private int price;

    // Constructor
    public Booking(int userId, int tourId, int adults, int children) {
        this.userId = userId;
        this.tourId = tourId;
        this.adults = adults;
        this.children = children;
        this.status = "pending";
        this.createdDate = new java.util.Date().toString(); // Simple date format
    }

    public Booking() {
    }

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getTourId() {
        return tourId;
    }

    public void setTourId(int tourId) {
        this.tourId = tourId;
    }

    public int getAdults() {
        return adults;
    }

    public void setAdults(int adults) {
        this.adults = adults;
    }

    public int getChildren() {
        return children;
    }

    public void setChildren(int children) {
        this.children = children;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(String createdDate) {
        this.createdDate = createdDate;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getNameTour() {
        return nameTour;
    }

    public void setNameTour(String nameTour) {
        this.nameTour = nameTour;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }
}
