package com.asm.asm1.Services;

import com.asm.asm1.Models.Comment;
import com.asm.asm1.Repositories.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    // Method to get comments by postId
    public List<Comment> getCommentsByPostId(int postId) {
        return commentRepository.findCommentsByPostId(postId);
    }

    // Method to create a new comment
    public int createComment(int postId, int userId, String text, int rate) {
        Comment comment = new Comment();
        comment.setPostId(postId);
        comment.setUserId(userId);
        comment.setText(text);
        comment.setRate(rate);

        return commentRepository.addComment(comment);
    }
}
