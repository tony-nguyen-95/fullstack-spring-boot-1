package com.asm.asm1.Models;

import java.util.Date;

public class Tour {
    private int id;
    private String name;
    private String image;
    private String description;
    private Date startDate;
    private int durationDay;
    private double price;
    private String status;
    private String place;

    // Constructor with parameters
    public Tour(String name, String image, String description, Date startDate, int durationDay, double price,
            String status, String place) {
        this.name = name;
        this.image = image;
        this.description = description;
        this.startDate = startDate;
        this.durationDay = durationDay;
        this.price = price;
        this.status = status;
        this.place = place;
    }

    // Default constructor
    public Tour() {
    }

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public int getDurationDay() {
        return durationDay;
    }

    public void setDurationDay(int durationDay) {
        this.durationDay = durationDay;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getPlace() {
        return place;
    }

    public void setPlace(String place) {
        this.place = place;
    }
}
