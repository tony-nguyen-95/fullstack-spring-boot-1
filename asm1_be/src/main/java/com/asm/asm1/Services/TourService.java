package com.asm.asm1.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.asm.asm1.Models.Tour;
import com.asm.asm1.Repositories.TourRepository;
import java.util.List;
import java.util.Date;

@Service
public class TourService {

    @Autowired
    private TourRepository tourRepository;

    public List<Tour> getAllTours() {
        return tourRepository.findAll();
    }

    public void addTour(Tour tour) {
        tourRepository.save(tour);
    }

    public Tour getTourById(int id) {
        return tourRepository.findById(id);
    }

    public int updateTour(int id, String name, String image, String description, Date startDate, int durationDay,
            double price, String status, String place) {
        Tour existingTour = tourRepository.findById(id);

        if (existingTour != null) {
            existingTour.setName(name);
            existingTour.setImage(image);
            existingTour.setDescription(description);
            existingTour.setStartDate(startDate);
            existingTour.setDurationDay(durationDay);
            existingTour.setPrice(price);
            existingTour.setStatus(status);
            existingTour.setPlace(place);

            // Save the updated tour back to the database
            return tourRepository.updateById(id, existingTour);

        } else {
            throw new RuntimeException("Tour not found with id: " + id);
        }
    }

    public int deleteTour(int id) {
        return tourRepository.deleteById(id);
    }
}
