package com.june25.june25.Controller;

import org.springframework.web.bind.annotation.*;
import com.june25.june25.Service.StudentService;
import com.june25.june25.Entity.StudentEntity;

import java.util.List;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    private final StudentService service;

    public StudentController(StudentService service) {
        this.service = service;
    }

    @GetMapping
    public List<StudentEntity> getAll() {
        return service.getAllStudents();
    }

    @GetMapping("/{id}")
    public StudentEntity getById(@PathVariable Long id) {
        return service.getStudentById(id)
                      .orElseThrow(() -> new RuntimeException("Student not found"));
    }

    @PostMapping
    public StudentEntity create(@RequestBody StudentEntity student) {
        return service.createStudent(student);
    }

    @PutMapping("/{id}")
    public StudentEntity update(@PathVariable Long id, @RequestBody StudentEntity student) {
        return service.updateStudent(id, student);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteStudent(id);
    }
}