package com.june25.june25.Service;

import com.june25.june25.Entity.StudentEntity;
import com.june25.june25.Repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    private final StudentRepository repository;

    public StudentService(StudentRepository repository) {
        this.repository = repository;
    }

    public List<StudentEntity> getAllStudents() {
        return repository.findAll();
    }

    public Optional<StudentEntity> getStudentById(Long id) {
        return repository.findById(id);
    }

    public StudentEntity createStudent(StudentEntity student) {
        return repository.save(student);
    }

    public StudentEntity updateStudent(Long id, StudentEntity updatedStudent) {
        return repository.findById(id).map(student -> {
            student.setName(updatedStudent.getName());
            student.setEmail(updatedStudent.getEmail());
            student.setCourse(updatedStudent.getCourse());
            student.setStudentNo(updatedStudent.getStudentNo());
            return repository.save(student);
        }).orElseThrow(() -> new RuntimeException("Student not found"));
    }

    public void deleteStudent(Long id) {
        repository.deleteById(id);
    }
}