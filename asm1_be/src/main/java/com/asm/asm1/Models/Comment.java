package com.asm.asm1.Models;

public class Comment {
    private int id;
    private int userId;
    private int postId;
    private String text;
    private int rate;
    private String username;

    // Constructor
    public Comment(int userId, int postId, String text, String status, int rate) {
        this.userId = userId;
        this.postId = postId;
        this.text = text;
        this.rate = rate;
    }

    public Comment() {
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

    public int getPostId() {
        return postId;
    }

    public void setPostId(int postId) {
        this.postId = postId;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public int getRate() {
        return rate;
    }

    public void setRate(int rate) {
        this.rate = rate;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

}
