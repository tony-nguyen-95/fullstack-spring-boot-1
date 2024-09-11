package com.asm.asm1.Services;

import com.asm.asm1.Models.Post;
import com.asm.asm1.Repositories.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    // Get all posts
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    // Get post by id
    public Optional<Post> getPostById(int id) {
        try {
            return Optional.of(postRepository.findById(id));
        } catch (Exception e) {
            return Optional.empty(); // Handle case when post is not found
        }
    }

    // Add a new post
    public Post addPost(Post post) {
        postRepository.save(post);
        return post;
    }

    // Update an existing post by id
    public boolean updatePost(int id, Post post) {
        Optional<Post> existingPost = getPostById(id);
        if (existingPost.isPresent()) {
            postRepository.updateById(id, post.getName(), post.getDescription(), post.getImage());
            return true;
        }
        return false; // Return false if post doesn't exist
    }

    // Delete post by id
    public boolean deletePost(int id) {
        Optional<Post> existingPost = getPostById(id);
        if (existingPost.isPresent()) {
            postRepository.deleteById(id);
            return true;
        }
        return false; // Return false if post doesn't exist
    }
}
