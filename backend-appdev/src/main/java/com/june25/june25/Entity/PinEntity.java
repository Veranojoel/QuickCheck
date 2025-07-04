package com.june25.june25.Entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
public class PinEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String courseId;

    private String pinCode;

    private LocalDateTime generatedAt;

    private int durationMinutes; // How long the pin is valid

    @ManyToOne
    @JoinColumn(name = "course_id")
    private CourseEntity course;

    public CourseEntity getCourse() {
        return course;
    }

    public void setCourse(CourseEntity course) {
        this.course = course;
    }

}
