package com.asm.asm1.Repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.asm.asm1.Models.User;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class UserRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private RowMapper<User> UserRowMapper = new RowMapper<User>() {
        @Override
        public User mapRow(ResultSet rs, int rowNum) throws SQLException {
            User user = new User();
            user.setId(rs.getInt("id"));
            user.setUsername(rs.getString("username"));
            user.setPassword(rs.getString("password"));
            user.setFullname(rs.getString("fullname"));
            user.setEmail(rs.getString("email"));
            user.setPhoneNumber(rs.getString("phoneNumber"));
            user.setAddress(rs.getString("address"));
            user.setStatus(rs.getString("status"));
            user.setRoleId(rs.getInt("role_id"));
            return user;
        }
    };

    public List<User> findAll() {
        return jdbcTemplate.query("SELECT * FROM User", UserRowMapper);
    }

    public User findById(int id) {
        String sql = "SELECT * FROM User WHERE id = ?";
        return jdbcTemplate.queryForObject(sql, UserRowMapper, id);
    }

    public int save(User user) {
        String sql = "INSERT INTO User (username, password, fullname, email, phoneNumber, address, status, role_id) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        return jdbcTemplate.update(sql,
                user.getUsername(),
                user.getPassword(),
                user.getFullname(),
                user.getEmail(),
                user.getPhoneNumber(),
                user.getAddress(),
                user.getStatus(),
                user.getRoleId());
    }

    public int updateById(int id, User user) {
        String sql = "UPDATE User SET fullname = ?, phoneNumber = ?, address = ?, status = ?, role_id = ? " +
                "WHERE id = ?";
        return jdbcTemplate.update(sql,
                user.getFullname(),
                user.getPhoneNumber(),
                user.getAddress(),
                user.getStatus(),
                user.getRoleId(),
                id);
    }

    public int deleteById(int id) {
        String sql = "DELETE FROM User WHERE id = ?";
        return jdbcTemplate.update(sql, id);
    }

    public User login(String email, String password) {
        String sql = "SELECT * FROM User WHERE email = ? AND password = ?";
        try {
            return jdbcTemplate.queryForObject(sql, UserRowMapper, email, password);
        } catch (EmptyResultDataAccessException e) {
            // Handle no user found (e.g., return null or throw a custom exception)
            return null; // or throw new CustomAuthenticationException("Invalid credentials");
        }
    }
}
