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

    // GET all students
    @GetMapping
    public List<StudentEntity> getAll() {
        return service.getAllStudents();
    }

    // GET students by courseId (if ?courseId=CS101 is passed)
    @GetMapping(params = "courseId")
    public List<StudentEntity> getStudentsByCourse(@RequestParam String courseId) {
        return service.getStudentsByCourse(courseId);
    }

    // GET student by ID
    @GetMapping("/{id}")
    public StudentEntity getById(@PathVariable Long id) {
        return service.getStudentById(id)
                      .orElseThrow(() -> new RuntimeException("Student not found"));
    }

    // POST create student
    @PostMapping
    public StudentEntity create(@RequestBody StudentEntity student) {
        return service.createStudent(student);
    }

    // PUT update student
    @PutMapping("/{id}")
    public StudentEntity update(@PathVariable Long id, @RequestBody StudentEntity student) {
        return service.updateStudent(id, student);
    }

    // DELETE student
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteStudent(id);
    }
}