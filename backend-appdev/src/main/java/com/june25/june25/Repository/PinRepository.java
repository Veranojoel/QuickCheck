package com.june25.june25.Repository;

import com.june25.june25.Entity.PinEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PinRepository extends JpaRepository<PinEntity, Long> {
    Optional<PinEntity> findTopByCourseIdOrderByGeneratedAtDesc(String courseId);
}
