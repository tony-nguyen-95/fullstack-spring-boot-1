package com.asm.asm1.Repositories;

import com.asm.asm1.Models.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class PostRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private RowMapper<Post> postRowMapper = new RowMapper<Post>() {
        @Override
        public Post mapRow(ResultSet rs, int rowNum) throws SQLException {
            Post post = new Post();
            post.setId(rs.getInt("id"));
            post.setName(rs.getString("name"));
            post.setImage(rs.getString("image"));
            post.setDescription(rs.getString("description"));
            post.setCreatedDate(rs.getString("created_date"));
            return post;
        }
    };

    public List<Post> findAll() {
        String sql = "SELECT * FROM post";
        return jdbcTemplate.query(sql, postRowMapper);
    }

    public Post findById(int id) {
        String sql = "SELECT * FROM post WHERE id = ?";
        return jdbcTemplate.queryForObject(sql, postRowMapper, id);
    }

    public int save(Post post) {
        String sql = "INSERT INTO post (name, image, description) " +
                "VALUES (?, ?, ?)";
        return jdbcTemplate.update(sql,
                post.getName(),
                post.getImage(),
                post.getDescription());
    }

    public int updateById(int id, String name, String description, String image) {
        String sql = "UPDATE post SET name = ?, description = ?, image = ? WHERE id = ?";
        return jdbcTemplate.update(sql, name, description, image, id);
    }

    public int deleteById(int id) {
        String sql = "DELETE FROM post WHERE id = ?";
        return jdbcTemplate.update(sql, id);
    }
}
