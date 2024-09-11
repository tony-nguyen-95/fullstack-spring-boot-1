package com.asm.asm1.Models;

public class Post {
    private int id;
    private String name;
    private String image;
    private String description;
    private String createdDate;

    // Constructor
    public Post(String name, String image, String description) {
        this.name = name;
        this.image = image;
        this.description = description;
    }

    public Post() {
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

    public String getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(String createdDate) {
        this.createdDate = createdDate;
    }

}
