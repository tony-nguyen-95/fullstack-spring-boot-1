package com.asm.asm1.Repositories;

import com.asm.asm1.Models.Booking;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class BookingRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private RowMapper<Booking> bookingRowMapper = new RowMapper<Booking>() {
        @Override
        public Booking mapRow(ResultSet rs, int rowNum) throws SQLException {
            Booking booking = new Booking();
            booking.setId(rs.getInt("id"));
            booking.setUserId(rs.getInt("user_id"));
            booking.setTourId(rs.getInt("tour_id"));
            booking.setAdults(rs.getInt("adults"));
            booking.setChildren(rs.getInt("children"));
            booking.setStatus(rs.getString("status"));
            booking.setCreatedDate(rs.getString("created_date"));

            // Map fields from users and tours tables
            booking.setUsername(rs.getString("username"));
            booking.setNameTour(rs.getString("name"));
            booking.setImage(rs.getString("image"));
            booking.setPrice(rs.getInt("price"));

            return booking;
        }
    };

    public List<Booking> findAllWithUserAndTourDetails() {
        String sql = "SELECT b.*, u.username, t.name, t.image, t.price " +
                "FROM booking b " +
                "INNER JOIN user u ON b.user_id = u.id " +
                "INNER JOIN tour t ON b.tour_id = t.id";
        return jdbcTemplate.query(sql, bookingRowMapper);
    }

    public List<Booking> findAll() {
        String sql = "SELECT * FROM booking";
        return jdbcTemplate.query(sql, bookingRowMapper);
    }

    public Booking findById(int id) {
        String sql = "SELECT * FROM booking WHERE id = ?";
        return jdbcTemplate.queryForObject(sql, bookingRowMapper, id);
    }

    public int save(Booking booking) {
        String sql = "INSERT INTO booking (user_id, tour_id, adults, children) " +
                "VALUES (?, ?, ?, ?)";
        return jdbcTemplate.update(sql,
                booking.getUserId(),
                booking.getTourId(),
                booking.getAdults(),
                booking.getChildren());
    }

    public int updateById(int id, String status) {
        String sql = "UPDATE booking SET status = ? WHERE id = ?";
        return jdbcTemplate.update(sql, status, id);
    }

    public int deleteById(int id) {
        String sql = "DELETE FROM booking WHERE id = ?";
        return jdbcTemplate.update(sql, id);
    }
}
