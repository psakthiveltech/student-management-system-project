package com.example.studentproject.student;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

import java.util.List;

@Entity
public class Course {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer courseId;

    @NotBlank(message = "Course Name Must Be Filled")
    private String courseName;


   public Course(){

    }

    public Integer getCourseId() {
        return courseId;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public void setCourseId(Integer courseId) {
        this.courseId = courseId;
    }



}
