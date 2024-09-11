package com.asm.asm1.Repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.asm.asm1.Models.Tour;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class TourRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private RowMapper<Tour> tourRowMapper = new RowMapper<Tour>() {
        @Override
        public Tour mapRow(ResultSet rs, int rowNum) throws SQLException {
            Tour tour = new Tour();
            tour.setId(rs.getInt("id"));
            tour.setName(rs.getString("name"));
            tour.setImage(rs.getString("image"));
            tour.setDescription(rs.getString("description"));
            tour.setStartDate(rs.getDate("start_date"));
            tour.setDurationDay(rs.getInt("duration_day"));
            tour.setPrice(rs.getDouble("price"));
            tour.setStatus(rs.getString("status"));
            tour.setPlace(rs.getString("place"));
            return tour;
        }
    };

    public List<Tour> findAll() {
        return jdbcTemplate.query("SELECT * FROM Tour", tourRowMapper);
    }

    public Tour findById(int id) {
        String sql = "SELECT * FROM Tour WHERE id = ?";
        return jdbcTemplate.queryForObject(sql, tourRowMapper, id);
    }

    public int save(Tour tour) {
        String sql = "INSERT INTO Tour (name, image, description, start_date, duration_day, price, status, place) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        return jdbcTemplate.update(sql,
                tour.getName(),
                tour.getImage(),
                tour.getDescription(),
                tour.getStartDate(),
                tour.getDurationDay(),
                tour.getPrice(),
                tour.getStatus(),
                tour.getPlace());
    }

    public int updateById(int id, Tour tour) {
        String sql = "UPDATE Tour SET name = ?, image = ?, description = ?, start_date = ?, duration_day = ?, price = ?, status = ?, place = ? "
                +
                "WHERE id = ?";
        return jdbcTemplate.update(sql,
                tour.getName(),
                tour.getImage(),
                tour.getDescription(),
                tour.getStartDate(),
                tour.getDurationDay(),
                tour.getPrice(),
                tour.getStatus(),
                tour.getPlace(),
                id);
    }

    public int deleteById(int id) {
        String sql = "DELETE FROM Tour WHERE id = ?";
        return jdbcTemplate.update(sql, id);
    }
}
