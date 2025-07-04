package com.june25.june25.Service;

import com.june25.june25.Entity.PinEntity;
import com.june25.june25.Repository.PinRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class PinService {

    private final PinRepository pinRepository;

    public PinService(PinRepository pinRepository) {
        this.pinRepository = pinRepository;
    }

    public PinEntity generatePin(String courseId, int durationMinutes) {
        String pin = String.valueOf((int) (Math.random() * 9000 + 1000)); // 4-digit random

        PinEntity pinEntity = new PinEntity();
        pinEntity.setCourseId(courseId);
        pinEntity.setPinCode(pin);
        pinEntity.setGeneratedAt(LocalDateTime.now());
        pinEntity.setDurationMinutes(durationMinutes);

        return pinRepository.save(pinEntity);
    }

    public boolean validatePin(String courseId, String enteredPin) {
        Optional<PinEntity> latest = pinRepository.findTopByCourseIdOrderByGeneratedAtDesc(courseId);

        if (latest.isEmpty()) return false;

        PinEntity pin = latest.get();
        LocalDateTime expiry = pin.getGeneratedAt().plusMinutes(pin.getDurationMinutes());

        return pin.getPinCode().equals(enteredPin) && LocalDateTime.now().isBefore(expiry);
    }
}
