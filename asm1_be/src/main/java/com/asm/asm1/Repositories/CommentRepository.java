package com.asm.asm1.Repositories;

import com.asm.asm1.Models.Comment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class CommentRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    // RowMapper to map comment rows from the database
    private RowMapper<Comment> commentRowMapper = new RowMapper<Comment>() {
        @Override
        public Comment mapRow(ResultSet rs, int rowNum) throws SQLException {
            Comment comment = new Comment();
            comment.setId(rs.getInt("id"));
            comment.setUserId(rs.getInt("user_id"));
            comment.setPostId(rs.getInt("post_id"));
            comment.setText(rs.getString("text"));
            comment.setRate(rs.getInt("rate"));
            comment.setUsername(rs.getString("username"));
            return comment;
        }
    };

    // Method to get comments by post ID
    public List<Comment> findCommentsByPostId(int postId) {
        System.out.println(postId);
        String sql = "SELECT comment.*, user.username FROM comment " +
                "LEFT JOIN user ON user.id = comment.user_id " +
                "WHERE post_id = ?";
        return jdbcTemplate.query(sql, commentRowMapper, postId);
    }

    // Method to add a new comment
    public int addComment(Comment comment) {
        String sql = "INSERT INTO comment (post_id, user_id, text, rate) " +
                "VALUES (?, ?, ?, ?)";

        return jdbcTemplate.update(sql,
                comment.getPostId(),
                comment.getUserId(),
                comment.getText(),
                comment.getRate());
    }
}
