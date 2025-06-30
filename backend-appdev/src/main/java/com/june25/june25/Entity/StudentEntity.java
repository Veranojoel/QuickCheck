package com.june25.june25.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;



@Entity
@Table(name = "students")
public class StudentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name ="name")
    private String name;
    @Column(name ="email")
    private String email;
    @Column(name ="course")
    private String course;
    @Column(name ="studentNo")
    private String studentNo;

    public StudentEntity() {}

    public StudentEntity(String name, String email, String course, String studentNo) {
        this.name = name;
        this.email = email;
        this.course = course;
        this.studentNo = studentNo;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getCourse() { return course; }
    public String getStudentNo() { return studentNo; }

    public void setId(Long id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setEmail(String email) { this.email = email; }
    public void setCourse(String course) { this.course = course; }
    public void setStudentNo(String studentNo) { this.studentNo = studentNo; }
}
