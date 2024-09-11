package com.asm.asm1.Services;

import com.asm.asm1.Models.Booking;
import com.asm.asm1.Repositories.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    public List<Booking> getAllBookings() {
        return bookingRepository.findAllWithUserAndTourDetails();
    }

    public void addBooking(Booking booking) {
        bookingRepository.save(booking);
    }

    public Booking getBookingById(int id) {
        return bookingRepository.findById(id);
    }

    public int updateBookingStatus(int id, String status) {
        Booking existingBooking = bookingRepository.findById(id);

        if (existingBooking != null) {
            existingBooking.setStatus(status);
            return bookingRepository.updateById(id, status);
        } else {
            throw new RuntimeException("Booking not found with id: " + id);
        }
    }

    public int deleteBooking(int id) {
        return bookingRepository.deleteById(id);
    }
}
